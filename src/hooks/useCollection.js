import { useState } from 'react'

export function useCollection(initialItems) {
  const [items, setItems] = useState(initialItems)

  const add = (item) => {
    setItems((current) => [
      {
        ...item,
        id: crypto.randomUUID(),
      },
      ...current,
    ])
  }

  const update = (id, changes) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, ...changes } : item,
      ),
    )
  }

  const remove = (id) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }

  return { items, add, update, remove }
}
