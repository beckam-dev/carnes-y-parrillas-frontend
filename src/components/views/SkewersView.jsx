import { useMemo, useState } from 'react'
import { CircleCheck, Coins, Drumstick, Plus } from 'lucide-react'
import { SKEWER_TYPES } from '../../data/seed'
import { formatCurrency } from '../../lib/format'
import { SkewerForm } from '../forms/SkewerForm'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { ConfirmDialog } from '../ui/ConfirmDialog'
import { DataTable } from '../ui/DataTable'
import { EmptyState } from '../ui/EmptyState'
import { FilterChips } from '../ui/FilterChips'
import { Modal } from '../ui/Modal'
import { PageHeader } from '../ui/PageHeader'
import { RowActions } from '../ui/RowActions'
import { SearchInput } from '../ui/SearchInput'
import { StatCard } from '../ui/StatCard'
import { Toggle } from '../ui/Toggle'

const typeTones = {
  Res: 'ember',
  Pollo: 'butter',
  Cerdo: 'rose',
  Mixto: 'sky',
  Vegetariano: 'sage',
}

const filterOptions = [
  { value: 'all', label: 'Todos' },
  ...SKEWER_TYPES.map((type) => ({ value: type, label: type })),
]

export function SkewersView({ collection }) {
  const { items, add, update, remove } = collection
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()

    return items.filter((skewer) => {
      const matchesType = typeFilter === 'all' || skewer.type === typeFilter
      const matchesQuery =
        !term ||
        skewer.name.toLowerCase().includes(term) ||
        skewer.type.toLowerCase().includes(term)

      return matchesType && matchesQuery
    })
  }, [items, query, typeFilter])

  const stats = useMemo(() => {
    const available = items.filter((skewer) => skewer.available).length
    const average =
      items.length === 0
        ? 0
        : items.reduce((sum, skewer) => sum + Number(skewer.price || 0), 0) /
          items.length

    return { total: items.length, available, average }
  }, [items])

  const openCreate = () => {
    setEditing(null)
    setIsModalOpen(true)
  }

  const openEdit = (skewer) => {
    setEditing(skewer)
    setIsModalOpen(true)
  }

  const closeModal = () => setIsModalOpen(false)

  const handleSubmit = (values) => {
    if (editing) {
      update(editing.id, values)
    } else {
      add(values)
    }

    closeModal()
  }

  const columns = [
    {
      key: 'name',
      header: 'Anticucho',
      render: (skewer) => (
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ember-100 text-ember-600">
            <Drumstick aria-hidden="true" className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-semibold text-ink-900">
              {skewer.name}
            </p>
            <Badge
              tone={typeTones[skewer.type]}
              className="mt-0.5 px-2 py-0 text-[10px]"
            >
              {skewer.type}
            </Badge>
          </div>
        </div>
      ),
    },
    {
      key: 'price',
      header: 'Precio',
      render: (skewer) => (
        <span className="font-semibold text-ink-900">
          {formatCurrency(skewer.price)}
        </span>
      ),
    },
    {
      key: 'stock',
      header: 'Stock',
      render: (skewer) => (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-ink-900">{skewer.stock}</span>
          <span className="text-xs text-cocoa-400">unid.</span>
          {skewer.stock <= 10 && skewer.stock > 0 && (
            <Badge tone="butter">Bajo</Badge>
          )}
          {skewer.stock === 0 && <Badge tone="rose">Agotado</Badge>}
        </div>
      ),
    },
    {
      key: 'prepTime',
      header: 'Preparación',
      render: (skewer) => (
        <span className="text-cocoa-500">{skewer.prepTime} min</span>
      ),
    },
    {
      key: 'available',
      header: 'Disponible',
      render: (skewer) => (
        <div className="flex items-center gap-2.5">
          <Toggle
            checked={skewer.available}
            onChange={(available) => update(skewer.id, { available })}
            label={`Disponibilidad de ${skewer.name}`}
          />
          <span className="text-xs font-medium text-cocoa-400">
            {skewer.available ? 'Sí' : 'No'}
          </span>
        </div>
      ),
    },
    {
      key: 'actions',
      header: '',
      align: 'right',
      render: (skewer) => (
        <RowActions
          label={skewer.name}
          onEdit={() => openEdit(skewer)}
          onDelete={() => setDeleting(skewer)}
        />
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Parrilla"
        title="Anticuchos"
        description="Gestiona las brochetas y anticuchos de la carta, sus precios, tiempos de preparación y disponibilidad."
        action={
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Nuevo anticucho
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={Drumstick}
          label="Anticuchos registrados"
          value={stats.total}
          hint="En toda la carta"
          tone="sky"
        />
        <StatCard
          icon={CircleCheck}
          label="Disponibles"
          value={stats.available}
          hint="Listos para pedir"
          tone="sage"
        />
        <StatCard
          icon={Coins}
          label="Precio promedio"
          value={formatCurrency(stats.average)}
          hint="Por unidad"
          tone="butter"
        />
      </div>

      <section className="space-y-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Buscar anticucho…"
          />
          <div className="flex flex-wrap items-center gap-3">
            <FilterChips
              options={filterOptions}
              value={typeFilter}
              onChange={setTypeFilter}
            />
            <span className="text-xs font-medium whitespace-nowrap text-cocoa-400">
              {filtered.length} de {items.length}
            </span>
          </div>
        </div>

        <DataTable
          columns={columns}
          rows={filtered}
          empty={
            <EmptyState
              icon={Drumstick}
              title="Sin anticuchos"
              description={
                items.length === 0
                  ? 'Todavía no hay anticuchos en la carta. Agrega el primero.'
                  : 'No encontramos anticuchos que coincidan con la búsqueda.'
              }
              action={
                <Button size="sm" onClick={openCreate}>
                  <Plus className="h-3.5 w-3.5" />
                  Crear anticucho
                </Button>
              }
            />
          }
        />
      </section>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        title={editing ? 'Editar anticucho' : 'Nuevo anticucho'}
        description={
          editing
            ? 'Actualiza la información de este anticucho.'
            : 'Agrega un anticucho o brocheta a la carta.'
        }
        footer={
          <>
            <Button variant="secondary" onClick={closeModal}>
              Cancelar
            </Button>
            <Button type="submit" form="skewer-form">
              {editing ? 'Guardar cambios' : 'Crear anticucho'}
            </Button>
          </>
        }
      >
        <SkewerForm initialValues={editing} onSubmit={handleSubmit} />
      </Modal>

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        title="Eliminar anticucho"
        description={`¿Seguro que deseas eliminar «${deleting?.name ?? 'este anticucho'}»? Esta acción no se puede deshacer.`}
        onConfirm={() => {
          remove(deleting.id)
          setDeleting(null)
        }}
      />
    </div>
  )
}
