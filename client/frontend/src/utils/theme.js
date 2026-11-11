const STORAGE_KEY = 'theme'

const readSaved = () => {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

const systemPrefersDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches

// Tema inicial: el que eligió el usuario o, si nunca eligió, el del sistema
export const getInitialTheme = () => readSaved() ?? (systemPrefersDark() ? 'dark' : 'light')

export const hasSavedTheme = () => readSaved() !== null

export const applyTheme = (theme, { animate = false } = {}) => {
  const root = document.documentElement
  if (animate) {
    root.classList.add('theme-transition')
    window.setTimeout(() => root.classList.remove('theme-transition'), 300)
  }
  root.dataset.theme = theme
}

export const saveTheme = (theme) => {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // si el navegador bloquea el storage, el tema igual se aplica en esta sesión
  }
}
