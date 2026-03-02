'use client'

import { useState, useEffect } from 'react'
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
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Case', href: '#case' },
  { label: 'Tjanster', href: '#tjanster' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-sm'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-6">
        <PhigoLogo size="md" />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Huvudnavigering">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            asChild
            size="sm"
            className="hidden cursor-pointer rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 md:inline-flex"
          >
            <a href="#kontakt">Kostnadsfri analys</a>
          </Button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="md:hidden"
                aria-label="Oppna meny"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-background border-border">
              <SheetHeader>
                <SheetTitle>
                  <PhigoLogo size="md" />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 px-4 pt-4" aria-label="Mobilnavigering">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-base text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
                <Button
                  asChild
                  className="mt-4 w-full cursor-pointer rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => setOpen(false)}
                >
                  <a href="#kontakt">Kostnadsfri analys</a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
