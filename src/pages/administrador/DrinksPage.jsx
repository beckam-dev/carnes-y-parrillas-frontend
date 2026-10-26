import { useMemo, useState } from 'react'
import { Boxes, CircleCheck, CupSoda, Plus } from 'lucide-react'
import { DRINK_CATEGORIES } from '../../data/seed'
import { cn } from '../../lib/cn'
import { formatCurrency } from '../../lib/format'
import { DrinkForm } from '../../components/forms/DrinkForm'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { ConfirmDialog } from '../../components/ui/ConfirmDialog'
import { DataTable } from '../../components/ui/DataTable'
import { EmptyState } from '../../components/ui/EmptyState'
import { FilterChips } from '../../components/ui/FilterChips'
import { Modal } from '../../components/ui/Modal'
import { PageHeader } from '../../components/ui/PageHeader'
import { RowActions } from '../../components/ui/RowActions'
import { SearchInput } from '../../components/ui/SearchInput'
import { StatCard } from '../../components/ui/StatCard'
import { Toggle } from '../../components/ui/Toggle'

const categoryStyles = {
  Gaseosa: 'bg-ember-100 text-ember-600',
  Jugo: 'bg-butter-100 text-butter-600',
  Cerveza: 'bg-cream-100 text-cocoa-500',
  Agua: 'bg-sky-100 text-sky-600',
  Cóctel: 'bg-rose-100 text-rose-600',
}

const filterOptions = [
  { value: 'all', label: 'Todas' },
  ...DRINK_CATEGORIES.map((category) => ({
    value: category,
    label: category,
  })),
]

export function DrinksPage({ collection }) {
  const { items, add, update, remove } = collection
  const [query, setQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()

    return items.filter((drink) => {
      const matchesCategory =
        categoryFilter === 'all' || drink.category === categoryFilter
      const matchesQuery =
        !term ||
        drink.name.toLowerCase().includes(term) ||
        drink.category.toLowerCase().includes(term)

      return matchesCategory && matchesQuery
    })
  }, [items, query, categoryFilter])

  const stats = useMemo(
    () => ({
      total: items.length,
      available: items.filter((drink) => drink.available).length,
      stock: items.reduce((sum, drink) => sum + Number(drink.stock || 0), 0),
    }),
    [items],
  )

  const openCreate = () => {
    setEditing(null)
    setIsModalOpen(true)
  }

  const openEdit = (drink) => {
    setEditing(drink)
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
      header: 'Bebida',
      render: (drink) => (
        <div className="flex items-center gap-3">
          <span
            className={cn(
              'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
              categoryStyles[drink.category],
            )}
          >
            <CupSoda aria-hidden="true" className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-semibold text-ink-900">{drink.name}</p>
            <p className="text-xs text-cocoa-400">{drink.category}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'price',
      header: 'Precio',
      render: (drink) => (
        <span className="font-semibold text-ink-900">
          {formatCurrency(drink.price)}
        </span>
      ),
    },
    {
      key: 'stock',
      header: 'Stock',
      render: (drink) => (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-ink-900">{drink.stock}</span>
          <span className="text-xs text-cocoa-400">unid.</span>
          {drink.stock <= 10 && drink.stock > 0 && (
            <Badge tone="butter">Bajo</Badge>
          )}
          {drink.stock === 0 && <Badge tone="rose">Agotado</Badge>}
        </div>
      ),
    },
    {
      key: 'available',
      header: 'Disponible',
      render: (drink) => (
        <div className="flex items-center gap-2.5">
          <Toggle
            checked={drink.available}
            onChange={(available) => update(drink.id, { available })}
            label={`Disponibilidad de ${drink.name}`}
          />
          <span className="text-xs font-medium text-cocoa-400">
            {drink.available ? 'Sí' : 'No'}
          </span>
        </div>
      ),
    },
    {
      key: 'actions',
      header: '',
      align: 'right',
      render: (drink) => (
        <RowActions
          label={drink.name}
          onEdit={() => openEdit(drink)}
          onDelete={() => setDeleting(drink)}
        />
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Carta de bebidas"
        title="Bebidas"
        description="Administra la carta de bebidas del restaurante, sus precios y la disponibilidad para el servicio."
        action={
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Nueva bebida
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={CupSoda}
          label="Bebidas registradas"
          value={stats.total}
          hint="En toda la carta"
          tone="sky"
        />
        <StatCard
          icon={CircleCheck}
          label="Disponibles"
          value={stats.available}
          hint="Listas para el servicio"
          tone="sage"
        />
        <StatCard
          icon={Boxes}
          label="Stock total"
          value={stats.stock}
          hint="Unidades en inventario"
        />
      </div>

      <section className="space-y-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Buscar bebida…"
          />
          <div className="flex flex-wrap items-center gap-3">
            <FilterChips
              options={filterOptions}
              value={categoryFilter}
              onChange={setCategoryFilter}
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
              icon={CupSoda}
              title="Sin bebidas"
              description={
                items.length === 0
                  ? 'Todavía no hay bebidas en la carta. Agrega la primera.'
                  : 'No encontramos bebidas que coincidan con la búsqueda.'
              }
              action={
                <Button size="sm" onClick={openCreate}>
                  <Plus className="h-3.5 w-3.5" />
                  Crear bebida
                </Button>
              }
            />
          }
        />
      </section>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        title={editing ? 'Editar bebida' : 'Nueva bebida'}
        description={
          editing
            ? 'Actualiza la información de esta bebida.'
            : 'Agrega una bebida a la carta del restaurante.'
        }
        footer={
          <>
            <Button variant="secondary" onClick={closeModal}>
              Cancelar
            </Button>
            <Button type="submit" form="drink-form">
              {editing ? 'Guardar cambios' : 'Crear bebida'}
            </Button>
          </>
        }
      >
        <DrinkForm initialValues={editing} onSubmit={handleSubmit} />
      </Modal>

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        title="Eliminar bebida"
        description={`¿Seguro que deseas eliminar «${deleting?.name ?? 'esta bebida'}»? Esta acción no se puede deshacer.`}
        onConfirm={() => {
          remove(deleting.id)
          setDeleting(null)
        }}
      />
    </div>
  )
}
