import { useEffect } from 'react'
import { IoMdClose } from "react-icons/io";

// En mobile se abre como "hoja" desde abajo; en desktop, centrado.
// El contenido (children) maneja su propio scroll interno.
export const ModalLibrary = ({ onCloseModal, children }) => {

  // Esc cierra el modal y bloqueamos el scroll de la página de fondo
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onCloseModal() }
    document.addEventListener('keydown', handleKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onCloseModal])

  return (
    <div
      className='fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex items-end sm:items-center justify-center sm:p-4'
      onClick={onCloseModal}
    >
        <div
          role='dialog'
          aria-modal='true'
          onClick={(e) => e.stopPropagation()}
          className='relative w-full sm:max-w-xl h-[85dvh] sm:h-auto sm:max-h-[85vh] flex flex-col bg-surface rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden'
        >
            {/* "manija" visual de la hoja en mobile */}
            <div className='sm:hidden mx-auto mt-2 h-1.5 w-12 rounded-full bg-border-strong shrink-0' />
            <button
              onClick={onCloseModal}
              aria-label='Cerrar'
              className='absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full text-secundario hover:bg-muted hover:text-principal cursor-pointer z-10'
            >
              <IoMdClose size={22} />
            </button>
            <div className='flex flex-col flex-1 min-h-0'>
              {children}
            </div>
        </div>
    </div>
  )
}
