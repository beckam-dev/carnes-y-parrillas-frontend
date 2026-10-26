import { useState } from 'react'
import { CupSoda, Drumstick, Users } from 'lucide-react'
import { Dock } from './components/Dock'
import { AppShell } from './components/layout/AppShell'
import { DrinksView } from './components/views/DrinksView'
import { SkewersView } from './components/views/SkewersView'
import { UsersView } from './components/views/UsersView'
import { seedDrinks, seedSkewers, seedUsers } from './data/seed'
import { useCollection } from './hooks/useCollection'

const navItems = [
  {
    id: 'users',
    label: 'Usuarios',
    icon: Users,
  },
  {
    id: 'drinks',
    label: 'Bebidas',
    icon: CupSoda,
  },
  {
    id: 'skewers',
    label: 'Anticuchos',
    icon: Drumstick,
  },
]

const views = {
  users: UsersView,
  drinks: DrinksView,
  skewers: SkewersView,
}

function App() {
  const [activeView, setActiveView] = useState('users')
  const users = useCollection(seedUsers)
  const drinks = useCollection(seedDrinks)
  const skewers = useCollection(seedSkewers)

  const collections = { users, drinks, skewers }
  const ActiveView = views[activeView]

  return (
    <AppShell>
      <Dock items={navItems} active={activeView} onChange={setActiveView} />

      <div key={activeView} className="animate-fade-up">
        <ActiveView collection={collections[activeView]} />
      </div>
    </AppShell>
  )
}

export default App
