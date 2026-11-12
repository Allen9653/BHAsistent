import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  signInAdmin, 
  verifyAdminSession, 
  signOutAdmin, 
  getStoredUser, 
  getStoredToken 
} from '../utils/adminAuth';
import { saveMultipleTextBlocks } from '../utils/customContentStorage';

interface AdminUser {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

interface AdminAuthContextType {
  isAdmin: boolean;
  adminUser: AdminUser | null;
  isChecking: boolean;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (password: string, email?: string, remember?: boolean) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  
  // In-Place CMS Edit Mode
  isEditMode: boolean;
  toggleEditMode: () => void;
  setEditMode: (val: boolean) => void;

  // Pending inline edits management
  pendingChanges: Record<string, string>;
  setPendingChange: (key: string, value: string) => void;
  clearPendingChanges: () => void;
  savePendingChanges: () => Promise<boolean>;
  pendingCount: number;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const EDIT_MODE_STORAGE_KEY = 'bh_admin_edit_mode_active';

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  // Edit Mode state (persisted per admin session)
  const [isEditMode, setIsEditMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(EDIT_MODE_STORAGE_KEY) === 'true';
  });

  // Pending changes pool
  const [pendingChanges, setPendingChanges] = useState<Record<string, string>>({});

  const checkAuth = useCallback(async () => {
    try {
      const stored = getStoredUser();
      const token = getStoredToken();
      if (!token) {
        setIsAdmin(false);
        setAdminUser(null);
        setIsChecking(false);
        setIsEditMode(false);
        return;
      }

      if (stored) {
        setAdminUser(stored);
      }

      const valid = await verifyAdminSession();
      setIsAdmin(valid);
      if (!valid) {
        setAdminUser(null);
        setIsEditMode(false);
      }
    } catch {
      setIsAdmin(false);
      setAdminUser(null);
      setIsEditMode(false);
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Keep edit mode synced with admin status
  useEffect(() => {
    if (!isAdmin && isEditMode) {
      setIsEditMode(false);
      sessionStorage.removeItem(EDIT_MODE_STORAGE_KEY);
    }
  }, [isAdmin, isEditMode]);

  const toggleEditMode = useCallback(() => {
    if (!isAdmin) return;
    setIsEditMode((prev) => {
      const next = !prev;
      sessionStorage.setItem(EDIT_MODE_STORAGE_KEY, String(next));
      return next;
    });
  }, [isAdmin]);

  const setEditMode = useCallback((val: boolean) => {
    if (!isAdmin) return;
    setIsEditMode(val);
    sessionStorage.setItem(EDIT_MODE_STORAGE_KEY, String(val));
  }, [isAdmin]);

  const setPendingChange = useCallback((key: string, value: string) => {
    setPendingChanges((prev) => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const clearPendingChanges = useCallback(() => {
    setPendingChanges({});
  }, []);

  const savePendingChanges = useCallback(async (): Promise<boolean> => {
    if (Object.keys(pendingChanges).length === 0) return true;
    const res = await saveMultipleTextBlocks(pendingChanges);
    if (res.success) {
      setPendingChanges({});
      return true;
    }
    return false;
  }, [pendingChanges]);

  const login = async (password: string, email?: string, remember: boolean = true) => {
    const adminEmail = email || 'alenjusufovic@yahoo.com';
    const result = await signInAdmin(adminEmail, password, remember);
    if (result.success && result.user) {
      setIsAdmin(true);
      setAdminUser(result.user);
      setIsLoginModalOpen(false);
      return { success: true };
    }
    return { success: false, error: result.error || 'Neispravna administratorska lozinka ili e-mail.' };
  };

  const logout = async () => {
    await signOutAdmin();
    setIsAdmin(false);
    setAdminUser(null);
    setIsEditMode(false);
    setPendingChanges({});
    sessionStorage.removeItem(EDIT_MODE_STORAGE_KEY);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAdmin,
        adminUser,
        isChecking,
        isLoginModalOpen,
        openLoginModal: () => setIsLoginModalOpen(true),
        closeLoginModal: () => setIsLoginModalOpen(false),
        login,
        logout,
        isEditMode,
        toggleEditMode,
        setEditMode,
        pendingChanges,
        setPendingChange,
        clearPendingChanges,
        savePendingChanges,
        pendingCount: Object.keys(pendingChanges).length,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
