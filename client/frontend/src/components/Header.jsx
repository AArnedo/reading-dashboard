import { Search } from 'lucide-react';
import { IoLogOutOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router'
import { ThemeToggle } from './ThemeToggle'

export const Header = ({ searchQuery, onSearchChange }) => {

const navigate = useNavigate()
const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  navigate('/login')
}

  const searchInput = (
    <div className='flex items-center gap-2 bg-surface px-3 py-2 rounded-lg border border-transparent focus-within:border-border-strong transition-colors'>
      <Search size={16} className='text-secundario shrink-0' />
      <input
        type="search"
        placeholder='Buscar en tu biblioteca'
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className='w-full min-w-0 bg-transparent text-base md:text-sm text-principal placeholder:text-secundario focus:outline-none'
      />
    </div>
  )

  return (
    <header className='pt-5 md:pt-8'>
      <div className='flex justify-between items-center gap-4'>
        <span className='text-lg md:text-xl text-principal font-principal font-semibold tracking-tight'>BookTracker</span>
        <div className='hidden md:block flex-1 max-w-xs ml-auto'>{searchInput}</div>
        <div className='flex items-center gap-1'>
          <ThemeToggle />
          <button
            onClick={handleLogout}
            className='flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-secundario hover:text-principal hover:bg-muted cursor-pointer transition-colors'
          >
            <span className='hidden md:inline'>Salir</span>
            <IoLogOutOutline size={19} />
          </button>
        </div>
      </div>

      {/* Buscador de la biblioteca en mobile */}
      <div className='md:hidden mt-4'>{searchInput}</div>
    </header>
  )
}
