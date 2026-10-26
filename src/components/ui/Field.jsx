import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/cn'
import { inputStyles } from '../../lib/styles'

export function Field({ label, hint, className, children }) {
  return (
    <label className={cn('block', className)}>
      <span className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="text-[11px] font-semibold tracking-[0.14em] text-cocoa-400 uppercase">
          {label}
        </span>
        {hint && (
          <span className="text-[11px] font-medium text-cocoa-300">{hint}</span>
        )}
      </span>
      {children}
    </label>
  )
}

export function Input({ className, ...props }) {
  return <input className={cn(inputStyles, className)} {...props} />
}

export function Select({ className, children, ...props }) {
  return (
    <div className="relative">
      <select
        className={cn(inputStyles, 'appearance-none pr-10', className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-cocoa-400"
      />
    </div>
  )
}
