import { cn } from '@/lib/utils'

interface PhigoLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'text-xl',
  md: 'text-3xl',
  lg: 'text-3xl',
}

export function PhigoLogo({ className, size = 'md' }: PhigoLogoProps) {
  return (
    <div
      className={cn(
        'font-sans font-bold tracking-tight select-none',
        sizeClasses[size],
        className,
      )}
    >
      <span className="text-primary">PHI</span>
      <span className="text-foreground">GO</span>
    </div>
  )
}
