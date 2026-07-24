'use client'

import { useEffect, useRef, type CSSProperties } from 'react'

interface HeroOrbProps {
  /** Diameter in px. */
  size?: number
  /** Seconds per full revolution at rest. */
  period?: number
  /** Rotation direction: 1 = clockwise, -1 = counter-clockwise. */
  direction?: 1 | -1
  /** Scroll-parallax factor (0.15–0.35). Displacement capped at 40px. Section-
   *  relative: 0 when the orb's section is centred in the viewport. */
  parallax?: number
  /** Reacts to the pointer (proximity). Only one orb per view should. */
  interactive?: boolean
  /** Texture-layer opacity: 1 ≈ full contrast (primary), lower = supporting. */
  textureOpacity?: number
  /** Position/size/visibility utility classes for the wrapper. */
  className?: string
  /** Short id for the visual-rules checker's report. */
  label?: string
  /** Intentionally occluded by a content element — checker skips overlap (R2). */
  occludeOk?: boolean
  /** Orb sits on a dark surface regardless of theme (e.g. the anchor) → always
   *  apply the silhouette rim, not only in dark mode. */
  onDark?: boolean
  /** Which glow the orb lives in, for the checker's zone rule. 'tr'/'tl' =
   *  top-right/-left corner glow (enforced); 'card' = the whole container is
   *  atmospheric (e.g. the anchor), so the zone check is skipped. */
  glow?: 'tr' | 'tl' | 'card'
  /** Lightweight static variant for mobile/tablet: a single gradient sphere, no
   *  child layers, no rAF, no blend modes — cheap, discrete background. */
  flat?: boolean
}

export function HeroOrb({
  size = 200,
  period = 45,
  direction = 1,
  parallax = 0,
  interactive = false,
  textureOpacity = 0.95,
  className = '',
  label,
  occludeOk = false,
  onDark = false,
  glow = 'tr',
  flat = false,
}: HeroOrbProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (flat) return // static — no loop
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const fine = window.matchMedia('(pointer: fine)').matches
    const proximity = interactive && fine

    let pullX = 0
    let pullY = 0
    let rot = 0
    let speedMul = 1
    let last = performance.now()
    let raf = 0
    let running = false
    let scrollYCache = window.scrollY

    const BASE_DPS = (360 / period) * direction
    const section = el.closest('[data-hero], [data-anchor]') || el.closest('section')

    // Geometry that only changes on resize/layout: the orb's document-space base
    // centre (for proximity) and the scroll offset at which its section is
    // centred (parallax rest point). Computed at mount + on resize, never per
    // frame — no layout thrash in the loop.
    let absCx0 = 0
    let absCy0 = 0
    let restScroll = 0
    const computeGeom = () => {
      const vh = window.innerHeight
      const r = el.getBoundingClientRect()
      absCx0 = r.left + r.width / 2 + window.scrollX - pullX
      absCy0 = r.top + r.height / 2 + window.scrollY - pullY
      if (section) {
        const s = section.getBoundingClientRect()
        restScroll = s.top + window.scrollY + s.height / 2 - vh / 2
      }
    }

    let ptrX = -9999
    let ptrY = -9999
    let hasPtr = false
    const onMove = (e: PointerEvent) => {
      ptrX = e.clientX
      ptrY = e.clientY
      hasPtr = true
    }

    let geomQueued = false
    const queueGeom = () => {
      if (geomQueued) return
      geomQueued = true
      requestAnimationFrame(() => {
        geomQueued = false
        computeGeom()
      })
    }
    const onScroll = () => {
      scrollYCache = window.scrollY
    }

    const RANGE = 200
    const MAX_PULL = 15
    const MAX_PARALLAX = 40

    const frame = (now: number) => {
      if (!running) return
      const dt = Math.min(50, now - last) / 1000
      last = now

      let prox = 0
      let dirX = 0
      let dirY = 0
      if (proximity && hasPtr) {
        const cxV = absCx0 - window.scrollX
        const cyV = absCy0 - scrollYCache
        const dx = ptrX - cxV
        const dy = ptrY - cyV
        const dist = Math.hypot(dx, dy)
        prox = Math.max(0, Math.min(1, 1 - dist / RANGE))
        prox = prox * prox
        if (dist > 0.001) {
          dirX = dx / dist
          dirY = dy / dist
        }
      }

      const k = Math.min(1, dt * 6)
      pullX += (dirX * MAX_PULL * prox - pullX) * k
      pullY += (dirY * MAX_PULL * prox - pullY) * k

      const targetMul = 1 + 3 * prox
      speedMul += (targetMul - speedMul) * Math.min(1, dt * 3)
      rot = (rot + BASE_DPS * speedMul * dt) % 360

      const par = parallax
        ? Math.max(-MAX_PARALLAX, Math.min(MAX_PARALLAX, (scrollYCache - restScroll) * parallax))
        : 0

      const s = el.style
      s.setProperty('--orb-x', pullX.toFixed(2) + 'px')
      s.setProperty('--orb-y', (pullY + par).toFixed(2) + 'px')
      s.setProperty('--orb-rot', rot.toFixed(2) + 'deg')

      raf = requestAnimationFrame(frame)
    }

    // Only run the loop while the orb is actually visible. Hidden responsive
    // variants (display:none via lg:block / lg:hidden) must not burn a rAF —
    // e.g. the desktop cluster is display:none on mobile.
    const start = () => {
      if (running) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      running = false
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }
    const syncVisibility = () => {
      if (el.offsetParent !== null) start()
      else stop()
    }
    const onResize = () => {
      queueGeom()
      syncVisibility()
    }

    computeGeom()
    if (proximity) window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    syncVisibility()

    return () => {
      stop()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [period, direction, parallax, interactive, flat])

  return (
    <div
      ref={ref}
      style={{ '--orb-size': `${size}px`, '--orb-tex': textureOpacity } as CSSProperties}
      className={`hero-orb pointer-events-none absolute z-0 ${flat ? 'hero-orb--flat' : ''} ${
        onDark ? 'hero-orb--on-dark' : ''
      } ${className}`}
      aria-hidden="true"
      data-orb-label={label}
      data-occlude-ok={occludeOk ? 'true' : undefined}
      data-glow={glow}
    >
      {!flat && (
        <>
          <div className="hero-orb__texture" />
          <div className="hero-orb__rim" />
          <div className="hero-orb__sheen" />
          <div className="hero-orb__gloss" />
        </>
      )}
    </div>
  )
}
