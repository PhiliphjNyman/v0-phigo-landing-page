import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const isDev = process.env.NODE_ENV !== 'production'

// Vercel injects its feedback toolbar (vercel.live) on preview deployments
// only. Allow it there so the enforcing policy does not break the toolbar or
// flood the preview console; production never loads it and never allows it.
const isPreview = process.env.VERCEL_ENV === 'preview'
const vercelLive = isPreview ? ' https://vercel.live' : ''

/**
 * Content Security Policy, ENFORCING since 2026-11-24 (flipped from
 * Report-Only after the preview console was quiet with the chat widget in a
 * live conversation: zero violations from ElevenLabs, see headers() below).
 *
 * Hosts for the ElevenLabs chat widget (fas 5, components/chat-widget.tsx):
 *   - unpkg.com                 widget bundle (script, pinned version)
 *   - api.elevenlabs.io + *.elevenlabs.io (https + wss)
 *                               conversation API and realtime socket
 *   - storage.googleapis.com    agent avatar image
 * Voiceflow hosts were removed when the chatbot moved to ElevenLabs.
 * Vercel Analytics / Speed Insights are served same-origin under /_vercel/ in
 * production but fall back to va.vercel-scripts.com, so both are listed.
 *
 * 'unsafe-eval' is dev-only (webpack HMR) and never reaches production.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://unpkg.com https://va.vercel-scripts.com${vercelLive}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://storage.googleapis.com",
  "font-src 'self' data:",
  `connect-src 'self' https://api.elevenlabs.io wss://api.elevenlabs.io https://*.elevenlabs.io wss://*.elevenlabs.io https://va.vercel-scripts.com https://vitals.vercel-insights.com${vercelLive}`,
  "media-src 'self' blob:",
  "worker-src 'self' blob:",
  `frame-src 'self'${vercelLive}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ')

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: __dirname,
  },
  typescript: {
    // Type errors fail the build. Was true, which silently skipped validation;
    // tsc --noEmit is green, so the trap is disarmed rather than worked around.
    ignoreBuildErrors: false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // Enforcing. To debug a blocked resource, temporarily switch the key
          // back to Content-Security-Policy-Report-Only: the browser then only
          // logs violations instead of blocking them.
          //
          // 'unsafe-inline' in script-src is required by Next's App Router
          // hydration payload. Removing it needs a nonce via middleware, which
          // forces every page dynamic and would cost us the static prerender of
          // all 23 routes — not worth it for a marketing site.
          { key: 'Content-Security-Policy', value: contentSecurityPolicy },
        ],
      },
    ]
  },
}

export default nextConfig
