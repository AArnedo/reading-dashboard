# 📚 BookTracker

> Dashboard personal para el seguimiento de lectura — busca, organiza y visualiza tu progreso como lector.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&style=flat-square)
![Vite](https://img.shields.io/badge/Vite-Bundler-646CFF?logo=vite&logoColor=white&style=flat-square)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square)
![Node.js](https://img.shields.io/badge/Node.js-planeado-339933?logo=node.js&logoColor=white&style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-planeado-47A248?logo=mongodb&logoColor=white&style=flat-square)
![Status](https://img.shields.io/badge/Estado-En%20desarrollo-orange?style=flat-square)
![License](https://img.shields.io/badge/Licencia-MIT-lightgrey?style=flat-square)

---

## 📖 Descripción

**BookTracker** es una aplicación web para llevar el registro de los libros que estás leyendo, ya leíste o querés leer. Permite buscar libros en tiempo real a través de la **Open Library API**, agregarlos a tu biblioteca personal y organizarlos según su estado de lectura, todo con una interfaz limpia y un sistema de diseño propio.

Este proyecto nació como un ejercicio de aprendizaje profundo de desarrollo frontend: cada funcionalidad fue construida entendiendo el *por qué* antes que el *cómo*, priorizando buenas prácticas de arquitectura de componentes, manejo de estado en React y consumo de APIs externas por sobre la velocidad de entrega.

A futuro, el proyecto evolucionará hacia una arquitectura **full-stack (MERN)**, incorporando persistencia de datos y autenticación de usuarios implementada manualmente (JWT) para comprender su funcionamiento interno en profundidad.

---

## ✨ Características

- 🔍 **Búsqueda de libros** en tiempo real usando la API pública de Open Library, con manejo de estados de carga, error y resultados vacíos.
- 🗂️ **Organización por estado de lectura**: *Leído*, *Leyendo*, *Quiero leer*.
- 🎯 **Filtrado dinámico** de la biblioteca personal por estado y búsqueda de texto.
- ➕ **Modal de búsqueda y agregado** de libros, con manejo correcto de eventos (sin cierres accidentales por bubbling).
- 🎨 **Sistema de diseño propio**, con paleta de colores, tipografías y componentes reutilizables consistentes en toda la app.
- 🔐 **Autenticación** (registro / login) — *en desarrollo, backend pendiente*.

---

## 🛠️ Tecnologías

### Frontend (implementado)
| Tecnología | Uso |
|---|---|
| **React** (JavaScript) | Librería principal de UI |
| **Vite** | Bundler y entorno de desarrollo |
| **TailwindCSS** | Estilado utility-first |
| **React Router** | Enrutamiento entre páginas |

### Backend (en curso / planificado)
| Tecnología | Uso |
|---|---|
| **Node.js + Express** | Servidor y API REST |
| **MongoDB** | Base de datos |
| **JWT** (implementación manual) | Autenticación y sesiones |

### Integraciones externas
| Servicio | Uso |
|---|---|
| **Open Library API** | Búsqueda y datos de libros |

---

## 🎨 Sistema de diseño

El proyecto utiliza una paleta de colores y tipografías definidas como tokens de diseño, para mantener consistencia visual en todos los componentes:

| Token | Valor | Uso |
|---|---|---|
| Background | `#FAF6F0` | Fondo general |
| Surface | `#FFFDF9` | Fondo de tarjetas/paneles |
| Accent | `#C4693D` | Color principal de acción |
| Accent Dark | `#A8552F` | Hover / estados activos |
| Sage | `#7A8B6F` | Color secundario |
| Sage Light | `#E4E9DE` | Fondos suaves |
| Ink | `#2E2A26` | Texto principal |
| Ink Muted | `#6B6259` | Texto secundario |

**Tipografías:** [Lora](https://fonts.google.com/specimen/Lora) (serif) para títulos, [Inter](https://fonts.google.com/specimen/Inter) (sans-serif) para la interfaz.

---

## 📁 Estructura del proyecto

```
booktracker/
├── client/
│   └── frontend/
│       ├── src/
│       │   ├── components/
│       │   │   ├── Layout.jsx
│       │   │   ├── Header.jsx
│       │   │   ├── StatCard.jsx
│       │   │   ├── BookCard.jsx
│       │   │   ├── FilterTabs.jsx
│       │   │   ├── BookSearch.jsx
│       │   │   ├── ModalLibrary.jsx
│       │   │   └── AuthLayout.jsx
│       │   ├── pages/
│       │   │   ├── Dashboard.jsx      # "/"
│       │   │   ├── Login.jsx          # "/login"
│       │   │   └── Register.jsx       # "/register"
│       │   ├── config/
│       │   │   └── bookStatus.js      # Estados de lectura y estilos compartidos
│       │   ├── App.jsx
│       │   └── main.jsx
│       └── package.json
└── server/
    ├── routes/
    │   └── health.js                  # /api/health
    └── package.json
```

---

## 🚀 Instalación y uso

### Requisitos previos
- Node.js (v18 o superior)
- npm

### Pasos

1. Cloná el repositorio:
```bash
   git clone https://github.com/tu-usuario/booktracker.git
   cd booktracker
```

2. Instalá las dependencias del frontend:
```bash
   cd client/frontend
   npm install
```

3. Instalá las dependencias del backend:
```bash
   cd ../../server
   npm install
```

4. Iniciá el servidor de desarrollo del frontend:
```bash
   cd client/frontend
   npm run dev
```

5. Iniciá el servidor backend (en otra terminal):
```bash
   cd server
   npm start
```

6. Abrí la app en tu navegador en `http://localhost:5173` (o el puerto que indique Vite).

---

## 🗺️ Roadmap

- [x] **Fase 0** — Setup del proyecto: repositorio, Vite, ESLint, servidor Express base, Conventional Commits.
- [x] **Fase 1** — Arquitectura de componentes, rutas principales (Dashboard, Login, Register) con React Router.
- [x] **Fase 2** — Filtrado funcional, búsqueda en Open Library API, modal de agregado de libros.
- [ ] **Fase 3** — Backend con Express + MongoDB: persistencia real de la biblioteca de usuario.
- [ ] **Fase 4** — Autenticación completa con JWT implementado manualmente (registro, login, rutas protegidas).
- [ ] **Fase 5** — Estadísticas de lectura, despliegue (deploy) y pulido final de UI/UX.

---

## 💡 Aprendizajes clave

Durante el desarrollo surgieron varios desafíos técnicos que sirvieron como aprendizaje:

- **Orden de declaración de estado en React**: entender el *temporal dead zone* al usar `useState` antes de su declaración.
- **Event bubbling en modales**: uso de `stopPropagation` para evitar cierres no deseados al interactuar con el contenido interno.
- **Consistencia de datos entre componentes**: centralizar estados y estilos compartidos (como los estados de lectura) en un único archivo de configuración para evitar duplicación y errores de casing.
- **Manejo de estados asíncronos**: loading, error y "sin resultados" al consumir una API externa real.
- **Estructura de monorepo**: gestión correcta de dependencias en un proyecto con frontend y backend separados.

---

## 🤝 Contribuciones

Este es un proyecto personal de aprendizaje, pero cualquier sugerencia, issue o comentario es bienvenido. Si querés proponer una mejora, no dudes en abrir un *issue* o un *pull request*.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 👤 Autor

**Agustín**
Proyecto desarrollado como parte de mi portfolio como desarrollador frontend.

📫 ¿Querés conectar? Agregá aquí tu LinkedIn, GitHub o email de contacto.
