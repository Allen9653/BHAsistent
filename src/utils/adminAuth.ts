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
 * Sign in admin user.
 * Communicates with the server-side API when running in full-stack/SSR mode,
 * and seamlessly provides secure client-side admin session handling
 * when deployed as a static site on Vercel without external database dependencies.
 */
export const signInAdmin = async (
  email: string,
  password: string,
  remember: boolean = false
): Promise<AdminAuthResult> => {
  const cleanEmail = email.trim();

  if (!cleanEmail || !password) {
    return {
      success: false,
      error: 'Molimo unesite administratorski e-mail i lozinku.',
    };
  }

  if (!cleanEmail.includes('@') || password.length < 6) {
    return {
      success: false,
      error: 'Lozinka mora imati najmanje 6 znakova, a e-mail mora biti u ispravnom formatu.',
    };
  }

  try {
    // 1. Try server-side admin login endpoint first if backend is running
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, password }),
    }).catch(() => null);

    if (response && response.ok) {
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
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
    } else if (response && (response.status === 401 || response.status === 429 || response.status === 503)) {
      const errData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errData.error || 'Neispravan administratorski e-mail ili lozinka.',
      };
    }

    // No client-side fallback: without a valid server session the user is NOT authenticated.
    // Static deployments must either run the Express server (server.ts) or implement a
    // proper server-side auth endpoint before admin access can be granted.
    return {
      success: false,
      error: 'Administratorska prijava nije dostupna. Server za autentifikaciju nije dostupan.',
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Došlo je do neočekivane greške prilikom prijave.',
    };
  }
};

/**
 * Verify current admin session validity
 */
export const verifyAdminSession = async (): Promise<boolean> => {
  const token = getStoredToken();
  if (!token) return false;

  // Legacy client-generated tokens are never trusted.
  if (token.startsWith('bh_client_sess_')) {
    await signOutAdmin();
    return false;
  }

  try {
    // Verify against backend session store
    const res = await fetch('/api/admin/verify-session', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch(() => null);

    if (res && res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        return Boolean(data.valid);
      }
    }

    // Backend unavailable or token rejected — clear and deny.
    await signOutAdmin();
    return false;
  } catch {
    return false;
  }
};

/**
 * Sign out admin and clear session tokens
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
};
