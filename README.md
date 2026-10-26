# Carnes y Parrillas — Frontend

Sistema de comunicación interno para un restaurante parrillero. Esta primera
entrega incluye el **panel del administrador**, desde donde se gestionan las
entidades de negocio.

## Stack

- React 19 + Vite 8
- React Router 7
- Tailwind CSS 4 (tema configurado en `src/index.css` con `@theme`)
- [Lucide React](https://lucide.dev/) para la iconografía
- Fuentes locales con Fontsource: **Outfit** (texto) y **Fraunces** (títulos)

## Funcionalidad actual

- **Dock flotante**: a la izquierda en escritorio y en la parte inferior en
  tablets y móviles.
- **Usuarios**: roles Administrador, Mesero y Cocinero.
- **Bebidas**: categoría, precio, stock y disponibilidad.
- **Componentes**: unidades mínimas del negocio, definidas por nombre y unidad
  (por ejemplo `palo(s) de Anticucho de Corazón` o `porción(es) de Arroz`),
  con stock y disponibilidad.
- Crear, editar y eliminar registros con modales y confirmaciones.
- Búsqueda, filtros y tarjetas de resumen por vista.
- Datos de ejemplo en `src/data/seed.js` (en memoria: se reinician al recargar).

## Rutas

| Ruta                           | Descripción                          |
| ------------------------------ | ------------------------------------ |
| `/`                            | Redirige a `/administrador`          |
| `/administrador`               | Redirige a `/administrador/usuarios` |
| `/administrador/usuarios`      | Gestión de usuarios                  |
| `/administrador/bebidas`       | Gestión de bebidas                   |
| `/administrador/componentes`   | Gestión de componentes               |

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
│   ├── Dock.jsx          # Dock responsive de navegación
│   ├── forms/            # Formularios de cada entidad
│   ├── layout/           # AppShell (fondo, topbar y layout)
│   └── ui/               # Componentes reutilizables (Button, Modal, Tabla…)
├── data/seed.js          # Datos de ejemplo y catálogos
├── hooks/useCollection.js
├── lib/                  # Utilidades de formato, estilos y clases
├── pages/
│   └── administrador/    # AdminPage y sus páginas internas
├── App.jsx               # Router principal
├── index.css             # Tema, colores, animaciones y estilos base
└── main.jsx
```
