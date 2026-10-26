import { Flame } from 'lucide-react'

function getTodayLabel() {
  const label = new Intl.DateTimeFormat('es-PE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date())

  return label.charAt(0).toUpperCase() + label.slice(1)
}

export function AppShell({ children }) {
  return (
    <div className="relative min-h-svh overflow-x-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute top-24 -left-24 h-72 w-72 rounded-full bg-ember-100/70 blur-3xl" />
        <div className="absolute -top-16 -right-24 h-80 w-80 rounded-full bg-cocoa-100/50 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-cream-200/70 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-6 pb-32 sm:px-6 xl:px-12 xl:pb-14">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink-900 text-ember-300 shadow-soft">
              <Flame aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-lg leading-tight font-semibold text-ink-900">
                Carnes & Parrillas
              </p>
              <p className="text-[10px] font-semibold tracking-[0.18em] text-cocoa-400 uppercase">
                Sistema interno
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden rounded-full border border-white/80 bg-white/70 px-4 py-2 text-xs font-medium text-cocoa-500 backdrop-blur-sm md:inline-flex">
              {getTodayLabel()}
            </span>

            <div className="flex items-center gap-2.5 rounded-full border border-white/80 bg-white/70 p-1.5 backdrop-blur-sm sm:py-1.5 sm:pr-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ember-200 text-[11px] font-bold text-ember-700">
                RS
              </span>
              <div className="hidden leading-tight sm:block">
                <p className="text-xs font-semibold text-ink-900">
                  Renzo Salazar
                </p>
                <p className="text-[9px] font-semibold tracking-wider text-cocoa-400 uppercase">
                  Administrador
                </p>
              </div>
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  )
}
