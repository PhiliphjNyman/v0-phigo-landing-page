'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

/* Dot indicators for the mobile swipe rows (moment 5). Minimal JS, no library.
   Tracks the active slide by finding the child whose horizontal center is
   nearest the scroll container's center (robust with scroll-snap center), on a
   rAF-throttled scroll listener that is only wired below `md` (matchMedia) and
   torn down on resize/unmount. Clicking a dot centers that slide; smooth unless
   the user prefers reduced motion. Hidden on desktop (md+ shows the grid). */
export function SwipeDots({
  scrollRef,
  count,
  label = 'kort',
  className,
}: {
  scrollRef: React.RefObject<HTMLDivElement | null>
  count: number
  label?: string
  className?: string
}) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const mq = window.matchMedia('(max-width: 767px)')
    let raf = 0
    let attached = false

    const computeActive = () => {
      raf = 0
      const slides = Array.from(el.children) as HTMLElement[]
      if (slides.length === 0) return
      const containerCenter = el.getBoundingClientRect().left + el.clientWidth / 2
      let best = 0
      let bestDist = Infinity
      slides.forEach((slide, i) => {
        const r = slide.getBoundingClientRect()
        const dist = Math.abs(r.left + r.width / 2 - containerCenter)
        if (dist < bestDist) {
          bestDist = dist
          best = i
        }
      })
      setActive(best)
    }

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(computeActive)
    }

    const sync = () => {
      if (mq.matches && !attached) {
        el.addEventListener('scroll', onScroll, { passive: true })
        attached = true
        computeActive()
      } else if (!mq.matches && attached) {
        el.removeEventListener('scroll', onScroll)
        attached = false
      }
    }

    sync()
    mq.addEventListener('change', sync)

    return () => {
      if (attached) el.removeEventListener('scroll', onScroll)
      mq.removeEventListener('change', sync)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [scrollRef, count])

  const goTo = (i: number) => {
    const el = scrollRef.current
    if (!el) return
    const slide = el.children[i] as HTMLElement | undefined
    if (!slide) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const elRect = el.getBoundingClientRect()
    const r = slide.getBoundingClientRect()
    const delta = r.left + r.width / 2 - (elRect.left + el.clientWidth / 2)
    el.scrollBy({ left: delta, behavior: reduce ? 'auto' : 'smooth' })
  }

  if (count <= 1) return null

  return (
    <div className={cn('mt-6 flex items-center justify-center gap-2 md:hidden', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => goTo(i)}
          aria-label={`Gå till ${label} ${i + 1}`}
          aria-current={i === active}
          className={cn(
            'h-1.5 rounded-full transition-[width,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            i === active ? 'w-5 bg-primary' : 'w-1.5 bg-border',
          )}
        />
      ))}
    </div>
  )
}
