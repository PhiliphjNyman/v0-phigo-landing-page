import { cn } from '@/lib/utils'

interface PhigoLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
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
      <span className="text-primary">phi</span>
      <span className="text-foreground">go</span>
    </div>
  )
}
