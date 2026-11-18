import type { BookStatus } from '../types'

interface StatusInfo {
  label: string
  badgeClass: string
}

// Record<K, V> = objeto cuyas claves son K y sus valores V.
// Si agregás un estado nuevo a BookStatus y te olvidás de sumarlo acá, TypeScript te avisa.
// Estilos neutros: solo "Leyendo" se destaca, porque es lo que estás leyendo ahora
export const bookStatus: Record<BookStatus, StatusInfo> = {
    'quiero-leer': {
        label: 'Quiero leer',
        badgeClass: 'bg-muted text-secundario'
    },
    'leyendo': {
        label: 'Leyendo',
        badgeClass: 'bg-accent text-on-accent'
    },
    'leido': {
        label: 'Leído',
        badgeClass: 'bg-muted text-principal'
    }
}
