// Turns the dist-single build into ONE self-contained HTML file:
// script, styles, fonts, images, videos and the vCard are all inlined,
// so the page opens straight from a download or a chat attachment.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist-single');
const pub = join(root, 'public');
const outName = 'james-melwish-portfolio.html';

const MIME = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.vcf': 'text/vcard',
  '.woff2': 'font/woff2',
};

const dataUri = (file) => {
  const mime = MIME[extname(file).toLowerCase()] ?? 'application/octet-stream';
  return `data:${mime};base64,${readFileSync(file).toString('base64')}`;
};

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

let html = readFileSync(join(dist, 'index.html'), 'utf8');

// ---- 1. Fonts: pull the Latin woff2 files Google serves and embed them ----
const FONT_CSS_URLS = [
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Herr+Von+Muellerhoff&family=Allura&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Montserrat:wght@200;300;400;500;600;700&display=swap',
];
const CHROME_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';

let fontCss = '';
try {
  for (const url of FONT_CSS_URLS) {
    const css = await (await fetch(url, { headers: { 'User-Agent': CHROME_UA } })).text();
    // Google emits one @font-face per unicode subset, each preceded by a /* subset */ comment
    const blocks = css.split('/* ').slice(1);
    for (const block of blocks) {
      const subset = block.slice(0, block.indexOf(' */'));
      if (subset !== 'latin') continue;
      const face = block.slice(block.indexOf('@font-face'));
      const src = face.match(/url\((https:[^)]+\.woff2)\)/);
      if (!src) continue;
      const buf = Buffer.from(await (await fetch(src[1])).arrayBuffer());
      fontCss += face.replace(src[1], `data:font/woff2;base64,${buf.toString('base64')}`) + '\n';
    }
  }
} catch (err) {
  console.warn('Font embedding skipped (offline?):', err.message);
  fontCss = '';
}

if (fontCss) {
  html = html
    .replace(/<link rel="preconnect"[^>]*>\s*/g, '')
    .replace(/<link href="https:\/\/fonts\.googleapis\.com[^>]*>\s*/g, '');
}

// ---- 2. Collect every asset the bundle might reference ----
const assetDir = join(dist, 'assets');
const builtAssets = readdirSync(assetDir).filter((f) => !/\.(js|css|map)$/.test(f));
const publicAssets = ['videos/hero.mp4', 'videos/about.mp4', 'images/hero-poster.jpg', 'images/james-portrait.jpg', 'images/qr-whatsapp.png', 'james-melwish.vcf', 'favicon.svg'];

const inlineRefs = (text) => {
  for (const name of builtAssets) {
    text = text.replace(new RegExp(`(?:\\.\\/)?(?:assets\\/)?${escapeRe(name)}`, 'g'), dataUri(join(assetDir, name)));
  }
  for (const rel of publicAssets) {
    const file = join(pub, rel);
    if (!existsSync(file)) continue;
    const uri = dataUri(file);
    // The minifier may emit any quote style, including template-literal backticks
    for (const q of ['"', "'", '`']) {
      for (const prefix of ['./', '/', '']) {
        text = text.split(`${q}${prefix}${rel}${q}`).join(`${q}${uri}${q}`);
      }
    }
  }
  return text;
};

// ---- 3. Inline the stylesheet ----
html = html.replace(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/, (_, href) => {
  let css = readFileSync(join(dist, href.replace(/^\.\//, '')), 'utf8');
  if (fontCss) css = css.replace(/@import\s*(?:url\()?["']?https:\/\/fonts\.googleapis\.com[^;]*;/g, '');
  css = inlineRefs(css);
  return `<style>${fontCss}${css}</style>`;
});

// ---- 4. Inline the module script ----
html = html.replace(/<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/, (_, src) => {
  let js = readFileSync(join(dist, src.replace(/^\.\//, '')), 'utf8');
  js = inlineRefs(js).replace(/<\/script/gi, '<\\/script');
  return `<script type="module">${js}</script>`;
});

// ---- 5. Favicon and any remaining public refs in the document itself ----
html = html.replace(/href="\.?\/?favicon\.svg"/, `href="${dataUri(join(pub, 'favicon.svg'))}"`);

// ---- 6. Sanity checks: nothing may still point at a separate file ----
const documentShell = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
const leftovers = [...documentShell.matchAll(/(?:src|href)="(?!data:|https?:|mailto:|tel:|#)([^"]+)"/g)].map((m) => m[1]);
const jsLeftovers = publicAssets.filter((rel) => ['"', "'", '`'].some((q) => html.includes(`${q}${rel}${q}`)));
if (leftovers.length || jsLeftovers.length) {
  console.error('Unresolved references:', leftovers, jsLeftovers);
  process.exit(1);
}

writeFileSync(join(dist, outName), html);
console.log(`Wrote ${join(dist, outName)} (${(Buffer.byteLength(html) / 1024 / 1024).toFixed(1)} MB), fonts embedded: ${fontCss ? 'yes' : 'no'}`);
