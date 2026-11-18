// Tipos compartidos de la app. Reflejan los modelos del backend (server/models).

// Un "union type": status solo puede ser uno de estos tres strings.
// Si escribís 'leida' en vez de 'leido', TypeScript te marca el error.
export type BookStatus = 'quiero-leer' | 'leyendo' | 'leido'

// Un libro tal como lo devuelve la API (MongoDB agrega _id)
export interface Book {
  _id: string
  title: string
  author: string
  status: BookStatus
  cover?: string | null // el "?" significa que el campo puede no venir
  olKey?: string | null
  description?: string
  rating?: number | null
  review?: string
}

// Lo que mandamos para crear un libro: un Book sin los campos que pone el servidor.
// Omit<T, K> es un "utility type": copia T sacándole las claves K.
export type NewBook = Omit<Book, '_id' | 'description' | 'rating' | 'review'>

// Campos que se pueden actualizar con el PUT. Partial<T> vuelve todos los campos opcionales.
export type BookUpdate = Partial<Omit<Book, '_id'>>

export interface User {
  _id: string
  name: string
  email: string
}

export type Theme = 'light' | 'dark'
