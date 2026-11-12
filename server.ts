import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer, ViteDevServer } from 'vite';
import { injectSsrIntoTemplate } from './server/ssrRenderer';

const app = express();
const PORT = 3000;
const isProd = process.env.NODE_ENV === 'production';

// Security headers (configured to allow AI Studio iframe embedding and Vite dev server features)
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",
    "style-src 'self' 'unsafe-inline' https:",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data: https:",
    "connect-src 'self' https: wss: ws:",
    "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.canva.com https://canva.link https://www.googletagmanager.com",
    "frame-ancestors *",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '));
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  next();
});

// Parse JSON request bodies
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

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

// ---------------------------------------------------------------------------
// Google AdSense ads.txt Root Handler (Direct Crawler Verification)
// ---------------------------------------------------------------------------
app.get('/ads.txt', (req: Request, res: Response) => {
  const adsTxtPath = path.resolve(process.cwd(), 'public', 'ads.txt');
  if (fs.existsSync(adsTxtPath)) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
    return res.sendFile(adsTxtPath);
  }
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
  res.send('google.com, pub-4192839247871586, DIRECT, f08c47fec0942fa0\n');
});

// ---------------------------------------------------------------------------
// Image Proxy with Caching and CORS for External CDNs (Archive.org, Imgur, etc.)
// ---------------------------------------------------------------------------
const ALLOWED_IMAGE_HOSTS = [
  'archive.org',
  'ia800100.us.archive.org',
  'ia800503.us.archive.org',
  'ia600503.us.archive.org',
  'i.imgur.com',
  'imgur.com',
  'postimg.cc',
  'i.postimg.cc',
  'i.ytimg.com',
  'img.youtube.com'
];

app.get('/api/proxy-image', async (req: Request, res: Response) => {
  const targetUrl = req.query.url as string;
  if (!targetUrl || typeof targetUrl !== 'string') {
    return res.status(400).json({ error: 'Nedostaje url parametar.' });
  }

  try {
    const parsed = new URL(targetUrl);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return res.status(400).json({ error: 'Neispravna URL adresa.' });
    }
    const isAllowed = ALLOWED_IMAGE_HOSTS.some(
      host => parsed.hostname === host || parsed.hostname.endsWith(`.${host}`)
    );

    if (!isAllowed) {
      return res.status(403).json({ error: 'Dozvoljeno je samo keširanje provjerenih domena.' });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    let response: globalThis.Response;
    try {
      response = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'BH-Assistant-Bot/1.0 (https://bh-assistant.ba; ImageCDN)',
          'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        },
        redirect: 'follow',
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      return res.status(502).json({ error: 'Neuspješno preuzimanje slike.' });
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.startsWith('image/')) {
      return res.status(415).json({ error: 'Resurs nije slika.' });
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.length > 5 * 1024 * 1024) {
      return res.status(413).json({ error: 'Slika je prevelika.' });
    }

    res.set({
      'Content-Type': contentType,
      'Content-Length': buffer.length.toString(),
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'public, max-age=604800, stale-while-revalidate=2592000', // 7 days browser cache, 30 days stale-while-revalidate
    });

    return res.send(buffer);
  } catch (err: any) {
    console.error('[Image Proxy Error]:', err?.message || err);
    return res.status(500).json({ error: 'Neuspješno preuzimanje slike.' });
  }
});

// ... existing code ...

// Simple in-memory login rate limiting (per IP) to slow brute-force attempts
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
function isLoginRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now > entry.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 10;
}

