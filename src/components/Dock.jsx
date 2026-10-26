import { NavLink } from 'react-router-dom'
import { cn } from '../lib/cn'

export function Dock({ items }) {
  return (
    <nav
      aria-label="Módulos del administrador"
      className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 xl:top-1/2 xl:bottom-auto xl:left-6 xl:-translate-x-0 xl:-translate-y-1/2"
    >
      <div className="flex animate-fade-up flex-row items-center gap-1.5 rounded-[24px] border border-white/80 bg-white/75 p-2 shadow-dock backdrop-blur-xl xl:animate-dock-in xl:flex-col xl:gap-2 xl:rounded-[26px] xl:p-2.5">
        {items.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.to}
              to={item.to}
              aria-label={item.label}
              className={({ isActive }) =>
                cn(
                  'group relative flex h-11 w-11 items-center justify-center rounded-xl outline-none transition-all duration-300 focus-visible:ring-4 focus-visible:ring-ember-200 xl:h-12 xl:w-12 xl:rounded-2xl',
                  isActive
                    ? 'bg-ember-500 text-white shadow-ember'
                    : 'text-cocoa-400 hover:-translate-y-0.5 hover:bg-cream-100 hover:text-ember-600',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    aria-hidden="true"
                    strokeWidth={isActive ? 2.2 : 1.8}
                    className={cn(
                      'h-5 w-5 transition-transform duration-300',
                      isActive
                        ? 'scale-110'
                        : 'group-hover:-rotate-6 group-hover:scale-110',
                    )}
                  />

                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-full ml-3 hidden -translate-y-1/2 translate-x-1 items-center rounded-xl bg-ink-900 px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-cream-50 opacity-0 shadow-lg transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 xl:flex"
                  >
                    {item.label}
                  </span>

                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute -right-1 hidden h-1.5 w-1.5 animate-soft-pulse rounded-full bg-ember-500 ring-2 ring-white xl:block"
                    />
                  )}
                </>
              )}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
