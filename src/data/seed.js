export const ROLES = ['Administrador', 'Mesero', 'Cocinero']
export const USER_STATUSES = ['Activo', 'Inactivo']

export const DRINK_CATEGORIES = [
  'Gaseosa',
  'Jugo',
  'Cerveza',
  'Agua',
  'Cóctel',
]

export const SKEWER_TYPES = [
  'Res',
  'Pollo',
  'Cerdo',
  'Mixto',
  'Vegetariano',
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

export const seedSkewers = [
  {
    id: 'skw-1',
    name: 'Anticucho de corazón',
    type: 'Res',
    price: 12,
    stock: 40,
    prepTime: 8,
    available: true,
  },
  {
    id: 'skw-2',
    name: 'Anticucho de pollo',
    type: 'Pollo',
    price: 10,
    stock: 30,
    prepTime: 10,
    available: true,
  },
  {
    id: 'skw-3',
    name: 'Anticucho mixto',
    type: 'Mixto',
    price: 14,
    stock: 22,
    prepTime: 12,
    available: true,
  },
  {
    id: 'skw-4',
    name: 'Brocheta de chorizo',
    type: 'Cerdo',
    price: 11,
    stock: 9,
    prepTime: 9,
    available: true,
  },
  {
    id: 'skw-5',
    name: 'Brocheta de verduras',
    type: 'Vegetariano',
    price: 9,
    stock: 0,
    prepTime: 7,
    available: false,
  },
]
