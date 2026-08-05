'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { PhigoLogo } from '@/components/phigo-logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

import Link from 'next/link'

/* Product pages under "Tjänster". Add /ai-receptionist and /chatbot here as
   those pages land — the desktop dropdown and the mobile group read from this. */
const products = [
  { label: 'Hemsida', href: '/hemsida', desc: 'Sajt som ger dig fler kunder' },
]

/* Top-level route links either side of the Tjänster group. */
const routeLinks = [
  { label: 'Exempel', href: '/cases' },
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
  const isProductsActive = products.some((p) => isRouteActive(p.href))

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
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-6">
        <Link href="/" aria-label="PHIGO, gå till startsidan">
          <PhigoLogo size="md" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Huvudnavigering">
          {/* Exempel */}
          <Link
            href="/cases"
            aria-current={isRouteActive('/cases') ? 'page' : undefined}
            className={cn(
              'relative text-sm font-medium transition-colors duration-200',
              isRouteActive('/cases')
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            Exempel
            <span
              className={cn(
                'absolute -bottom-1 left-0 h-px w-full bg-primary transition-transform duration-300 origin-left',
                isRouteActive('/cases') ? 'scale-x-100' : 'scale-x-0',
              )}
            />
          </Link>

          {/* Tjänster dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                'group relative flex cursor-pointer items-center gap-1 text-sm font-medium outline-none transition-colors duration-200 focus-visible:text-foreground',
                isProductsActive
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              Tjänster
              <ChevronDown
                className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
                aria-hidden="true"
              />
              <span
                className={cn(
                  'absolute -bottom-1 left-0 h-px w-[calc(100%-1.25rem)] bg-primary transition-transform duration-300 origin-left',
                  isProductsActive ? 'scale-x-100' : 'scale-x-0',
                )}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 rounded-xl border-border bg-popover p-2">
              {products.map((product) => (
                <DropdownMenuItem key={product.href} asChild className="cursor-pointer rounded-lg p-0">
                  <Link href={product.href} className="flex flex-col items-start gap-0.5 px-3 py-2.5">
                    <span className="text-sm font-semibold text-foreground">{product.label}</span>
                    <span className="text-xs text-muted-foreground">{product.desc}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Blogg */}
          <Link
            href="/blogg"
            aria-current={isRouteActive('/blogg') ? 'page' : undefined}
            className={cn(
              'relative text-sm font-medium transition-colors duration-200',
              isRouteActive('/blogg')
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            Blogg
            <span
              className={cn(
                'absolute -bottom-1 left-0 h-px w-full bg-primary transition-transform duration-300 origin-left',
                isRouteActive('/blogg') ? 'scale-x-100' : 'scale-x-0',
              )}
            />
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {/* Theme toggle — desktop, right of the nav links */}
          <ThemeToggle className="hidden md:inline-flex" />

          <Button
            asChild
            size="sm"
            className="hidden cursor-pointer rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 md:inline-flex"
          >
            <Link href="/#kontakt">Se vad din hemsida missar</Link>
          </Button>

          {/* Theme toggle — mobile, visible in the top bar (no menu needed) */}
          <ThemeToggle className="size-11 md:hidden" />

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden size-11"
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
