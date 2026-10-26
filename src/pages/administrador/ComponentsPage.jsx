import { useMemo, useState } from 'react'
import { Boxes, CircleCheck, Plus, TriangleAlert } from 'lucide-react'
import { formatComponentLabel } from '../../lib/format'
import { ComponentForm } from '../../components/forms/ComponentForm'
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

const statusFilters = [
  { value: 'all', label: 'Todos' },
  { value: 'available', label: 'Disponibles' },
  { value: 'low', label: 'Stock bajo' },
  { value: 'out', label: 'Agotados' },
]

export function ComponentsPage({ collection }) {
  const { items, add, update, remove } = collection
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()

    return items.filter((component) => {
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'available' && component.available) ||
        (statusFilter === 'low' &&
          component.stock > 0 &&
          component.stock <= 10) ||
        (statusFilter === 'out' && component.stock === 0)
      const matchesQuery =
        !term ||
        component.name.toLowerCase().includes(term) ||
        component.unit.toLowerCase().includes(term)

      return matchesStatus && matchesQuery
    })
  }, [items, query, statusFilter])

  const stats = useMemo(
    () => ({
      total: items.length,
      available: items.filter((component) => component.available).length,
      lowStock: items.filter(
        (component) => component.stock > 0 && component.stock <= 10,
      ).length,
    }),
    [items],
  )

  const openCreate = () => {
    setEditing(null)
    setIsModalOpen(true)
  }

  const openEdit = (component) => {
    setEditing(component)
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
      header: 'Componente',
      render: (component) => (
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ember-100 text-ember-600">
            <Boxes aria-hidden="true" className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-semibold text-ink-900">
              {formatComponentLabel(component)}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'stock',
      header: 'Stock',
      render: (component) => (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-ink-900">{component.stock}</span>
          <span className="text-xs text-cocoa-400">{component.unit}</span>
          {component.stock <= 10 && component.stock > 0 && (
            <Badge tone="butter">Bajo</Badge>
          )}
          {component.stock === 0 && <Badge tone="rose">Agotado</Badge>}
        </div>
      ),
    },
    {
      key: 'available',
      header: 'Disponible',
      render: (component) => (
        <div className="flex items-center gap-2.5">
          <Toggle
            checked={component.available}
            onChange={(available) => update(component.id, { available })}
            label={`Disponibilidad de ${formatComponentLabel(component)}`}
          />
          <span className="text-xs font-medium text-cocoa-400">
            {component.available ? 'Sí' : 'No'}
          </span>
        </div>
      ),
    },
    {
      key: 'actions',
      header: '',
      align: 'right',
      render: (component) => (
        <RowActions
          label={formatComponentLabel(component)}
          onEdit={() => openEdit(component)}
          onDelete={() => setDeleting(component)}
        />
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Unidades de negocio"
        title="Componentes"
        description="Gestiona las unidades mínimas del negocio. Cada componente se define por su nombre y su unidad, y sirve como base para crear los platos de la carta."
        action={
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Nuevo componente
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={Boxes}
          label="Componentes registrados"
          value={stats.total}
          hint="Unidades mínimas del negocio"
          tone="sky"
        />
        <StatCard
          icon={CircleCheck}
          label="Disponibles"
          value={stats.available}
          hint="Listos para crear platos"
          tone="sage"
        />
        <StatCard
          icon={TriangleAlert}
          label="Stock bajo"
          value={stats.lowStock}
          hint="Requieren reposición"
          tone="butter"
        />
      </div>

      <section className="space-y-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Buscar componente o unidad…"
          />
          <div className="flex flex-wrap items-center gap-3">
            <FilterChips
              options={statusFilters}
              value={statusFilter}
              onChange={setStatusFilter}
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
              icon={Boxes}
              title="Sin componentes"
              description={
                items.length === 0
                  ? 'Todavía no hay componentes registrados. Crea el primero para empezar a armar la carta.'
                  : 'No encontramos componentes que coincidan con la búsqueda.'
              }
              action={
                <Button size="sm" onClick={openCreate}>
                  <Plus className="h-3.5 w-3.5" />
                  Crear componente
                </Button>
              }
            />
          }
        />
      </section>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        title={editing ? 'Editar componente' : 'Nuevo componente'}
        description={
          editing
            ? 'Actualiza el nombre, la unidad o el stock de este componente.'
            : 'Registra una unidad mínima que luego podrás usar en los platos.'
        }
        footer={
          <>
            <Button variant="secondary" onClick={closeModal}>
              Cancelar
            </Button>
            <Button type="submit" form="component-form">
              {editing ? 'Guardar cambios' : 'Crear componente'}
            </Button>
          </>
        }
      >
        <ComponentForm initialValues={editing} onSubmit={handleSubmit} />
      </Modal>

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        title="Eliminar componente"
        description={`¿Seguro que deseas eliminar «${
          deleting ? formatComponentLabel(deleting) : 'este componente'
        }»? Esta acción no se puede deshacer.`}
        onConfirm={() => {
          if (!deleting) return
          remove(deleting.id)
          setDeleting(null)
        }}
      />
    </div>
  )
}
