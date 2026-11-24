import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const isDev = process.env.NODE_ENV !== 'production'

/**
 * Content Security Policy, shipped in Report-Only mode (see headers() below).
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
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://unpkg.com https://va.vercel-scripts.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://storage.googleapis.com",
  "font-src 'self' data:",
  "connect-src 'self' https://api.elevenlabs.io wss://api.elevenlabs.io https://*.elevenlabs.io wss://*.elevenlabs.io https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  "media-src 'self' blob:",
  "worker-src 'self' blob:",
  "frame-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  // NOTE: add 'upgrade-insecure-requests' back when this policy flips to
  // enforcing Content-Security-Policy. In Report-Only mode the directive is
  // ignored by design and Chrome logs a console error on every page view.
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
          // Report-Only on purpose. Flip to Content-Security-Policy (enforcing)
          // only AFTER the ElevenLabs chat widget is live on the preview and the
          // browser console reports zero violations across the site (fas 5,
          // CHATBOT_V1_SPEC.md §17.5). Enforcing an untested allowlist risks a
          // dead widget on launch day.
          //
          // 'unsafe-inline' in script-src is required by Next's App Router
          // hydration payload. Removing it needs a nonce via middleware, which
          // forces every page dynamic and would cost us the static prerender of
          // all 23 routes — not worth it for a marketing site.
          { key: 'Content-Security-Policy-Report-Only', value: contentSecurityPolicy },
        ],
      },
    ]
  },
}

export default nextConfig
