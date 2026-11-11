import { IoBookOutline } from "react-icons/io5";
import { Star } from 'lucide-react';
import { bookStatus } from '../data/bookStatus';
import { MdDelete } from "react-icons/md";

export const BookCard = ({ id, title, author, status, cover, rating, onStatusChange, onDelete, onOpen }) => {

  const statusInfo = bookStatus[status]
  // Solo los libros leídos tienen la vista de detalle (sinopsis, puntuación y notas)
  const isOpenable = status === 'leido' && onOpen

  return (
    <div className='border border-sage/40 rounded-xl  p-4 flex flex-col gap-2'>
        <div
          onClick={isOpenable ? () => onOpen(id) : undefined}
          onKeyDown={isOpenable ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(id) } } : undefined}
          role={isOpenable ? 'button' : undefined}
          tabIndex={isOpenable ? 0 : undefined}
          aria-label={isOpenable ? `Ver detalle de ${title}` : undefined}
          className={`group relative w-60 md:w-80 h-80 md:h-100 flex justify-center items-center rounded-xl bg-sage overflow-hidden
            ${isOpenable ? 'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2' : ''}`}
        >
          {cover ? (
             <img
                src={cover}
                alt={title}
                className={`w-full h-full object-cover rounded-xl ${isOpenable ? 'transition-transform duration-300 group-hover:scale-105' : ''}`}
              />
          ) : (
            <IoBookOutline size={35}/>
          )
          }

          {isOpenable && (
            <>
              <span className={`absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-secundaria font-semibold shadow-md
                ${rating ? 'bg-surface text-principal' : 'bg-principal/70 text-surface backdrop-blur-sm'}`}>
                {rating ? (
                  <><Star size={13} className='fill-accent text-accent' /> {rating}/10</>
                ) : (
                  'Sin puntuar'
                )}
              </span>
              <div className='absolute inset-0 flex items-end justify-center pb-5 bg-gradient-to-t from-principal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300'>
                <span className='text-surface font-secundaria text-sm font-semibold'>
                  {rating ? 'Ver mi reseña' : 'Puntuar y escribir notas'}
                </span>
              </div>
            </>
          )}
        </div>
        <div className='w-62 flex flex-col gap-2 font-principal'>
            <h2
              onClick={isOpenable ? () => onOpen(id) : undefined}
              className={`text-lg md:text-xl text-principal font-bold truncate ${isOpenable ? 'cursor-pointer hover:text-accent-dark' : ''}`}
              title={title}
            >
              {title}
            </h2>
            <span className='text-sm text-secundario italic'>{author}</span>
        </div>
        <div className='flex justify-between items-center pt-2 md:pt-4'>
          <select
          value={status}
          onChange={(e) => onStatusChange(id, e.target.value)}
          className={`px-2 py-1.5 rounded-xl text-sm cursor-pointer ${statusInfo.badgeClass}`}
          >
            <option value="quiero-leer">Quiero Leer</option>
            <option value="leyendo">Leyendo</option>
            <option value="leido">Leido</option>
          </select>
          <button
            onClick={() => onDelete(id)}
            className='text-secundario hover:text-red-500 cursor-pointer'
            >
              <MdDelete size={25}/>
          </button>
        </div>
    </div>
  )
}
