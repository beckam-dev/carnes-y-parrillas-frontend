import { useState } from 'react'
import { SKEWER_TYPES } from '../../data/seed'
import { Field, Input, Select } from '../ui/Field'
import { Toggle } from '../ui/Toggle'

const defaultValues = {
  name: '',
  type: 'Res',
  price: '',
  stock: '',
  prepTime: '',
  available: true,
}

export function SkewerForm({ initialValues, onSubmit }) {
  const [values, setValues] = useState({
    ...defaultValues,
    ...initialValues,
  })

  const setField = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }))
  }

  return (
    <form
      id="skewer-form"
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit({
          ...values,
          price: Number(values.price) || 0,
          stock: Number(values.stock) || 0,
          prepTime: Number(values.prepTime) || 0,
        })
      }}
    >
      <Field label="Nombre del anticucho" hint="Obligatorio">
        <Input
          required
          data-autofocus
          value={values.name}
          onChange={setField('name')}
          placeholder="Ej. Anticucho de corazón"
        />
      </Field>

      <Field label="Tipo">
        <Select value={values.type} onChange={setField('type')}>
          {SKEWER_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </Field>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Precio" hint="Soles">
          <Input
            required
            type="number"
            min="0"
            step="0.5"
            inputMode="decimal"
            value={values.price}
            onChange={setField('price')}
            placeholder="0.00"
          />
        </Field>

        <Field label="Stock" hint="Unidades">
          <Input
            required
            type="number"
            min="0"
            step="1"
            inputMode="numeric"
            value={values.stock}
            onChange={setField('stock')}
            placeholder="0"
          />
        </Field>

        <Field label="Preparación" hint="Minutos">
          <Input
            required
            type="number"
            min="0"
            step="1"
            inputMode="numeric"
            value={values.prepTime}
            onChange={setField('prepTime')}
            placeholder="0"
          />
        </Field>
      </div>

      <div className="flex items-center justify-between gap-4 rounded-2xl border border-cream-200 bg-cream-50/60 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-ink-900">Disponible en carta</p>
          <p className="text-xs text-cocoa-400">
            Visible para el equipo de cocina y salón.
          </p>
        </div>
        <Toggle
          checked={values.available}
          onChange={(available) =>
            setValues((current) => ({ ...current, available }))
          }
          label="Disponible en carta"
        />
      </div>
    </form>
  )
}
