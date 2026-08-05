import { ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

/* The site's most important trust line, extracted so the copy AND the glass
   style live in ONE place. Used on the desktop hero stat block and (compact) on
   the mobile hero under the CTAs. `data-orb-protect` keeps hero orbs off the
   text (visual-rules R2). Note: the offer price card carries a different,
   left-aligned treatment of the same promise and is intentionally NOT unified
   here — this component owns only the centered glass pill. */
export function SplitPaymentPromise({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-center',
        className,
      )}
    >
      <ShieldCheck className="size-4 shrink-0 text-primary" aria-hidden="true" />
      <span data-orb-protect className="text-xs font-medium text-foreground">
        Betala hälften nu, resten först när du är nöjd
      </span>
    </div>
  )
}
