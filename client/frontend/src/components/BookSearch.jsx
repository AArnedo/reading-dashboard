import React, { useState } from 'react'
import { IoBookOutline } from 'react-icons/io5';
import { Search } from 'lucide-react';

export const BookSearch = ({ onAddBook }) => {

    const [query, setQuery] = useState('');
    const [result, setResult] = useState([ ]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) =>{
        e.preventDefault();
        if (!query.trim()) return // para evitar que se busque con el input vacio

        setIsLoading(true)
        setError(null)

        try {
          const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`)
          const data = await response.json()
          console.log(data)
          setResult(data.docs.slice(0,10))
        } catch (err) {
          setError('No pudimos buscar libros. Proba de nuevo.')
        } finally{
          setIsLoading(false)
        }
    }

    const handleAddClick = (book) =>{
        const newBook = {
            id: book.key,
            title: book.title,
            author: book.author_name?.[0] || "autor desconocido",
            status: 'quiero-leer'
        }
        onAddBook(newBook)
    }

  return (
    <div>
      <div className='flex flex-col'>
        <h3 className='text-lg font-semibold text-principal font-principal '>Agregar Libro</h3>
        <p className='text-sm font-principal text-secundario'>Buscá en Open Library y sumalo a tu biblioteca</p>
      </div>
      <form onSubmit={handleSearch} className='flex gap-2 py-4'>
        <div className='flex items-center gap-2 border border-border-sec p-2 rounded-xl w-full'>
        <Search size={20} className='text-border-sec'/>
        <input 
          type="text"
          value={query}
          placeholder='Buscar por titulo o autor'
          onChange={(e) => setQuery(e.target.value)}
          className='focus:outline-none w-full'
          />
        </div> 
          <button type='submit' className='bg-accent text-sage-light px-4 py-2 rounded-lg font-semibold hover:bg-accent-dark cursor-pointer'>Buscar</button>
      </form>

      {isLoading && <p>Buscando...</p>}
      {error && <p className='text-red-500'>{error}</p>}
      {!isLoading && !error && result.length === 0 && query && (
        <p>No encontramos resultados para "{query}"</p>
      )}

      <div>
        {result.map((book) =>(
          <div key={book.key} className='flex items-center flex-wrap gap-6 space-y-2'>
            {/* portada */}
            {book.cover_i ? (
              <img 
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`}
                alt={book.title}
                className='w-10 h-15 flex items-center justify-center shrink-0'
              />
            ) : (
              <div className='w-10 h-15 border border-border-sec/50  flex items-center justify-center'>
                <IoBookOutline size={20} />
              </div>
            )}
            <div className='flex-1 min-w-0'>
              <p className='text-md font-semibold font-secundario text-principal truncate'>{book.title}</p>
              <p className='text-sm font-secundaria text-secundario italic truncate'>{book.author_name?.[0]}</p>
            </div>
            <button 
            onClick={() => handleAddClick(book)}
            className='bg-accent-dark px-4 py-1 rounded-full text-sage-light text-sm font-secundaria cursor-pointer'
            >
              Agregar
            </button>
          </div>
          ))}
      </div>
  </div>
  )}
