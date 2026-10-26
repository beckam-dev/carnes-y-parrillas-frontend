export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cream-100 text-cocoa-400">
        <Icon aria-hidden="true" className="h-6 w-6" />
      </span>
      <div>
        <p className="font-display text-xl font-semibold text-ink-900">{title}</p>
        <p className="mx-auto mt-1 max-w-sm text-sm text-cocoa-500">
          {description}
        </p>
      </div>
      {action}
    </div>
  )
}
