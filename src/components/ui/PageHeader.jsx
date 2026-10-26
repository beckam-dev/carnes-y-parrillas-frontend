export function PageHeader({ eyebrow, title, description, action }) {
  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-[11px] font-semibold tracking-[0.24em] text-ember-600 uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-cocoa-500">
          {description}
        </p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  )
}
