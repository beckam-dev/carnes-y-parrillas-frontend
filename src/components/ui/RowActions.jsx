import { Pencil, Trash2 } from 'lucide-react'
import { Button } from './Button'

export function RowActions({ onEdit, onDelete, label }) {
  return (
    <div className="flex items-center justify-end gap-1 opacity-70 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100">
      <Button
        variant="ghost"
        size="icon"
        aria-label={`Editar ${label}`}
        onClick={onEdit}
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        variant="dangerSoft"
        size="icon"
        aria-label={`Eliminar ${label}`}
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
