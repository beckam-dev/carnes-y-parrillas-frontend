import { cn } from '../../lib/cn'

const tones = {
  ember: 'border-ember-200 bg-ember-100 text-ember-700',
  sage: 'border-sage-200 bg-sage-100 text-sage-600',
  sky: 'border-sky-200 bg-sky-100 text-sky-600',
  rose: 'border-rose-200 bg-rose-100 text-rose-600',
  butter: 'border-butter-200 bg-butter-100 text-butter-600',
  neutral: 'border-cream-200 bg-cream-100 text-cocoa-500',
}

export function Badge({ tone = 'neutral', dot = false, className, children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap',
        tones[tone],
        className,
      )}
    >
      {dot && (
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-current opacity-70"
        />
      )}
      {children}
    </span>
  )
}
