'use client'

import { useRouter } from 'next/navigation'
import type { MouseEvent } from 'react'

/**
 * Renders trusted article HTML (lib/blog.ts — developer-authored, never user
 * input) with one job on top: internal links inside the HTML navigate through
 * the Next router instead of a full page load.
 *
 * Why: a plain <a href="/#kontakt"> in article HTML has the exact failure the
 * step A CTA fix addressed — the full load fires the browser's fragment scroll
 * before the homepage settles, so the reader lands at the top instead of on
 * the contact form (see lessons.md 2026-08). Raw HTML cannot use <CtaLink>, so
 * a delegated click handler does the same job for every internal href at once.
 */
export function ArticleHtml({ html, className }: { html: string; className?: string }) {
  const router = useRouter()

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    // Respect new-tab/download modifiers and non-primary buttons.
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const anchor = (e.target as HTMLElement).closest('a')
    if (!anchor) return
    const href = anchor.getAttribute('href')
    if (!href || !href.startsWith('/')) return // external, mailto:, tel:, #same-page
    e.preventDefault()
    router.push(href)
  }

  // The div is not itself interactive — the delegated handler only re-routes
  // clicks on real <a> elements inside the HTML, so keyboard activation and
  // semantics live on the links as usual.
  return <div className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: html }} />
}
