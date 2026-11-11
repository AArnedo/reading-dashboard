import { useEffect, useState } from 'react'
import { X, Check, Star } from 'lucide-react'
import { IoBookOutline } from 'react-icons/io5'
import { fetchBookDescription } from '../utils/openLibrary'

const MAX_REVIEW_LENGTH = 2000

const ratingLabel = (value) => {
  if (!value) return 'Todavía sin puntuar'
  if (value <= 2) return 'No me gustó'
  if (value <= 4) return 'Flojo'
  if (value <= 6) return 'Correcto'
  if (value <= 8) return 'Muy bueno'
  if (value === 9) return 'Excelente'
  return 'Obra maestra'
}

const SectionTitle = ({ children }) => (
  <h3 className='text-xs font-medium uppercase tracking-widest text-secundario mb-2'>
    {children}
  </h3>
)

export const BookDetailModal = ({ book, onClose, onSave }) => {
  const savedRating = book.rating ?? null
  const savedReview = book.review ?? ''

  const [rating, setRating] = useState(savedRating)
  const [hoverRating, setHoverRating] = useState(null)
  const [review, setReview] = useState(savedReview)
  const [saveState, setSaveState] = useState('idle') // idle | saving | saved | error
  const [saveError, setSaveError] = useState('')
  const [description, setDescription] = useState(
    book.description ? { status: 'ready', text: book.description } : { status: 'loading', text: '' }
  )

  const isDirty = rating !== savedRating || review.trim() !== savedReview.trim()
  const shownRating = hoverRating ?? rating

  // Traemos la sinopsis de Open Library solo la primera vez, después queda guardada en la base
  useEffect(() => {
    if (book.description) return
    let ignore = false

    fetchBookDescription(book)
      .then(({ olKey, description: text }) => {
        if (ignore) return
        setDescription({ status: text ? 'ready' : 'empty', text })
        if (text) onSave(book._id, { description: text, olKey }).catch(() => {})
      })
      .catch(() => !ignore && setDescription({ status: 'error', text: '' }))

    return () => { ignore = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book._id])

  const handleClose = () => {
    if (isDirty && !window.confirm('Tenés cambios sin guardar. ¿Querés cerrar igual?')) return
    onClose()
  }

  const handleSave = async () => {
    if (!isDirty || saveState === 'saving') return
    setSaveState('saving')
    try {
      await onSave(book._id, { rating, review: review.trim() })
      setSaveState('saved')
    } catch (error) {
      setSaveError(error.message)
      setSaveState('error')
    }
  }

  // Esc cierra, Ctrl/Cmd + Enter guarda, y bloqueamos el scroll de fondo
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose()
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleSave()
    }
    document.addEventListener('keydown', handleKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = previousOverflow
    }
  })

  // Si el usuario vuelve a editar después de guardar, sacamos el "Guardado"
  const changeRating = (value) => {
    setRating(value)
    setSaveState('idle')
  }
  const changeReview = (value) => {
    setReview(value)
    setSaveState('idle')
  }

  return (
    <div
      className='fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex items-end sm:items-center justify-center sm:p-4'
      onClick={handleClose}
    >
      <div
        role='dialog'
        aria-modal='true'
        aria-label={book.title}
        onClick={(e) => e.stopPropagation()}
        className='relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-surface rounded-t-2xl sm:rounded-2xl shadow-2xl'
      >
        <button
          onClick={handleClose}
          aria-label='Cerrar'
          className='absolute top-4 right-4 p-1.5 rounded-full text-secundario hover:bg-muted hover:text-principal cursor-pointer'
        >
          <X size={20} />
        </button>

        <div className='grid md:grid-cols-[220px_1fr] gap-6 md:gap-8 p-6 md:p-8'>
          {/* Portada */}
          <div className='flex md:flex-col items-center md:items-stretch gap-4'>
            <div className='w-28 md:w-full aspect-[2/3] shrink-0 rounded-xl overflow-hidden bg-muted flex items-center justify-center shadow-lg shadow-black/20'>
              {book.cover ? (
                <img src={book.cover} alt={book.title} className='w-full h-full object-cover' />
              ) : (
                <IoBookOutline size={40} className='text-secundario' />
              )}
            </div>
            <div className='md:hidden min-w-0'>
              <h2 className='text-xl font-medium tracking-tight text-principal leading-tight'>{book.title}</h2>
              <p className='text-sm text-secundario mt-1'>{book.author}</p>
            </div>
            {savedRating && (
              <div className='hidden md:flex items-center justify-center gap-2 rounded-xl bg-background py-3'>
                <Star size={18} className='fill-rating text-rating' />
                <span className='font-numeros text-2xl font-medium text-principal'>{savedRating}</span>
                <span className='text-sm text-secundario'>/ 10</span>
              </div>
            )}
          </div>

          {/* Contenido */}
          <div className='flex flex-col gap-7 min-w-0'>
            <div className='hidden md:block pr-8'>
              <span className='inline-block text-xs font-medium px-2.5 py-1 rounded-md bg-muted text-secundario mb-3'>
                Leído
              </span>
              <h2 className='text-3xl font-medium tracking-tight text-principal leading-tight'>
                {book.title}
              </h2>
              <p className='text-base text-secundario mt-1'>{book.author}</p>
            </div>

            {/* Sinopsis */}
            <section>
              <SectionTitle>Sinopsis</SectionTitle>
              {description.status === 'loading' && (
                <div className='space-y-2 animate-pulse' aria-label='Cargando sinopsis'>
                  <div className='h-3 bg-muted rounded w-full' />
                  <div className='h-3 bg-muted rounded w-11/12' />
                  <div className='h-3 bg-muted rounded w-3/4' />
                </div>
              )}
              {description.status === 'ready' && (
                <p className='text-principal/90 leading-relaxed'>{description.text}</p>
              )}
              {(description.status === 'empty' || description.status === 'error') && (
                <p className='text-secundario text-sm'>
                  {description.status === 'empty'
                    ? 'No encontramos una sinopsis para este libro en Open Library.'
                    : 'No pudimos cargar la sinopsis. Probá abrir el libro de nuevo más tarde.'}
                </p>
              )}
            </section>

            {/* Puntuación */}
            <section>
              <div className='flex items-baseline justify-between mb-2'>
                <SectionTitle>Tu puntuación</SectionTitle>
                {rating && (
                  <button
                    onClick={() => changeRating(null)}
                    className='text-xs text-secundario hover:text-principal underline-offset-2 hover:underline cursor-pointer'
                  >
                    Quitar
                  </button>
                )}
              </div>
              <div
                className='grid grid-cols-10 gap-1 sm:gap-1.5'
                onMouseLeave={() => setHoverRating(null)}
                role='radiogroup'
                aria-label='Puntuación del 1 al 10'
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => {
                  const isFilled = shownRating !== null && value <= shownRating
                  return (
                    <button
                      key={value}
                      role='radio'
                      aria-checked={rating === value}
                      aria-label={`${value} de 10`}
                      onClick={() => changeRating(value)}
                      onMouseEnter={() => setHoverRating(value)}
                      onFocus={() => setHoverRating(value)}
                      onBlur={() => setHoverRating(null)}
                      className={`h-10 rounded-lg text-sm font-numeros font-medium transition-all duration-150 cursor-pointer
                        ${isFilled
                          ? 'bg-rating text-on-rating'
                          : 'bg-background border border-border text-secundario hover:border-border-strong'}
                        ${rating === value ? 'ring-2 ring-rating ring-offset-2 ring-offset-surface' : ''}`}
                    >
                      {value}
                    </button>
                  )
                })}
              </div>
              <p className='mt-3 text-sm text-secundario'>
                {shownRating ? (
                  <>
                    <span className='font-numeros font-medium text-principal'>{shownRating}/10</span> · {ratingLabel(shownRating)}
                  </>
                ) : (
                  ratingLabel(null)
                )}
              </p>
            </section>

            {/* Notas */}
            <section>
              <SectionTitle>Tus notas</SectionTitle>
              <textarea
                value={review}
                onChange={(e) => changeReview(e.target.value)}
                maxLength={MAX_REVIEW_LENGTH}
                rows={6}
                placeholder='¿Qué te pareció? Personajes, frases que te marcaron, a quién se lo recomendarías…'
                className='w-full resize-y rounded-xl bg-background border border-transparent p-4 text-principal leading-relaxed placeholder:text-secundario focus:outline-none focus:border-border-strong'
              />
              <p className='text-right text-xs font-numeros text-secundario mt-1'>
                {review.length}/{MAX_REVIEW_LENGTH}
              </p>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className='sticky bottom-0 flex flex-wrap items-center justify-between gap-3 px-6 md:px-8 py-4 bg-surface/95 backdrop-blur border-t border-border'>
          <p className='text-sm' aria-live='polite'>
            {saveState === 'saved' && (
              <span className='flex items-center gap-1.5 text-success font-medium'>
                <Check size={16} /> Guardado
              </span>
            )}
            {saveState === 'error' && <span className='text-danger'>{saveError || 'No se pudo guardar. Probá de nuevo.'}</span>}
            {saveState === 'idle' && isDirty && <span className='text-secundario'>Cambios sin guardar</span>}
          </p>
          <div className='flex gap-2 ml-auto'>
            <button
              onClick={handleClose}
              className='px-4 py-2 rounded-lg text-sm text-secundario hover:bg-muted hover:text-principal cursor-pointer'
            >
              Cerrar
            </button>
            <button
              onClick={handleSave}
              disabled={!isDirty || saveState === 'saving'}
              title='Ctrl + Enter'
              className='px-5 py-2 rounded-lg text-sm font-medium bg-accent text-on-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
            >
              {saveState === 'saving' ? 'Guardando…' : 'Guardar cambios'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
