/**
 * HeroMesh — Stripe-style woven emerald band sweep.
 *
 * A decorative background layer for the hero: several distinct emerald RIBBONS
 * of different shades (light → mid → deep → near-black, hue ~160) that overlap
 * and weave at crossing angles, concentrated in the TOP-RIGHT corner and
 * dissolving diffusely toward the center-left so the left-side heading sits on
 * clean light background. The richness comes from the shades and the woven form,
 * never from extra hues.
 *
 * Implementation lives in globals.css (`.hero-mesh*`) so the oklch gradient
 * stops stay out of JSX (see lessons.md). Each band is an elongated ellipse
 * (high aspect ratio) rotated to its own angle; moderate (not heavy) blur keeps
 * the ribbons separable instead of merging into one blob. The bands animate
 * ONLY transform (slow drift + slight rotate + scale around their base angle,
 * GPU-composited); the diffuse fade is a STATIC radial mask, not an animated
 * property. The resting (base-transform) state is already a complete woven mesh,
 * so prefers-reduced-motion / mobile (which disable the animation) render a
 * clean static version.
 *
 * Same emerald bands in light and dark mode — only the wrapper opacity differs
 * so the sweep stays a rich-but-contained corner accent on the near-white hero,
 * and a fuller glow on the dark hero.
 */
export function HeroMesh() {
  return (
    <div
      aria-hidden="true"
      className="hero-mesh pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-90 dark:opacity-100"
    >
      <div className="hero-mesh__band hero-mesh__band--1" />
      <div className="hero-mesh__band hero-mesh__band--2" />
      <div className="hero-mesh__band hero-mesh__band--3" />
      <div className="hero-mesh__band hero-mesh__band--4" />
      <div className="hero-mesh__band hero-mesh__band--5" />
    </div>
  )
}
