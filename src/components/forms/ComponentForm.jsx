import { useState } from 'react'
import { COMPONENT_UNITS } from '../../data/seed'
import { formatComponentLabel } from '../../lib/format'
import { Field, Input, Select } from '../ui/Field'
import { Toggle } from '../ui/Toggle'

const defaultValues = {
  name: '',
  unit: 'porción(es)',
  stock: '',
  available: true,
}

export function ComponentForm({ initialValues, onSubmit }) {
  const [values, setValues] = useState({
    ...defaultValues,
    ...initialValues,
  })

  const setField = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }))
  }

  const previewLabel = values.name.trim()
    ? formatComponentLabel({
        name: values.name.trim(),
        unit: values.unit,
      })
    : null

  return (
    <form
      id="component-form"
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit({
          ...values,
          name: values.name.trim(),
          stock: Number(values.stock) || 0,
        })
      }}
    >
      <Field label="Nombre del componente" hint="Obligatorio">
        <Input
          required
          data-autofocus
          value={values.name}
          onChange={setField('name')}
          placeholder="Ej. Anticucho de Corazón"
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Unidad">
          <Select value={values.unit} onChange={setField('unit')}>
            {COMPONENT_UNITS.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Stock actual" hint="Unidades">
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
      </div>

      <div className="flex items-center justify-between gap-4 rounded-2xl border border-cream-200 bg-cream-50/60 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-ink-900">
            Disponible para platos
          </p>
          <p className="text-xs text-cocoa-400">
            Visible al momento de armar la carta.
          </p>
        </div>
        <Toggle
          checked={values.available}
          onChange={(available) =>
            setValues((current) => ({ ...current, available }))
          }
          label="Disponible para platos"
        />
      </div>

      {previewLabel && (
        <p className="rounded-2xl bg-cream-50 px-4 py-3 text-xs leading-relaxed text-cocoa-500">
          Se registrará como{' '}
          <strong className="font-semibold text-ink-900">
            «{previewLabel}»
          </strong>
          .
        </p>
      )}
    </form>
  )
}
