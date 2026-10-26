import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Bacon, Beef, Boxes, CupSoda, Users } from 'lucide-react'
import { Dock } from '../../components/Dock'
import { AppShell } from '../../components/layout/AppShell'
import { seedComponents, seedDrinks, seedUsers } from '../../data/seed'
import { useCollection } from '../../hooks/useCollection'
import { ComponentsPage } from './ComponentsPage'
import { DrinksPage } from './DrinksPage'
import { UsersPage } from './UsersPage'

const navItems = [
  {
    to: '/administrador/usuarios',
    label: 'Usuarios',
    icon: Users,
  },
  {
    to: '/administrador/bebidas',
    label: 'Bebidas',
    icon: CupSoda,
  },
  {
    to: '/administrador/componentes',
    label: 'Componentes',
    icon: Beef,
  },
]

export function AdminPage() {
  const users = useCollection(seedUsers)
  const drinks = useCollection(seedDrinks)
  const components = useCollection(seedComponents)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <AppShell>
      <Dock items={navItems} />

      <div key={location.pathname} className="animate-fade-up">
        <Routes>
          <Route
            index
            element={<Navigate to="/administrador/usuarios" replace />}
          />
          <Route path="usuarios" element={<UsersPage collection={users} />} />
          <Route path="bebidas" element={<DrinksPage collection={drinks} />} />
          <Route
            path="componentes"
            element={<ComponentsPage collection={components} />}
          />
          <Route
            path="*"
            element={<Navigate to="/administrador/usuarios" replace />}
          />
        </Routes>
      </div>
    </AppShell>
  )
}
