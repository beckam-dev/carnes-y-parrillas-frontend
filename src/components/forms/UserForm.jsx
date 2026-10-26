import { useState } from 'react'
import { ROLES, USER_STATUSES } from '../../data/seed'
import { Field, Input, Select } from '../ui/Field'

const defaultValues = {
  name: '',
  email: '',
  role: 'Mesero',
  status: 'Activo',
}

export function UserForm({ initialValues, onSubmit }) {
  const [values, setValues] = useState({
    ...defaultValues,
    ...initialValues,
  })

  const setField = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }))
  }

  return (
    <form
      id="user-form"
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(values)
      }}
    >
      <Field label="Nombre completo" hint="Obligatorio">
        <Input
          required
          data-autofocus
          value={values.name}
          onChange={setField('name')}
          placeholder="Ej. Camila Torres"
        />
      </Field>

      <Field label="Correo corporativo">
        <Input
          required
          type="email"
          value={values.email}
          onChange={setField('email')}
          placeholder="nombre@carnesyparrillas.pe"
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Rol del sistema">
          <Select value={values.role} onChange={setField('role')}>
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Estado">
          <Select value={values.status} onChange={setField('status')}>
            {USER_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <p className="rounded-2xl bg-cream-50 px-4 py-3 text-xs leading-relaxed text-cocoa-500">
        Los usuarios con rol <strong className="text-ink-700">Administrador</strong>{' '}
        pueden crear entidades de negocio y gestionar al resto del equipo.
      </p>
    </form>
  )
}
