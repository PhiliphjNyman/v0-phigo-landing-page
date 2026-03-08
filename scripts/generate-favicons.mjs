/**
 * Generates favicon PNG files and a multi-size favicon.ico from public/favicon.svg
 * Uses sharp from the pnpm store (already a transitive dep via Next.js)
 */
import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const require = createRequire(import.meta.url)

// Locate sharp from pnpm store
let sharp
try {
  sharp = require('sharp')
} catch {
  // Fall back to pnpm store path
  const storePath = resolve(root, 'node_modules/.pnpm/sharp@0.34.5/node_modules/sharp')
  sharp = require(storePath)
}

const svgPath = resolve(root, 'public/favicon.svg')
const svgBuffer = readFileSync(svgPath)

async function generatePng(size, outputPath) {
  await sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toFile(outputPath)
  console.log(`  ✓ ${outputPath.replace(root, '.')} (${size}x${size})`)
}

async function buildIco(pngBuffers) {
  // ICO format: header + directory entries + image data
  // Modern ICO supports embedded PNG (Vista+)
  const count = pngBuffers.length
  const headerSize = 6
  const entrySize = 16
  const dirSize = count * entrySize
  const headerAndDir = headerSize + dirSize

  // Calculate offsets
  let offset = headerAndDir
  const offsets = []
  for (const buf of pngBuffers) {
    offsets.push(offset)
    offset += buf.length
  }

  const totalSize = offset
  const out = Buffer.alloc(totalSize)

  // ICO header (6 bytes)
  out.writeUInt16LE(0, 0)      // reserved
  out.writeUInt16LE(1, 2)      // type: 1 = icon
  out.writeUInt16LE(count, 4)  // number of images

  // Directory entries (16 bytes each)
  for (let i = 0; i < count; i++) {
    const base = headerSize + i * entrySize
    const size = pngBuffers[i].length

    // width/height: 0 means 256 for sizes >= 256
    const dim = [16, 32][i]
    out.writeUInt8(dim, base)         // width
    out.writeUInt8(dim, base + 1)     // height
    out.writeUInt8(0, base + 2)       // color count (0 = no palette)
    out.writeUInt8(0, base + 3)       // reserved
    out.writeUInt16LE(1, base + 4)    // planes
    out.writeUInt16LE(32, base + 6)   // bit count
    out.writeUInt32LE(size, base + 8) // data size
    out.writeUInt32LE(offsets[i], base + 12) // data offset
  }

  // Image data
  for (let i = 0; i < count; i++) {
    pngBuffers[i].copy(out, offsets[i])
  }

  return out
}

async function main() {
  console.log('Generating favicons from public/favicon.svg...')

  // Generate PNGs
  await generatePng(16,  resolve(root, 'public/favicon-16x16.png'))
  await generatePng(32,  resolve(root, 'public/favicon-32x32.png'))
  await generatePng(180, resolve(root, 'public/apple-touch-icon.png'))

  // Generate favicon.ico (16x16 + 32x32 embedded PNGs)
  const png16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer()
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer()

  const icoBuffer = await buildIco([png16, png32])
  const icoPath = resolve(root, 'public/favicon.ico')
  writeFileSync(icoPath, icoBuffer)
  console.log(`  ✓ ./public/favicon.ico (16x16 + 32x32)`)

  console.log('\nDone.')
}

main().catch((err) => { console.error(err); process.exit(1) })
