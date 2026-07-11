// PHIGO brand — palette + type specimen sheet -> brand_assets/palette.png
// Re-runnable reference image to hold next to Figma/Canva. All hex values are
// derived from app/globals.css (OKLCH tokens converted to sRGB) and from the
// logo masters. Nothing invented.
//
// Run:  node brand_assets/scripts/build-palette.mjs

import { readdirSync, mkdirSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
mkdirSync(join(ROOT, 'brand_assets'), { recursive: true });

const require = createRequire(import.meta.url);
let sharp;
try {
  sharp = require('sharp');
} catch {
  const pnpmDir = join(ROOT, 'node_modules', '.pnpm');
  const dir = readdirSync(pnpmDir).find((d) => d.startsWith('sharp@'));
  sharp = (await import(pathToFileURL(join(pnpmDir, dir, 'node_modules', 'sharp', 'lib', 'index.js')).href)).default;
}

const FONT = "Inter, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

// group: { title, note?, items: [{name, hex, role}] }
const groups = [
  {
    title: 'Brand — green is two-color: #008d4d on light, #02b77f mark on dark',
    items: [
      { name: 'PHIGO Green', hex: '#008d4d', role: 'SITE: --primary both modes (PHI, CTA, links)' },
      { name: 'PHIGO Mint', hex: '#02b77f', role: 'logomark + SOCIAL dark accent (keywords, CTA)' },
      { name: 'GO dark', hex: '#161616', role: 'GO on light bg (= text)' },
      { name: 'GO light', hex: '#eeeeee', role: 'GO on dark bg' },
    ],
  },
  {
    title: 'Light mode surfaces',
    items: [
      { name: 'background', hex: '#f8f8f8', role: 'page base' },
      { name: 'card', hex: '#ffffff', role: 'raised card' },
      { name: 'muted', hex: '#ebebeb', role: 'alt band' },
      { name: 'border', hex: '#e5e5e5', role: 'hairlines' },
      { name: 'foreground', hex: '#161616', role: 'primary text' },
      { name: 'muted-foreground', hex: '#636363', role: 'secondary text' },
    ],
  },
  {
    title: 'Dark mode surfaces',
    items: [
      { name: 'background', hex: '#000903', role: 'page base' },
      { name: 'card', hex: '#031109', role: 'raised card' },
      { name: 'muted', hex: '#0c1912', role: 'alt band' },
      { name: 'border', hex: '#18251e', role: 'hairlines' },
      { name: 'foreground', hex: '#eeeeee', role: 'primary text' },
      { name: 'muted-foreground', hex: '#8f8f8f', role: 'secondary text' },
    ],
  },
  {
    title: 'Section accents — light mode (AA on white)',
    items: [
      { name: 'accent-hero', hex: '#00824e', role: 'Hero / CTA — emerald' },
      { name: 'accent-cases', hex: '#aa5910', role: 'Case studies — amber' },
      { name: 'accent-process', hex: '#00739c', role: 'Process — teal' },
      { name: 'accent (tint)', hex: '#def5e8', role: 'hover / highlight bg' },
    ],
  },
  {
    title: 'Section accents — dark mode (brighter *-500)',
    items: [
      { name: 'accent-hero', hex: '#00bc7d', role: 'emerald-500' },
      { name: 'accent-cases', hex: '#fe9a00', role: 'amber-500' },
      { name: 'accent-process', hex: '#00b8db', role: 'cyan-500' },
      { name: 'accent (tint)', hex: '#0a3723', role: 'hover / highlight bg (dark)' },
    ],
  },
  {
    title: 'Emerald anchor (final CTA plate — fixed both modes)',
    items: [
      { name: 'grad 0%', hex: '#00190c', role: 'deep' },
      { name: 'grad 55%', hex: '#002e17', role: 'mid' },
      { name: 'radial hi', hex: '#004726', role: 'top-left glow' },
      { name: 'anchor-ink', hex: '#004325', role: 'text on white btn' },
    ],
  },
];

// layout
const W = 1500;
const PAD = 56;
const COLW = 340;
const COLGAP = 24;
const cols = 4;
const SWH = 96; // swatch height
const ROWGAP = 14;
const GROUPGAP = 30;
const HEADER = 200;

// pre-measure height by walking groups into a column-packed flow
function isDark(hex) {
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) < 140;
}

