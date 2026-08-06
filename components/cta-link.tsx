import Link from 'next/link'

/**
 * Renders a CTA target as next/link for internal routes and a plain anchor for
 * everything else (tel:, mailto:, external, same-page #anchors).
 *
 * Why this exists: a plain <a href="/#kontakt"> does a full page load, and the
 * browser's fragment scroll does not survive the homepage's layout settling —
 * verified in scripts/cta-anchors.mjs, the visitor lands at the top instead of
 * on the contact form. next/link navigates client-side and lands correctly.
 * These hrefs arrive as props, so eslint's no-html-link-for-pages cannot catch
 * them; keep new CTA components on this helper.
 */
export function CtaLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}
