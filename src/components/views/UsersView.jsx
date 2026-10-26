import { useMemo, useState } from 'react'
import { Plus, ShieldCheck, UserCheck, Users } from 'lucide-react'
import { ROLES } from '../../data/seed'
import { cn } from '../../lib/cn'
import { formatDate, initials } from '../../lib/format'
import { UserForm } from '../forms/UserForm'
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

const roleTones = {
  Administrador: 'ember',
  Mesero: 'sky',
  Cocinero: 'butter',
}

const roleAvatars = {
  Administrador: 'bg-ember-200 text-ember-700',
  Mesero: 'bg-sky-200 text-sky-600',
  Cocinero: 'bg-butter-200 text-butter-600',
}

const statusTones = {
  Activo: 'sage',
  Inactivo: 'rose',
}

const filterOptions = [
  { value: 'all', label: 'Todos' },
  ...ROLES.map((role) => ({ value: role, label: role })),
]

export function UsersView({ collection }) {
  const { items, add, update, remove } = collection
  const [query, setQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()

    return items.filter((user) => {
      const matchesRole = roleFilter === 'all' || user.role === roleFilter
      const matchesQuery =
        !term ||
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)

      return matchesRole && matchesQuery
    })
  }, [items, query, roleFilter])

  const stats = useMemo(
    () => ({
      total: items.length,
      admins: items.filter((user) => user.role === 'Administrador').length,
      active: items.filter((user) => user.status === 'Activo').length,
    }),
    [items],
  )

  const openCreate = () => {
    setEditing(null)
    setIsModalOpen(true)
  }

  const openEdit = (user) => {
    setEditing(user)
    setIsModalOpen(true)
  }

  const closeModal = () => setIsModalOpen(false)

  const handleSubmit = (values) => {
    if (editing) {
      update(editing.id, values)
    } else {
      add({ ...values, createdAt: new Date().toISOString() })
    }

    closeModal()
  }

  const columns = [
    {
      key: 'name',
      header: 'Usuario',
      render: (user) => (
        <div className="flex items-center gap-3">
          <span
            className={cn(
              'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[11px] font-bold',
              roleAvatars[user.role],
            )}
          >
            {initials(user.name)}
          </span>
          <div className="min-w-0">
            <p className="truncate font-semibold text-ink-900">{user.name}</p>
            <p className="truncate text-xs text-cocoa-400">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Rol',
      render: (user) => (
        <Badge tone={roleTones[user.role]} dot>
          {user.role}
        </Badge>
      ),
    },
    {
      key: 'status',
      header: 'Estado',
      render: (user) => (
        <Badge tone={statusTones[user.status]} dot>
          {user.status}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      header: 'Registrado',
      className: 'hidden md:table-cell',
      render: (user) => (
        <span className="text-xs text-cocoa-400">
          {formatDate(user.createdAt)}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      align: 'right',
      render: (user) => (
        <RowActions
          label={user.name}
          onEdit={() => openEdit(user)}
          onDelete={() => setDeleting(user)}
        />
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Administración"
        title="Usuarios"
        description="Crea y gestiona al equipo del restaurante. Los administradores también pueden crear las demás entidades del negocio."
        action={
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Nuevo usuario
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={Users}
          label="Total de usuarios"
          value={stats.total}
          hint="Entre todos los roles"
          tone="sky"
        />
        <StatCard
          icon={ShieldCheck}
          label="Administradores"
          value={stats.admins}
          hint="Acceso total al sistema"
        />
        <StatCard
          icon={UserCheck}
          label="Cuentas activas"
          value={stats.active}
          hint="Pueden iniciar sesión"
          tone="sage"
        />
      </div>

      <section className="space-y-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Buscar por nombre o correo…"
          />
          <div className="flex flex-wrap items-center gap-3">
            <FilterChips
              options={filterOptions}
              value={roleFilter}
              onChange={setRoleFilter}
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
              icon={Users}
              title="Sin usuarios"
              description={
                items.length === 0
                  ? 'Aún no hay usuarios registrados. Crea el primero para empezar.'
                  : 'No encontramos usuarios que coincidan con la búsqueda.'
              }
              action={
                <Button size="sm" onClick={openCreate}>
                  <Plus className="h-3.5 w-3.5" />
                  Crear usuario
                </Button>
              }
            />
          }
        />
      </section>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        title={editing ? 'Editar usuario' : 'Nuevo usuario'}
        description={
          editing
            ? 'Actualiza los datos y permisos de esta cuenta.'
            : 'Registra a un integrante del equipo y asígnale un rol.'
        }
        footer={
          <>
            <Button variant="secondary" onClick={closeModal}>
              Cancelar
            </Button>
            <Button type="submit" form="user-form">
              {editing ? 'Guardar cambios' : 'Crear usuario'}
            </Button>
          </>
        }
      >
        <UserForm initialValues={editing} onSubmit={handleSubmit} />
      </Modal>

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        title="Eliminar usuario"
        description={`¿Seguro que deseas eliminar a ${deleting?.name ?? 'este usuario'}? Esta acción no se puede deshacer.`}
        onConfirm={() => {
          remove(deleting.id)
          setDeleting(null)
        }}
      />
    </div>
  )
}
