import { cn } from '../../lib/cn'

const variants = {
  primary:
    'bg-ember-500 text-white shadow-ember hover:bg-ember-600 focus-visible:ring-ember-200',
  secondary:
    'border border-cream-200 bg-white/80 text-ink-700 hover:border-cocoa-200 hover:bg-cream-50 focus-visible:ring-cream-300',
  ghost:
    'text-cocoa-500 hover:bg-cream-100 hover:text-ink-900 focus-visible:ring-cream-300',
  danger:
    'bg-rose-600 text-white hover:bg-rose-600/90 focus-visible:ring-rose-200',
  dangerSoft:
    'text-cocoa-400 hover:bg-rose-100 hover:text-rose-600 focus-visible:ring-rose-200',
}

const sizes = {
  sm: 'h-9 gap-1.5 rounded-xl px-3.5 text-[13px]',
  md: 'h-11 gap-2 rounded-2xl px-5 text-sm',
  icon: 'h-9 w-9 rounded-xl',
}

export function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  className,
  children,
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-200 outline-none focus-visible:ring-4 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
