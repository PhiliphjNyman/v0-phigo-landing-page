import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const isDev = process.env.NODE_ENV !== 'production'

/**
 * Content Security Policy, shipped in Report-Only mode (see headers() below).
 *
 * Voiceflow hosts are pre-allowed so the fas 5 chat widget and guide embed do
 * not require a policy rewrite:
 *   - cdn.voiceflow.com              widget bundle (script) + widget assets
 *   - general-runtime.voiceflow.com  runtime API the widget talks to
 *   - *.voiceflow.com                covers the remaining first-party hosts
 * Vercel Analytics / Speed Insights are served same-origin under /_vercel/ in
 * production but fall back to va.vercel-scripts.com, so both are listed.
 *
 * 'unsafe-eval' is dev-only (webpack HMR) and never reaches production.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://cdn.voiceflow.com https://va.vercel-scripts.com`,
  "style-src 'self' 'unsafe-inline'",
  'img-src \'self\' data: blob: https://cdn.voiceflow.com https://s3.amazonaws.com',
  "font-src 'self' data:",
  "connect-src 'self' https://general-runtime.voiceflow.com https://api.voiceflow.com https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  "frame-src 'self' https://*.voiceflow.com",
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
    ignoreBuildErrors: true,
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
          // Report-Only on purpose. The Voiceflow chat widget and guide embed land
          // in fas 5; the allowlist below is seeded from their documented hosts
          // (cdn.voiceflow.com for the bundle, general-runtime.voiceflow.com for
          // the runtime API) but their asset hosts are not fully documented, so
          // enforcing now would risk breaking the widget on launch day.
          //
          // Flip to Content-Security-Policy (enforcing) AFTER the fas 5 embed is
          // live and the browser console reports zero violations across the site.
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
