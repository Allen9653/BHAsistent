import fs from 'fs';
import path from 'path';
import { injectSsrIntoTemplate } from '../server/ssrRenderer';
import { MULTILINGUAL_ROUTE_META, ROUTE_ALIASES } from '../src/data/seoData';

const distPath = path.resolve(process.cwd(), 'dist');
const templatePath = path.join(distPath, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('[Prerender Error]: dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf-8');

// Combine canonical routes and aliases
const allRoutes = Array.from(new Set([
  ...Object.keys(MULTILINGUAL_ROUTE_META),
  ...Object.keys(ROUTE_ALIASES),
]));

console.log(`[Prerender] Pre-generating static HTML files for ${allRoutes.length} routes...`);

for (const route of allRoutes) {
  const renderedHtml = injectSsrIntoTemplate(template, route);

  if (route === '/') {
    fs.writeFileSync(templatePath, renderedHtml, 'utf-8');
    console.log(`  ✓ Prerendered / -> dist/index.html`);
  } else {
    const routeDir = path.join(distPath, route.replace(/^\//, ''));
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    const targetFile = path.join(routeDir, 'index.html');
    fs.writeFileSync(targetFile, renderedHtml, 'utf-8');
    console.log(`  ✓ Prerendered ${route} -> ${path.relative(process.cwd(), targetFile)}`);
  }
}

console.log('[Prerender] Successfully generated all static route HTML files for Vercel deployment!');
