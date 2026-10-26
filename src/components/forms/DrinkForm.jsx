import { useState } from 'react'
import { DRINK_CATEGORIES } from '../../data/seed'
import { Field, Input, Select } from '../ui/Field'
import { Toggle } from '../ui/Toggle'

const defaultValues = {
  name: '',
  category: 'Jugo',
  price: '',
  stock: '',
  available: true,
}

export function DrinkForm({ initialValues, onSubmit }) {
  const [values, setValues] = useState({
    ...defaultValues,
    ...initialValues,
  })

  const setField = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }))
  }

  return (
    <form
      id="drink-form"
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit({
          ...values,
          price: Number(values.price) || 0,
          stock: Number(values.stock) || 0,
        })
      }}
    >
      <Field label="Nombre de la bebida" hint="Obligatorio">
        <Input
          required
          data-autofocus
          value={values.name}
          onChange={setField('name')}
          placeholder="Ej. Chicha morada"
        />
      </Field>

      <Field label="Categoría">
        <Select value={values.category} onChange={setField('category')}>
          {DRINK_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
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

        <Field label="Stock inicial" hint="Unidades">
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
          <p className="text-sm font-semibold text-ink-900">Disponible en carta</p>
          <p className="text-xs text-cocoa-400">
            Visible para el equipo de salón.
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
