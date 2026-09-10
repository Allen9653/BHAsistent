import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabaseInstance: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient | null => {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  if (supabaseUrl && supabaseAnonKey) {
    try {
      supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      });
      return supabaseInstance;
    } catch (err) {
      console.warn('[Supabase] Failed to initialize client:', err);
    }
  }

  return null;
};

export interface AdminAuthResult {
  success: boolean;
  user?: {
    email: string;
    id: string;
    role?: string;
  };
  token?: string;
  error?: string;
}

const TOKEN_STORAGE_KEY = 'bh_admin_auth_token';
const USER_STORAGE_KEY = 'bh_admin_auth_user';

export const getStoredToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_STORAGE_KEY) || sessionStorage.getItem(TOKEN_STORAGE_KEY);
};

export const getStoredUser = (): { email: string; id: string; role?: string } | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY) || sessionStorage.getItem(USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

/**
 * Sign in admin user via backend endpoint or direct Supabase Auth,
 * protected by server-side credentials and session tokens.
 */
export const signInAdmin = async (
  email: string,
  password: string,
  remember: boolean = false
): Promise<AdminAuthResult> => {
  try {
    // 1. Try server-side authenticated proxy endpoint first
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), password }),
    }).catch(() => null);

    if (response && response.ok) {
      const data = await response.json();
      if (data.success && data.token) {
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem(TOKEN_STORAGE_KEY, data.token);
        if (data.user) {
          storage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));
        }
        return {
          success: true,
          user: data.user,
          token: data.token,
        };
      } else {
        return {
          success: false,
          error: data.error || 'Neispravni pristupni podaci za administratorski nalog.',
        };
      }
    }

    // 2. Direct Supabase Auth client fallback if configured
    const client = getSupabaseClient();
    if (client) {
      const { data, error } = await client.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        return {
          success: false,
          error: error.message || 'Greška pri prijavi na Supabase autentifikaciju.',
        };
      }

      if (data.session) {
        const token = data.session.access_token;
        const user = {
          email: data.user?.email || email,
          id: data.user?.id || 'admin',
          role: 'admin',
        };
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem(TOKEN_STORAGE_KEY, token);
        storage.setItem(USER_STORAGE_KEY, JSON.stringify(user));

        return {
          success: true,
          user,
          token,
        };
      }
    }

    // If server responded with an error status
    if (response && !response.ok) {
      const errData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errData.error || 'Server je odbio autentifikaciju. Provjerite pristupne podatke.',
      };
    }

    return {
      success: false,
      error: 'Autentifikacijski servis nije dostupan. Molimo pokušajte ponovo.',
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Došlo je do neočekivane greške prilikom prijave.',
    };
  }
};

/**
 * Verify current session with server-side session check
 */
export const verifyAdminSession = async (): Promise<boolean> => {
  const token = getStoredToken();
  if (!token) return false;

  try {
    const res = await fetch('/api/admin/verify-session', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch(() => null);

    if (res && res.ok) {
      const data = await res.json();
      return Boolean(data.valid);
    }

    // If direct Supabase client is available, verify token validity
    const client = getSupabaseClient();
    if (client) {
      const { data, error } = await client.auth.getUser(token);
      if (!error && data.user) {
        return true;
      }
    }

    // Invalid session - clear stored tokens
    signOutAdmin();
    return false;
  } catch {
    return false;
  }
};

/**
 * Sign out admin and clear tokens
 */
export const signOutAdmin = async (): Promise<void> => {
  const token = getStoredToken();
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    sessionStorage.removeItem(USER_STORAGE_KEY);
  }

  if (token) {
    fetch('/api/admin/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch(() => null);
  }

  const client = getSupabaseClient();
  if (client) {
    client.auth.signOut().catch(() => null);
  }
};
