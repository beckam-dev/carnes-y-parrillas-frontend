import { cn } from '../../lib/cn'

export function DataTable({ columns, rows, keyField = 'id', empty }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/80 bg-white/80 shadow-soft backdrop-blur-sm">
      {rows.length === 0 ? (
        empty
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left">
            <thead>
              <tr className="border-b border-cream-200/80 bg-cream-50/70">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    className={cn(
                      'px-5 py-3.5 text-[10px] font-semibold tracking-[0.16em] whitespace-nowrap text-cocoa-400 uppercase',
                      column.align === 'right' && 'text-right',
                      column.headerClassName,
                    )}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row[keyField]}
                  className="group border-b border-cream-100 transition-colors duration-200 last:border-0 hover:bg-cream-50/60"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(
                        'px-5 py-4 align-middle text-sm text-ink-700',
                        column.align === 'right' && 'text-right',
                        column.className,
                      )}
                    >
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
