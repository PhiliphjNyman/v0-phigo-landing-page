'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { PhigoLogo } from '@/components/phigo-logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

import Link from 'next/link'

/* The three product pages. Desktop renders them as direct nav links (no
   dropdown); the mobile Sheet groups them under a "Tjänster" heading. */
const products = [
  { label: 'Hemsida', href: '/hemsida' },
  { label: 'AI-Receptionist', href: '/ai-receptionist' },
  { label: 'Chatbot', href: '/chatbot' },
]

/* Full desktop nav order: Exempel, the three products, Blogg. */
const desktopLinks = [
  { label: 'Exempel', href: '/cases' },
  ...products,
  { label: 'Blogg', href: '/blogg' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // rAF-throttle: coalesce scroll events to one read per frame, so the
    // listener never does layout work more than once per painted frame.
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        setScrolled(window.scrollY > 20)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const isRouteActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top)] transition-[background-color,border-color,box-shadow] duration-300',
        scrolled
          ? // Mobile: near-solid bar, NO backdrop-filter (a fixed blur layer
            // re-samples the page every scroll frame = the main mobile jank).
            // Desktop (md:) keeps the glassmorphism — more GPU headroom there.
            'bg-background/90 border-b border-border shadow-sm md:bg-background/80 md:backdrop-blur-xl'
          : 'bg-transparent',
      )}
    >
      {/* Skip link — first tabbable element on every page carrying the header.
          Same-page fragment, so a plain anchor is correct (not CtaLink). Visible
          only on keyboard focus; every route's <main> carries id="innehall". */}
      <a
        href="#innehall"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Hoppa till innehållet
      </a>

      {/* In the md–lg (tablet/hamburger) range, pull the toggle + hamburger
          well inward with a wide right gutter (they sit roughly above the hero
          midline, not tight in the corner); the logo keeps its left gutter. */}
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:pl-10 md:pr-32 lg:px-6">
        <Link href="/" aria-label="PHIGO, gå till startsidan">
          <PhigoLogo size="md" />
        </Link>

        {/* Desktop nav — direct links, no dropdown */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Huvudnavigering">
          {desktopLinks.map((link) => {
            const active = isRouteActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative text-sm font-medium transition-colors duration-200',
                  active
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute -bottom-1 left-0 h-px w-full bg-primary transition-transform duration-200 origin-left',
                    active ? 'scale-x-100' : 'scale-x-0',
                  )}
                />
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* Theme toggle — desktop, right of the nav links */}
          <ThemeToggle className="hidden lg:inline-flex" />

          <Button
            asChild
            size="sm"
            className="hidden cursor-pointer rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 lg:inline-flex"
          >
            <Link href="/#kontakt">Se vad din hemsida missar</Link>
          </Button>

          {/* Theme toggle — mobile/tablet, visible in the top bar (no menu needed) */}
          <ThemeToggle className="size-11 lg:hidden" />

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden size-11"
                aria-label="Öppna meny"
              >
                <Menu className="size-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-background border-border">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" onClick={() => setOpen(false)}>
                    <PhigoLogo size="md" />
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 px-4 pt-4" aria-label="Mobilnavigering">
                <Link
                  href="/cases"
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Exempel
                </Link>

                {/* Tjänster group — heading + nested product links */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/70">
                    Tjänster
                  </span>
                  {products.map((product) => (
                    <Link
                      key={product.href}
                      href={product.href}
                      onClick={() => setOpen(false)}
                      className="pl-3 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {product.label}
                    </Link>
                  ))}
                </div>

                <Link
                  href="/blogg"
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Blogg
                </Link>

                <Button
                  asChild
                  className="mt-4 w-full cursor-pointer rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => setOpen(false)}
                >
                  <Link href="/#kontakt">Se vad din hemsida missar</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
