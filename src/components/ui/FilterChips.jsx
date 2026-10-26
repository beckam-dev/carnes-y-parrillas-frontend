import { cn } from '../../lib/cn'

export function FilterChips({ options, value, onChange }) {
  return (
    <div
      role="group"
      aria-label="Filtrar resultados"
      className="flex flex-wrap items-center gap-1"
    >
      {options.map((option) => {
        const isActive = option.value === value

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={isActive}
            className={cn(
              'rounded-full border px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-200',
              isActive
                ? 'border-ember-200 bg-ember-100 text-ember-700'
                : 'border-transparent text-cocoa-400 hover:bg-cream-100 hover:text-ink-700',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
