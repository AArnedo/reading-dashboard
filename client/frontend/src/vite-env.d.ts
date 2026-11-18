/// <reference types="vite/client" />

// Tipamos las variables de entorno: así `import.meta.env.VITE_API_URL` es un string
// y TypeScript avisa si escribimos mal el nombre.
interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