let svg = '';
let y = HEADER;
for (const group of groups) {
  svg += `<text x="${PAD}" y="${y}" font-family="${FONT}" font-size="24" font-weight="800" fill="#161616" letter-spacing="-0.5">${group.title}</text>`;
  y += 22;
  let x = PAD;
  let col = 0;
  let rowTop = y;
  let maxRowBottom = y;
  for (const it of group.items) {
    const cx = PAD + col * (COLW + COLGAP);
    const top = rowTop;
    const txtColor = isDark(it.hex) ? '#ffffff' : '#161616';
    const subColor = isDark(it.hex) ? '#d8d8d8' : '#4b4b4b';
    svg += `<rect x="${cx}" y="${top}" width="${COLW}" height="${SWH}" rx="12" fill="${it.hex}" stroke="#00000018"/>`;
    svg += `<text x="${cx + 18}" y="${top + 34}" font-family="${FONT}" font-size="19" font-weight="700" fill="${txtColor}">${it.name}</text>`;
    svg += `<text x="${cx + 18}" y="${top + 58}" font-family="${FONT}" font-size="16" font-weight="600" fill="${txtColor}" letter-spacing="0.5">${it.hex}</text>`;
    svg += `<text x="${cx + 18}" y="${top + 80}" font-family="${FONT}" font-size="12.5" fill="${subColor}">${it.role}</text>`;
    maxRowBottom = Math.max(maxRowBottom, top + SWH);
    col++;
    if (col === cols) { col = 0; rowTop = maxRowBottom + ROWGAP; }
  }
  y = maxRowBottom + GROUPGAP;
}

// Typography specimen block
const typeTop = y + 4;
svg += `<text x="${PAD}" y="${typeTop}" font-family="${FONT}" font-size="24" font-weight="800" fill="#161616" letter-spacing="-0.5">Typografi — Inter</text>`;
let ty = typeTop + 44;
const specimens = [
  { t: 'Din hemsida borde ge dig kunder', size: 46, weight: 800, ls: '-1.5', note: 'H1 — extrabold, tracking-tight' },
  { t: 'En hemsida som ger dig fler kunder', size: 32, weight: 700, ls: '-0.5', note: 'H2 — bold' },
  { t: 'Vi bygger hemsidor åt lokala företag som gör att folk tar kontakt.', size: 19, weight: 400, ls: '0', note: 'Brödtext — regular, leading-relaxed' },
  { t: 'FAST PRIS', size: 14, weight: 700, ls: '1.5', note: 'Etikett — uppercase, bold', upper: true },
];
for (const s of specimens) {
  svg += `<text x="${PAD}" y="${ty}" font-family="${FONT}" font-size="${s.size}" font-weight="${s.weight}" fill="#161616" letter-spacing="${s.ls}">${s.t}</text>`;
  svg += `<text x="${W - PAD}" y="${ty}" text-anchor="end" font-family="${FONT}" font-size="13" fill="#888">${s.note}</text>`;
  ty += s.size + 26;
}

const H = ty + 40;

const doc = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#ffffff"/>
  <rect x="0" y="0" width="${W}" height="118" fill="#000903"/>
  <text x="${PAD}" y="58" font-family="${FONT}" font-size="40" font-weight="800" letter-spacing="-1.5"><tspan fill="#008d4d">PHI</tspan><tspan fill="#eeeeee">GO</tspan></text>
  <text x="${PAD}" y="90" font-family="${FONT}" font-size="16" fill="#9fb3a8">Brand palette &amp; type reference — genererad från app/globals.css. Grönt = accent, aldrig yta i ljust läge.</text>
  ${svg}
</svg>`;

await sharp(Buffer.from(doc)).png().toFile(join(ROOT, 'brand_assets', 'palette.png'));
console.log('Wrote brand_assets/palette.png (' + W + 'x' + H + ')');
