import { cn } from '../lib/cn'

export function Dock({ items, active, onChange }) {
  return (
    <nav
      aria-label="Módulos de administración"
      className="fixed top-1/2 left-3 z-40 -translate-y-1/2 sm:left-6"
    >
      <div className="flex animate-dock-in flex-col items-center gap-1.5 rounded-[24px] border border-white/80 bg-white/75 p-2 shadow-dock backdrop-blur-xl sm:gap-2 sm:rounded-[26px] sm:p-2.5">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = item.id === active

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'group relative flex h-10 w-10 items-center justify-center rounded-xl outline-none transition-all duration-300 focus-visible:ring-4 focus-visible:ring-ember-200 sm:h-12 sm:w-12 sm:rounded-2xl',
                isActive
                  ? 'bg-ember-500 text-white shadow-ember'
                  : 'text-cocoa-400 hover:-translate-y-0.5 hover:bg-cream-100 hover:text-ember-600',
              )}
            >
              <Icon
                aria-hidden="true"
                strokeWidth={isActive ? 2.2 : 1.8}
                className={cn(
                  'h-4 w-4 transition-transform duration-300 sm:h-5 sm:w-5',
                  isActive
                    ? 'scale-110'
                    : 'group-hover:-rotate-6 group-hover:scale-110',
                )}
              />

              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-full ml-3 flex -translate-y-1/2 translate-x-1 items-center rounded-xl bg-ink-900 px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-cream-50 opacity-0 shadow-lg transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
              >
                {item.label}
              </span>

              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute -right-1 h-1.5 w-1.5 animate-soft-pulse rounded-full bg-ember-500 ring-2 ring-white"
                />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
