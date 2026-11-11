import { useState } from 'react'
import { IoBookOutline } from 'react-icons/io5';
import { Search, Check, Loader2 } from 'lucide-react';

const RESULTS_PER_PAGE = 20

export const BookSearch = ({ onAddBook, libraryBooks = [] }) => {

    const [query, setQuery] = useState('');
    const [searchedQuery, setSearchedQuery] = useState('');
    const [result, setResult] = useState([]);
    const [totalFound, setTotalFound] = useState(0);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [addingKey, setAddingKey] = useState(null);

    // Para marcar como "Agregado" los libros que ya están en la biblioteca
    const libraryKeys = new Set(libraryBooks.map((b) => b.olKey).filter(Boolean))
    const libraryTitles = new Set(libraryBooks.map((b) => `${b.title}|${b.author}`.toLowerCase()))
    const isInLibrary = (book) =>
        libraryKeys.has(book.key) ||
        libraryTitles.has(`${book.title}|${book.author_name?.[0] || 'autor desconocido'}`.toLowerCase())

    const fetchPage = async (searchText, pageNumber) => {
        const params = new URLSearchParams({
            q: searchText,
            page: String(pageNumber),
            limit: String(RESULTS_PER_PAGE),
            fields: 'key,title,author_name,cover_i,first_publish_year',
        })
        const response = await fetch(`https://openlibrary.org/search.json?${params}`)
        if (!response.ok) throw new Error('Open Library no respondió')
        return response.json()
    }

    const handleSearch = async (e) =>{
        e.preventDefault();
        const searchText = query.trim()
        if (!searchText) return // para evitar que se busque con el input vacio

        // en mobile cerramos el teclado para que se vean los resultados
        document.activeElement?.blur()

        setIsLoading(true)
        setError(null)

        try {
          const data = await fetchPage(searchText, 1)
          setResult(data.docs)
          setTotalFound(data.numFound)
          setPage(1)
          setSearchedQuery(searchText)
        } catch {
          setError('No pudimos buscar libros. Proba de nuevo.')
        } finally{
          setIsLoading(false)
        }
    }

    const handleLoadMore = async () => {
        setIsLoadingMore(true)
        try {
            const data = await fetchPage(searchedQuery, page + 1)
            setResult((prev) => [...prev, ...data.docs])
            setPage(page + 1)
        } catch {
            setError('No pudimos cargar más resultados.')
        } finally {
            setIsLoadingMore(false)
        }
    }

    const handleAddClick = async (book) =>{
        const newBook = {
            title: book.title,
            author: book.author_name?.[0] || "autor desconocido",
            status: 'quiero-leer',
            olKey: book.key,
            cover: book.cover_i
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
              : null
        }
        setAddingKey(book.key)
        await onAddBook(newBook)
        setAddingKey(null)
    }

    const hasMore = result.length < totalFound

  return (
    <>
      {/* Cabecera fija: título + buscador */}
      <div className='shrink-0 px-5 sm:px-6 pt-4 sm:pt-6 border-b border-border-sec/15'>
        <div className='flex flex-col pr-10'>
          <h3 className='text-lg font-semibold text-principal font-principal'>Agregar Libro</h3>
          <p className='text-sm font-principal text-secundario'>Buscá en Open Library y sumalo a tu biblioteca</p>
        </div>
        <form onSubmit={handleSearch} className='flex gap-2 py-4'>
          <div className='flex items-center gap-2 border border-border-sec/50 bg-surface px-3 py-2 rounded-xl w-full min-w-0 focus-within:border-accent'>
            <Search size={18} className='text-border-sec shrink-0'/>
            <input
              type="search"
              enterKeyHint='search'
              value={query}
              placeholder='Título o autor'
              onChange={(e) => setQuery(e.target.value)}
              className='focus:outline-none w-full min-w-0 bg-transparent text-base'
            />
          </div>
          <button type='submit' className='shrink-0 bg-accent text-sage-light px-4 py-2 rounded-xl font-semibold hover:bg-accent-dark cursor-pointer'>
            Buscar
          </button>
        </form>
      </div>

      {/* Resultados con scroll propio */}
      <div className='flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 sm:px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]'>
        {isLoading && (
          <div className='flex items-center justify-center gap-2 py-10 text-secundario'>
            <Loader2 size={18} className='animate-spin' /> Buscando...
          </div>
        )}
        {error && <p className='text-red-500 text-sm py-4'>{error}</p>}
        {!isLoading && !error && searchedQuery && result.length === 0 && (
          <p className='text-secundario text-sm py-10 text-center'>No encontramos resultados para "{searchedQuery}"</p>
        )}
        {!isLoading && !searchedQuery && (
          <p className='text-secundario/80 text-sm py-10 text-center italic font-principal'>
            Escribí el título de un libro o el nombre de un autor.
          </p>
        )}

        {!isLoading && result.length > 0 && (
          <>
            <p className='text-xs text-secundario pt-3 pb-1'>
              Mostrando {result.length} de {totalFound.toLocaleString('es-AR')} resultados
            </p>
            <ul className='divide-y divide-border-sec/15'>
              {result.map((book) => {
                const added = isInLibrary(book)
                const isAdding = addingKey === book.key
                return (
                  <li key={book.key} className='flex items-center gap-3 py-3'>
                    {/* portada */}
                    {book.cover_i ? (
                      <img
                        src={`https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`}
                        alt={book.title}
                        loading='lazy'
                        className='w-11 h-16 object-cover rounded shrink-0 bg-border'
                      />
                    ) : (
                      <div className='w-11 h-16 rounded border border-border-sec/30 flex items-center justify-center shrink-0'>
                        <IoBookOutline size={18} className='text-secundario' />
                      </div>
                    )}
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm sm:text-base font-semibold font-secundaria text-principal line-clamp-2 leading-snug'>{book.title}</p>
                      <p className='text-xs sm:text-sm font-secundaria text-secundario italic truncate'>
                        {book.author_name?.[0] || 'Autor desconocido'}
                        {book.first_publish_year && <span className='not-italic'> · {book.first_publish_year}</span>}
                      </p>
                    </div>
                    <button
                      onClick={() => handleAddClick(book)}
                      disabled={added || isAdding}
                      className={`shrink-0 flex items-center gap-1 px-3 sm:px-4 py-1.5 rounded-full text-sm font-secundaria font-semibold cursor-pointer disabled:cursor-default
                        ${added ? 'bg-sage/20 text-sage' : 'bg-accent-dark text-sage-light hover:bg-accent'}`}
                    >
                      {added ? <><Check size={14} /> Agregado</> : isAdding ? 'Agregando…' : 'Agregar'}
                    </button>
                  </li>
                )
              })}
            </ul>
            {hasMore && (
              <button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className='w-full mt-2 py-3 rounded-xl border border-border-sec/30 text-sm font-semibold text-principal hover:bg-black/5 disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2'
              >
                {isLoadingMore ? <><Loader2 size={16} className='animate-spin' /> Cargando…</> : 'Ver más resultados'}
              </button>
            )}
          </>
        )}
      </div>
    </>
  )}
