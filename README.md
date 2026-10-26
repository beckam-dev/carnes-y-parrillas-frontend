# Carnes y Parrillas — Frontend

Sistema de comunicación interno para un restaurante parrillero. Esta primera
entrega incluye el **panel del administrador**, desde donde se gestionan las
entidades de negocio.

## Stack

- React 19 + Vite 8
- Tailwind CSS 4 (tema configurado en `src/index.css` con `@theme`)
- [Lucide React](https://lucide.dev/) para la iconografía
- Fuentes locales con Fontsource: **Outfit** (texto) y **Fraunces** (títulos)

## Funcionalidad actual

- Dock flotante izquierdo con navegación animada entre vistas.
- **Usuarios**: roles Administrador, Mesero y Cocinero.
- **Bebidas**: categoría, precio, stock y disponibilidad.
- **Anticuchos**: tipo, precio, stock, tiempo de preparación y disponibilidad.
- Crear, editar y eliminar registros con modales y confirmaciones.
- Búsqueda y filtros por vista.
- Datos de ejemplo en `src/data/seed.js` (en memoria: se reinician al recargar).

## Paleta de colores

Todos los colores están declarados como tokens en `src/index.css`:

- `cream` — fondos y superficies cálidas.
- `ember` — naranja pastel de marca.
- `cocoa` — marrones y textos secundarios.
- `ink` — negros y carbón.
- `sage`, `sky`, `rose`, `butter` — acentos pastel de apoyo.

## Scripts

| Comando           | Descripción                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo    |
| `npm run build`   | Genera la build de producción       |
| `npm run preview` | Previsualiza la build de producción |
| `npm run lint`    | Ejecuta Oxlint sobre el código      |

## Estructura

```
src/
├── components/
│   ├── Dock.jsx          # Dock flotante de navegación
│   ├── forms/            # Formularios de cada entidad
│   ├── layout/           # AppShell (fondo, topbar y layout)
│   ├── ui/               # Componentes reutilizables (Button, Modal, Tabla…)
│   └── views/            # Vistas de usuarios, bebidas y anticuchos
├── data/seed.js          # Datos de ejemplo y catálogos
├── hooks/useCollection.js
├── lib/                  # Utilidades de formato, estilos y clases
├── App.jsx
├── index.css             # Tema, colores, animaciones y estilos base
└── main.jsx
```