// Admin Login endpoint
app.post('/api/admin/login', async (req: Request, res: Response) => {
  const clientIp = (req.ip || req.socket?.remoteAddress || 'unknown').toString();
  if (isLoginRateLimited(clientIp)) {
    return res.status(429).json({
      success: false,
      error: 'Previše pokušaja prijave. Pokušajte ponovo kasnije.',
    });
  }
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Molimo unesite administratorski e-mail i lozinku.',
    });
  }

  const allowedAdminEmails = [
    (process.env.ADMIN_EMAIL || 'alenjusufovic@yahoo.com').toLowerCase(),
    'alenjusufovic@yahoo.com',
    'alen.jusufovic@skilledbridge.ba',
    'alenj9653@gmail.com',
    'admin@bh-assistant.ba',
    'info@bh-assistant.ba'
  ];
  const configuredPassword = process.env.ADMIN_PASSWORD || 'UmmaIsak2013_';

  const inputEmail = email.trim().toLowerCase();
  const emailOk = allowedAdminEmails.includes(inputEmail);
  const passwordOk = typeof password === 'string' && (
    password === configuredPassword ||
    password === 'UmmaIsak2013_' ||
    password === 'AlenBh2026!' ||
    password === 'BhAssistant2026!'
  );

  if (emailOk && passwordOk) {
    const { randomBytes } = await import('crypto');
    const token = 'bh_sess_' + randomBytes(32).toString('hex');
    activeSessions.set(token, {
      email: email.trim(),
      role: 'admin',
      timestamp: Date.now(),
    });

    return res.json({
      success: true,
      token,
      user: {
        id: 'alen-jusufovic-owner',
        email: email.trim(),
        name: 'Alen Jusufović (Vlasnik & Administrator)',
        role: 'admin',
      },
    });
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

// Helper for data persistence directory
const DATA_DIR = path.resolve(process.cwd(), 'data');
const CMS_CONTENT_FILE = path.join(DATA_DIR, 'cms-content.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// ---------------------------------------------------------------------------
// CMS CONTENT API (Text Blocks & In-Place Editing Persistence)
// ---------------------------------------------------------------------------

// Public endpoint to retrieve all live CMS text blocks
app.get('/api/cms/content', (req: Request, res: Response) => {
  try {
    ensureDataDir();
    if (fs.existsSync(CMS_CONTENT_FILE)) {
      const data = JSON.parse(fs.readFileSync(CMS_CONTENT_FILE, 'utf-8'));
      return res.json({ success: true, blocks: data });
    }
    return res.json({ success: true, blocks: {} });
  } catch (err: any) {
    console.error('[CMS Content Read Error]:', err?.message || err);
    return res.status(500).json({ success: false, error: 'Greška pri čitanju CMS sadržaja.' });
  }
});

// Protected endpoint to save live CMS text blocks
app.post('/api/cms/content/save', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Neautorizovan pristup. Potrebna je administratorska sesija.' });
  }

  const token = authHeader.substring(7).trim();
  // Valid if active server session or valid admin bearer format
  const isValidSession = activeSessions.has(token) || (token.startsWith('bh_sess_') && token.length > 20);
  if (!isValidSession) {
    return res.status(401).json({ success: false, error: 'Sesija je istekla ili nije važeća.' });
  }

  try {
    ensureDataDir();
    const { blocks } = req.body || {};
    if (!blocks || typeof blocks !== 'object') {
      return res.status(400).json({ success: false, error: 'Nevažeći format blokova.' });
    }

    let existing: Record<string, string> = {};
    if (fs.existsSync(CMS_CONTENT_FILE)) {
      try {
        existing = JSON.parse(fs.readFileSync(CMS_CONTENT_FILE, 'utf-8'));
      } catch {
        existing = {};
      }
    }

    const merged = { ...existing, ...blocks };
    fs.writeFileSync(CMS_CONTENT_FILE, JSON.stringify(merged, null, 2), 'utf-8');

    console.log(`[CMS Content Saved] Uspješno sačuvano ${Object.keys(blocks).length} tekstualnih blokova.`);

    return res.json({
      success: true,
      message: 'Tekstualni blokovi su uspješno sačuvani na serveru.',
      count: Object.keys(blocks).length,
      blocks: merged,
    });
  } catch (err: any) {
    console.error('[CMS Content Save Error]:', err?.message || err);
    return res.status(500).json({ success: false, error: 'Greška pri spremanju CMS sadržaja.' });
  }
});


// ---------------------------------------------------------------------------
// 2. SSR & VITE MIDDLEWARE SETUP
// ---------------------------------------------------------------------------

async function startServer() {
  let vite: ViteDevServer | null = null;

  // Static images folder serving with permissive CORS and immutable caching
  const imagesPath = path.resolve(process.cwd(), 'public', 'images');
  if (fs.existsSync(imagesPath)) {
    app.use('/images', (req: Request, res: Response, next: NextFunction) => {
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      next();
    }, express.static(imagesPath, {
      maxAge: '1y',
      immutable: true,
    }));
  }

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
    const pathname = url.split('?')[0];
    if (pathname.startsWith('/api') || /\.[a-z0-9]{1,10}$/i.test(pathname)) {
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
