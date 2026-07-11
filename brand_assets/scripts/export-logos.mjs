// PHIGO brand — logo variant exporter
// Re-runnable. Derives all logo variants from the two high-res wordmark masters
// that already ship in the repo (public/brand), so the output stays pixel-accurate
// to the real logo instead of re-rendering text (which would depend on fonts being
// installed). Colors used here are the ACTUAL colors sampled from those masters and
// from app/globals.css — nothing is invented.
//
//   Green (PHI) ............. #008d4d   (= --primary oklch(0.55 0.17 160))
//   Dark GO (light bg) ...... #161616   (= --foreground light)
//   Light GO (dark bg) ...... #eeeeee   (= --foreground dark)
//   Profile/avatar plate .... deep emerald "anchor" gradient from globals.css
//
// Run:  node brand_assets/scripts/export-logos.mjs
// Requires: sharp (already present as a transitive dep of Next.js).

import { readdirSync, mkdirSync, writeFileSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..'); // repo root
const OUT = join(ROOT, 'brand_assets', 'logo');
mkdirSync(OUT, { recursive: true });

// --- resolve sharp (pnpm keeps it under .pnpm, not hoisted) ---
const require = createRequire(import.meta.url);
let sharp;
try {
  sharp = require('sharp');
} catch {
  const pnpmDir = join(ROOT, 'node_modules', '.pnpm');
  const dir = readdirSync(pnpmDir).find((d) => d.startsWith('sharp@'));
  if (!dir) throw new Error('sharp not found in node_modules/.pnpm');
  const sharpUrl = pathToFileURL(join(pnpmDir, dir, 'node_modules', 'sharp', 'lib', 'index.js')).href;
  sharp = (await import(sharpUrl)).default;
}

// --- sources (high-res, transparent) ---
const SRC_LIGHT = join(ROOT, 'public', 'brand', 'phigo-logo.png'); // light GO -> for DARK backgrounds
const SRC_DARK = join(ROOT, 'public', 'brand', 'phigo-logo-light.png'); // dark GO -> for LIGHT backgrounds

// Deep emerald "anchor" plate gradient (from globals.css .anchor-emerald)
const PLATE_GRADIENT = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="base" x1="0" y1="0" x2="${size}" y2="${size}" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00190c"/>
      <stop offset="55%" stop-color="#002e17"/>
      <stop offset="100%" stop-color="#00210f"/>
    </linearGradient>
    <radialGradient id="hi" cx="12%" cy="0%" r="115%">
      <stop offset="0%" stop-color="#004726"/>
      <stop offset="55%" stop-color="#004726" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#base)"/>
  <rect width="${size}" height="${size}" fill="url(#hi)"/>
</svg>`;

const CIRCLE_MASK = (size) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`;

async function trimmed(src) {
  return sharp(src).trim({ threshold: 10 }).toBuffer();
}

async function main() {
  // 1) Transparent wordmark PNGs, trimmed to the glyphs (full resolution masters)
  const lightWM = await trimmed(SRC_LIGHT);
  const darkWM = await trimmed(SRC_DARK);
  await sharp(lightWM).png().toFile(join(OUT, 'phigo-wordmark-light.png')); // for dark bg
  await sharp(darkWM).png().toFile(join(OUT, 'phigo-wordmark-dark.png')); // for light bg

  // 2) Editable vector wordmarks (Inter, matches on-site logo). PNGs above are the
  //    pixel-accurate masters; these SVGs are for editing in Figma/Illustrator.
  const wordmarkSVG = (goColor) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 260" width="780" height="260">
  <text x="390" y="200" text-anchor="middle" font-family="Inter, 'Helvetica Neue', Arial, sans-serif" font-weight="800" font-size="240" letter-spacing="-8">
    <tspan fill="#008d4d">PHI</tspan><tspan fill="${goColor}">GO</tspan>
  </text>
</svg>\n`;
  writeFileSync(join(OUT, 'phigo-wordmark-light.svg'), wordmarkSVG('#eeeeee'));
  writeFileSync(join(OUT, 'phigo-wordmark-dark.svg'), wordmarkSVG('#161616'));

  // 3) Profile plate — light wordmark centered on the deep-emerald anchor square, 1080
  const S = 1080;
  const plate = await sharp(Buffer.from(PLATE_GRADIENT(S))).png().toBuffer();
  const wmForPlate = await sharp(lightWM).resize({ width: Math.round(S * 0.62) }).toBuffer();
  const wmMeta = await sharp(wmForPlate).metadata();
  await sharp(plate)
    .composite([{ input: wmForPlate, left: Math.round((S - wmMeta.width) / 2), top: Math.round((S - wmMeta.height) / 2) }])
    .png()
    .toFile(join(OUT, 'phigo-profile-1080.png'));

  // 4) Round watermark avatar 256 — same plate, wordmark scaled to fit, circular crop
  const A = 256;
  const avatarPlate = await sharp(Buffer.from(PLATE_GRADIENT(A))).png().toBuffer();
  const wmForAvatar = await sharp(lightWM).resize({ width: Math.round(A * 0.7) }).toBuffer();
  const aMeta = await sharp(wmForAvatar).metadata();
  const composed = await sharp(avatarPlate)
    .composite([{ input: wmForAvatar, left: Math.round((A - aMeta.width) / 2), top: Math.round((A - aMeta.height) / 2) }])
    .png()
    .toBuffer();
  await sharp(composed)
    .composite([{ input: Buffer.from(CIRCLE_MASK(A)), blend: 'dest-in' }])
    .png()
    .toFile(join(OUT, 'phigo-avatar-256.png'));

  console.log('Exported to brand_assets/logo/:');
  for (const f of readdirSync(OUT)) console.log('  ' + f);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
