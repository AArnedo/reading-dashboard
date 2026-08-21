import React, { useState } from 'react'
import { IoBookOutline } from 'react-icons/io5';

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
      <form onSubmit={handleSearch} className='flex flex-col'>
          <input 
          type="text"
          value={query}
          placeholder='Buscar por titulo o autor'
          onChange={(e) => setQuery(e.target.value)}
          className='bg-blue-500'
          />
          <button type='submit' className='cursor-pointer'>Buscar</button>
      </form>

      {isLoading && <p>Buscando...</p>}
      {error && <p className='text-red-500'>{error}</p>}
      {!isLoading && !error && result.length === 0 && query && (
        <p>No encontramos resultados para "{query}"</p>
      )}

      <div>
        {result.map((book) =>(
          <div key={book.key} className='flex items-center gap-3 space-y-2'>
            {/* portada */}
            {book.cover_i ? (
              <img 
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`}
                alt={book.title}
                className='w-15 h-20'
              />
            ) : (
              <div className='w-10 h-10'>
                <IoBookOutline size={20} />
              </div>
            )}
            <div>
              <p>{book.title}</p>
              <p>{book.author_name?.[0]}</p>
            </div>
            <button onClick={() => handleAddClick(book)}>
              Agregar
            </button>
          </div>
          ))}
      </div>
  </div>
  )}
