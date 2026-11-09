import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  signInAdmin, 
  verifyAdminSession, 
  signOutAdmin, 
  getStoredUser, 
  getStoredToken 
} from '../utils/adminAuth';

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
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const checkAuth = useCallback(async () => {
    try {
      const stored = getStoredUser();
      const token = getStoredToken();
      if (!token) {
        setIsAdmin(false);
        setAdminUser(null);
        setIsChecking(false);
        return;
      }

      if (stored) {
        setAdminUser(stored);
      }

      const valid = await verifyAdminSession();
      setIsAdmin(valid);
      if (!valid) {
        setAdminUser(null);
      }
    } catch {
      setIsAdmin(false);
      setAdminUser(null);
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (password: string, email?: string, remember: boolean = true) => {
    const adminEmail = email || 'alen.jusufovic@skilledbridge.ba';
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
