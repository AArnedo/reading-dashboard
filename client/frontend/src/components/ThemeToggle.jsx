import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { applyTheme, getInitialTheme, hasSavedTheme, saveTheme } from '../utils/theme'

export const ThemeToggle = ({ className = '' }) => {
  const [theme, setTheme] = useState(getInitialTheme)

  // Si el usuario nunca eligió, seguimos los cambios del sistema en vivo
  useEffect(() => {
    if (hasSavedTheme()) return
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      if (hasSavedTheme()) return
      const next = e.matches ? 'dark' : 'light'
      applyTheme(next, { animate: true })
      setTheme(next)
    }
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    applyTheme(next, { animate: true })
    saveTheme(next)
    setTheme(next)
  }

  const isDark = theme === 'dark'

  return (
    <button
      type='button'
      onClick={toggle}
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
      className={`p-2 rounded-lg text-secundario hover:text-principal hover:bg-muted cursor-pointer transition-colors ${className}`}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
