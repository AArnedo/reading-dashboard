import { IoBookOutline } from "react-icons/io5";
import { bookStatus } from '../data/bookStatus';
import { MdDeleteOutline } from "react-icons/md";

export const BookCard = ({ id, title, author, status, cover, rating, onStatusChange, onDelete, onOpen }) => {
  
  const statusInfo = bookStatus[status]
  // Solo los libros leídos tienen la vista de detalle (sinopsis, puntuación y notas)
  const isOpenable = status === 'leido' && onOpen

  return (
    <div className='group/card bg-surface rounded-xl p-2 flex flex-col gap-2.5 min-w-0'>
        <div
          onClick={isOpenable ? () => onOpen(id) : undefined}
          onKeyDown={isOpenable ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(id) } } : undefined}
          role={isOpenable ? 'button' : undefined}
          tabIndex={isOpenable ? 0 : undefined}
          aria-label={isOpenable ? `Ver detalle de ${title}` : undefined}
          className={`group relative w-full aspect-[2/3] flex justify-center items-center rounded-lg bg-muted overflow-hidden
            ${isOpenable ? 'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-principal focus-visible:ring-offset-2 focus-visible:ring-offset-surface' : ''}`}
        >
          {cover ? (
             <img 
                src={cover}
                alt={title}
                loading='lazy'
                className={`w-full h-full object-cover ${isOpenable ? 'transition-transform duration-500 group-hover:scale-[1.03]' : ''}`}
              />
          ) : ( 
            <IoBookOutline size={30} className='text-secundario'/>
          )}

          {isOpenable && (
            <div className='absolute inset-0 flex items-end justify-center pb-4 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300'>
              <span className='text-white text-xs font-medium'>
                {rating ? 'Ver mi reseña' : 'Puntuar y escribir notas'}
              </span>
            </div>
          )}
        </div>

        <div className='flex flex-col gap-0.5 px-1 min-w-0'>
            <h2
              onClick={isOpenable ? () => onOpen(id) : undefined}
              className={`text-sm md:text-[15px] text-principal font-medium truncate ${isOpenable ? 'cursor-pointer hover:underline underline-offset-2' : ''}`}
              title={title}
            >
              {title}
            </h2>
            <div className='flex justify-between items-baseline gap-2 text-xs text-secundario min-w-0'>
              <span className='truncate'>{author}</span>
              {isOpenable && (
                rating
                  ? <span className='font-numeros font-medium text-principal whitespace-nowrap'>{rating}/10</span>
                  : <span className='whitespace-nowrap'>Sin puntuar</span>
              )}
            </div>
        </div>

        <div className='flex justify-between items-center gap-2 px-1 pb-1'>
          <select 
          value={status}
          onChange={(e) => onStatusChange(id, e.target.value)}
          aria-label={`Estado de ${title}`}
          className={`min-w-0 px-2 py-1 rounded-md text-xs font-medium cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-principal ${statusInfo.badgeClass}`}
          >
            <option value="quiero-leer">Quiero leer</option>
            <option value="leyendo">Leyendo</option>
            <option value="leido">Leído</option>
          </select>
          <button
            onClick={() => onDelete(id)}
            aria-label={`Eliminar ${title}`}
            className='p-1 rounded-md text-secundario hover:text-danger hover:bg-muted cursor-pointer transition-colors md:opacity-0 md:group-hover/card:opacity-100 focus-visible:opacity-100'
            >
              <MdDeleteOutline size={19}/>
          </button>
        </div>
    </div>
  )
}
