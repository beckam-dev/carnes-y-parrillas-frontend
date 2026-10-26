import { cn } from '../../lib/cn'

const tones = {
  ember: 'bg-ember-100 text-ember-600',
  sage: 'bg-sage-100 text-sage-600',
  sky: 'bg-sky-100 text-sky-600',
  butter: 'bg-butter-100 text-butter-600',
  rose: 'bg-rose-100 text-rose-600',
}

export function StatCard({ icon: Icon, label, value, hint, tone = 'ember' }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/80 bg-white/70 p-5 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5">
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.16em] text-cocoa-400 uppercase">
            {label}
          </p>
          <p className="mt-2 font-display text-4xl leading-none font-semibold text-ink-900">
            {value}
          </p>
          {hint && <p className="mt-2 text-xs text-cocoa-400">{hint}</p>}
        </div>
        <span
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl',
            tones[tone],
          )}
        >
          <Icon aria-hidden="true" className="h-5 w-5" />
        </span>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -bottom-10 h-28 w-28 rounded-full bg-cream-100/80 blur-2xl"
      />
    </div>
  )
}
