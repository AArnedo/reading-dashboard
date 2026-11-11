import { Search } from 'lucide-react';
import { IoLogOutOutline } from 'react-icons/io5' 
import { useNavigate } from 'react-router'

export const Header = ({ searchQuery, onSearchChange }) => {

const navigate = useNavigate()
const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  navigate('/login')
}

  return (
    <header className='border-b border-border py-4 md:py-8'>
      <div className='flex justify-between items-center'>
        <div className='text-2xl md:text-4xl text-principal font-principal font-semibold cursor-pointer'>BookTracker</div>
        <div className='hidden md:flex items-center gap-4 bg-surface border border-border w-1/3 p-2 rounded-xl'>
            <Search />
            <input 
            type="text" 
            placeholder='Buscar'
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className='w-full h-full focus:outline-none'/>
        </div>
        <button onClick={handleLogout} className="cursor-pointer">
          <div className='flex gap-2 justify-items-center items-center'>
            <span className='hidden md:block text-md hover:underline hover:text-red-500 duration-200'>Cerrar Sesion</span>
            <IoLogOutOutline size={25} />
          </div>
        </button>
      </div>

      {/* Buscador de la biblioteca en mobile (en desktop está en la barra de arriba) */}
      <div className='md:hidden flex items-center gap-2 bg-surface border border-border mt-4 px-3 py-2 rounded-xl focus-within:border-accent'>
        <Search size={18} className='text-secundario shrink-0' />
        <input
          type="search"
          placeholder='Buscar en tu biblioteca'
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className='w-full min-w-0 bg-transparent text-base focus:outline-none'
        />
      </div>
    </header>
  )
}
