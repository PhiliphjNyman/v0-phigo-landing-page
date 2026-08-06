'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * Theme toggle. The icon shows the DESTINATION (what you switch TO):
 *   light mode → Moon (click → dark), dark mode → Sun (click → light).
 * A mounted-guard avoids a hydration mismatch: next-themes can't know the
 * theme server-side, so we render a stable same-size placeholder until mounted.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === 'dark'
  // Until mounted, resolvedTheme is undefined (server + first client render),
  // so use a neutral, theme-agnostic label that is identical on both — the
  // theme-specific label only appears once we know the theme on the client.
  // This keeps aria-label/title from mismatching during hydration.
  const label = !mounted
    ? 'Växla färgtema'
    : isDark
      ? 'Växla till ljust läge'
      : 'Växla till mörkt läge'

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={label}
      title={label}
      className={cn(
        'cursor-pointer rounded-lg text-muted-foreground hover:text-foreground active:scale-[0.98] motion-reduce:active:scale-100',
        className,
      )}
    >
      {mounted ? (
        <span className="relative size-5" aria-hidden="true">
          <Sun
            className={cn(
              'absolute inset-0 size-5 transition-[opacity,transform] duration-200 motion-reduce:transition-none',
              isDark ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0',
            )}
          />
          <Moon
            className={cn(
              'absolute inset-0 size-5 transition-[opacity,transform] duration-200 motion-reduce:transition-none',
              isDark ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100',
            )}
          />
        </span>
      ) : (
        <span className="size-5" aria-hidden="true" />
      )}
    </Button>
  )
}
