export const ROLES = ['Administrador', 'Mesero', 'Cocinero']
export const USER_STATUSES = ['Activo', 'Inactivo']

export const DRINK_CATEGORIES = [
  'Gaseosa',
  'Jugo',
  'Cerveza',
  'Agua',
  'Cóctel',
]

export const COMPONENT_UNITS = [
  'palo(s)',
  'porción(es)',
  'unidad(es)',
  'plato(s)',
  'vaso(s)',
  'botella(s)',
  'gramo(s)',
  'kilogramo(s)',
]

export const seedUsers = [
  {
    id: 'usr-1',
    name: 'Renzo Salazar',
    email: 'renzo@carnesyparrillas.pe',
    role: 'Administrador',
    status: 'Activo',
    createdAt: '2026-01-12',
  },
  {
    id: 'usr-2',
    name: 'Camila Torres',
    email: 'camila@carnesyparrillas.pe',
    role: 'Mesero',
    status: 'Activo',
    createdAt: '2026-01-28',
  },
  {
    id: 'usr-3',
    name: 'Diego Huamán',
    email: 'diego@carnesyparrillas.pe',
    role: 'Cocinero',
    status: 'Activo',
    createdAt: '2026-02-04',
  },
  {
    id: 'usr-4',
    name: 'Valeria Ríos',
    email: 'valeria@carnesyparrillas.pe',
    role: 'Mesero',
    status: 'Inactivo',
    createdAt: '2026-03-17',
  },
]

export const seedDrinks = [
  {
    id: 'drk-1',
    name: 'Chicha morada',
    category: 'Jugo',
    price: 12,
    stock: 24,
    available: true,
  },
  {
    id: 'drk-2',
    name: 'Limonada frozen',
    category: 'Jugo',
    price: 9.5,
    stock: 18,
    available: true,
  },
  {
    id: 'drk-3',
    name: 'Inca Kola',
    category: 'Gaseosa',
    price: 7,
    stock: 36,
    available: true,
  },
  {
    id: 'drk-4',
    name: 'Agua mineral',
    category: 'Agua',
    price: 5,
    stock: 8,
    available: true,
  },
  {
    id: 'drk-5',
    name: 'Cerveza artesanal',
    category: 'Cerveza',
    price: 16,
    stock: 0,
    available: false,
  },
]

export const seedComponents = [
  {
    id: 'cmp-1',
    name: 'Anticucho de Corazón',
    unit: 'palo(s)',
    stock: 40,
    available: true,
  },
  {
    id: 'cmp-2',
    name: 'Arroz',
    unit: 'porción(es)',
    stock: 60,
    available: true,
  },
  {
    id: 'cmp-3',
    name: 'Papa dorada',
    unit: 'porción(es)',
    stock: 45,
    available: true,
  },
  {
    id: 'cmp-4',
    name: 'Chorizo parrillero',
    unit: 'unidad(es)',
    stock: 8,
    available: true,
  },
  {
    id: 'cmp-5',
    name: 'Ensalada fresca',
    unit: 'porción(es)',
    stock: 0,
    available: false,
  },
]
