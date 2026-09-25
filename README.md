# 📚 BookTracker

Dashboard personal para llevar el registro de tu lectura: buscá libros, organizá tu biblioteca por estado (Quiero leer / Leyendo / Leído) y visualizá tus estadísticas de lectura. Aplicación full stack construida desde cero, fase por fase, como proyecto de portfolio.

**🔗 Demo en vivo:** https://dashboard-tracking-book.vercel.app/

> ⚠️ El backend está en el plan gratuito de Render, así que puede tardar unos 20-30 segundos en "despertar" en el primer pedido si estuvo inactivo.

---

## ✨ Funcionalidades

- 🔐 **Autenticación completa**: registro e inicio de sesión con JWT, contraseñas hasheadas con bcrypt
- 🔍 **Búsqueda de libros** en tiempo real vía la API pública de Open Library
- 📖 **Biblioteca personal**: agregá libros a tu colección con un click
- 🏷️ **Gestión de estado**: marcá cada libro como "Quiero leer", "Leyendo" o "Leído"
- 🔎 **Filtrado y búsqueda** combinados sobre tu propia colección
- 📊 **Estadísticas** dinámicas: libros leídos, en curso, y pendientes
- 🗑️ **CRUD completo**: agregar, actualizar estado y eliminar libros
- 🔒 **Rutas protegidas** y datos aislados por usuario (cada quien ve solo su biblioteca)
- 📱 **Diseño responsive**, con sistema de diseño propio (paleta cálida, tipografía editorial)

## 🛠️ Stack tecnológico

**Frontend**
- React (Vite)
- TailwindCSS
- React Router
- react-icons

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JSON Web Tokens (jsonwebtoken)
- bcryptjs (hasheo de contraseñas)
- CORS

**Infraestructura**
- MongoDB Atlas (base de datos)
- Render (hosting del backend)
- Vercel (hosting del frontend)

**API externa**
- [Open Library API](https://openlibrary.org/developers/api) — búsqueda de libros y portadas

## 📁 Estructura del proyecto

```
reading-dashboard/
├── client/frontend/     # React + Vite + Tailwind
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── data/
│       └── utils/
└── server/              # Node + Express + MongoDB
    ├── models/
    ├── routes/
    ├── middleware/
    └── db/
```

## 🚀 Cómo correrlo en local

### Requisitos previos
- Node.js
- Una base de datos MongoDB (local o [Atlas](https://www.mongodb.com/atlas))

### 1. Clonar el repositorio
```bash
git clone https://github.com/<TU_USUARIO>/reading-dashboard.git
cd reading-dashboard
```

### 2. Backend
```bash
cd server
npm install
```
Creá un archivo `.env` en `server/` con:
```
MONGODB_URI=tu_connection_string_de_mongodb
JWT_SECRET=una_cadena_larga_y_aleatoria
PORT=3000
```
```bash
npm run dev
```

### 3. Frontend
```bash
cd client/frontend
npm install
```
Creá un archivo `.env` en `client/frontend/` con:
```
VITE_API_URL=http://localhost:3000/api
```
```bash
npm run dev
```

## 📡 Endpoints de la API

| Método | Endpoint             | Descripción                        | Protegido |
|--------|-----------------------|-------------------------------------|:---------:|
| POST   | `/api/auth/register`  | Registrar un nuevo usuario          | ❌        |
| POST   | `/api/auth/login`     | Iniciar sesión, devuelve un JWT     | ❌        |
| GET    | `/api/books`          | Traer los libros del usuario        | ✅        |
| POST   | `/api/books`          | Agregar un libro nuevo              | ✅        |
| PUT    | `/api/books/:id`      | Actualizar un libro (ej: status)    | ✅        |
| DELETE | `/api/books/:id`      | Eliminar un libro                   | ✅        |
| GET    | `/api/health`         | Chequeo de estado del servidor      | ❌        |

## 🎓 Lo que aprendí construyendo esto

Este proyecto fue mi entrada práctica al desarrollo full stack, con foco en entender cada pieza en vez de copiar soluciones:

- Diseño de una API REST desde cero, con validación y manejo de errores por código de estado
- Modelado de datos con MongoDB/Mongoose, incluyendo relaciones entre colecciones (usuarios ↔ libros)
- Autenticación con JWT y hasheo de contraseñas con bcrypt, entendiendo qué protege cada capa
- Manejo de estado y efectos en React (`useState`, `useEffect`), elevación de estado entre componentes
- Consumo de APIs externas con manejo de estados de carga y error
- Debugging de problemas reales de integración: CORS, variables de entorno en distintos entornos, resolución DNS
- Deploy de una aplicación full stack (Vercel + Render + MongoDB Atlas) con CI/CD automático vía GitHub

## 🔮 Posibles mejoras futuras

- Migración a TypeScript
- Metas de lectura y racha de días leyendo
- Reseñas y calificación personal por libro
- Gráficos de géneros favoritos

## 👤 Autor

**Agustín**
- LinkedIn: <TU_LINK_DE_LINKEDIN>
- Portfolio: <TU_LINK_DE_PORTFOLIO>
- GitHub: [@<TU_USUARIO>](https://github.com/<TU_USUARIO>)
