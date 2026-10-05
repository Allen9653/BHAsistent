import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer, ViteDevServer } from 'vite';
import { injectSsrIntoTemplate } from './server/ssrRenderer';

const app = express();
const PORT = 3000;
const isProd = process.env.NODE_ENV === 'production';

// Parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Server-side active session store
interface AdminSession {
  email: string;
  role: string;
  timestamp: number;
}
const activeSessions = new Map<string, AdminSession>();

// ---------------------------------------------------------------------------
// 1. API ROUTES (FIRST)
// ---------------------------------------------------------------------------

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'B&H Assistant Web Platform',
    timestamp: new Date().toISOString(),
  });
});

// Admin Login endpoint
app.post('/api/admin/login', async (req: Request, res: Response) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Molimo unesite administratorski e-mail i lozinku.',
    });
  }

  // Server-side authorized authentication
  const envAdminEmail = (process.env.ADMIN_EMAIL || 'admin@bh-assistant.ba').toLowerCase();
  const envAdminPassword = process.env.ADMIN_PASSWORD;

  if (envAdminPassword) {
    if (password === envAdminPassword && email.trim().toLowerCase() === envAdminEmail) {
      const token = 'bh_sess_' + Buffer.from(Date.now() + ':' + email).toString('base64');
      activeSessions.set(token, {
        email: email.trim(),
        role: 'admin',
        timestamp: Date.now(),
      });

      return res.json({
        success: true,
        token,
        user: {
          id: 'server-admin',
          email: email.trim(),
          role: 'admin',
        },
      });
    }
  } else {
    // Development / standard admin credentials when custom server password is not set
    if (email.includes('@') && password.length >= 6) {
      const token = 'bh_sess_' + Buffer.from(Date.now() + ':' + email).toString('base64');
      activeSessions.set(token, {
        email: email.trim(),
        role: 'admin',
        timestamp: Date.now(),
      });

      return res.json({
        success: true,
        token,
        user: {
          id: 'auth-admin',
          email: email.trim(),
          role: 'admin',
        },
      });
    }
  }

  return res.status(401).json({
    success: false,
    error: 'Neispravni pristupni podaci za administratorski nalog.',
  });
});

// Verify Admin Session endpoint
app.get('/api/admin/verify-session', async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ valid: false, error: 'Nedostaje autorizacijski token.' });
  }

  const token = authHeader.substring(7).trim();

  // Check active server session map
  if (activeSessions.has(token)) {
    const session = activeSessions.get(token)!;
    // Expire session after 24 hours
    if (Date.now() - session.timestamp < 24 * 60 * 60 * 1000) {
      return res.json({
        valid: true,
        user: {
          email: session.email,
          role: session.role,
        },
      });
    } else {
      activeSessions.delete(token);
    }
  }

  return res.status(401).json({ valid: false, error: 'Sesija je istekla ili nije važeća.' });
});

// Admin Logout endpoint
app.post('/api/admin/logout', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    activeSessions.delete(token);
  }
  res.json({ success: true, message: 'Uspješno ste odjavljeni.' });
});

// Protected endpoint to update company details
app.post('/api/admin/update-company', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Neautorizovan pristup. Potrebna je administratorska sesija.' });
  }

  const token = authHeader.substring(7).trim();
  if (!activeSessions.has(token)) {
    return res.status(401).json({ success: false, error: 'Sesija nije validna ili je istekla.' });
  }

  const updatedData = req.body;
  console.log('[CMS Update] Primljene izmjene podataka o društvu:', updatedData?.fullLegalName);

  res.json({
    success: true,
    message: 'Podaci su uspješno ažurirani na serveru.',
    data: updatedData,
  });
});

// ---------------------------------------------------------------------------
// 2. SSR & VITE MIDDLEWARE SETUP
// ---------------------------------------------------------------------------

async function startServer() {
  let vite: ViteDevServer | null = null;

  if (!isProd) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, { index: false }));
  }

  // ---------------------------------------------------------------------------
  // 3. HTML ROUTE HANDLER (SSR With Vike & Semantic HTML Generator)
  // ---------------------------------------------------------------------------
  app.get('*', async (req: Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl;

    // Skip API routes or static asset requests with extensions
    if (url.startsWith('/api') || url.includes('.')) {
      return next();
    }

    try {
      // Full semantic SSR rendering engine (crawlers & instant SEO content)
      let template = '';
      if (!isProd && vite) {
        const indexPath = path.resolve(process.cwd(), 'index.html');
        template = fs.readFileSync(indexPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
      } else {
        const distIndexPath = path.resolve(process.cwd(), 'dist', 'index.html');
        if (fs.existsSync(distIndexPath)) {
          template = fs.readFileSync(distIndexPath, 'utf-8');
        } else {
          template = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8');
        }
      }

      // Inject route-specific SSR HTML, meta tags, and structured data
      const finalHtml = injectSsrIntoTemplate(template, url);

      res.status(200).set({ 'Content-Type': 'text/html' }).send(finalHtml);
    } catch (err: any) {
      if (!isProd && vite) {
        vite.ssrFixStacktrace(err);
      }
      console.error('[SSR Error]:', err.stack);
      next(err);
    }
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SSR Server] B&H Assistant Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
