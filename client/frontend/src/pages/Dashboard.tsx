import { Layout } from '../components/Layout'
import { useEffect, useState } from 'react'
import { StatsCards } from '../components/StatsCards'
import { BookCard } from '../components/BookCard'
import { FilterTabs, type FilterValue } from '../components/FilterTabs'
import { ModalLibrary } from '../components/ModalLibrary'
import { BookSearch } from '../components/BookSearch'
import { EmptyState } from '../components/EmptyState'
import { BookDetailModal } from '../components/BookDetailModal'
import { authFetch } from '../utils/authFetch'
import type { Book, BookUpdate, NewBook, User } from '../types'

// Formas de las respuestas del backend (server/routes/books.routes.js)
interface CreateBookResponse {
    book: Book
    message: string
}

interface UpdateBookResponse {
    updateBook?: Book
    message?: string
    error?: string
}


export const Dashboard = () => {
    const [activeFilter, setActiveFilter] = useState<FilterValue>('todos');
    const [searchQuery, setSearchQuery] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [books, setBooks] = useState<Book[]>([]);
    const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
    const selectedBook = books.find((book) => book._id === selectedBookId)

    useEffect(() =>{
        const fetchBooks = async () =>{
            try{
                const response = await authFetch(`${import.meta.env.VITE_API_URL}/books`)
                // response.json() devuelve "any": anotando la variable decimos qué esperamos
                const data: Book[] = await response.json()
                setBooks(data)
            } catch (error) {
                console.log('Error al traer los libros', error)
            }
        }
        fetchBooks()
    }, [])
  
    const filteredBooks = books.filter((book) => {
        const matchesStatus = activeFilter === 'todos' || book.status === activeFilter
        
        const matchesSearch = 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        book.author.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesStatus && matchesSearch
    })
    

    /* new book */
    const handleAddBook = async (newBook: NewBook) =>{
        try{
            const response = await authFetch (`${import.meta.env.VITE_API_URL}/books`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(newBook)
            })
            const data: CreateBookResponse = await response.json();
            if (!response.ok) throw new Error(data.message)
            // forma funcional: si agregás varios libros seguidos no se pisan entre sí
            setBooks((prevBooks) => [...prevBooks, data.book]);
        } catch (error){
            console.error('Error al agregar libro', error)
        }
    }

    /* update book: actualiza cualquier campo (status, rating, review, description...) */
    const handleUpdateBook = async (id: string, fields: BookUpdate): Promise<Book> => {
        const response = await authFetch (`${import.meta.env.VITE_API_URL}/books/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(fields),
        })
        const data: UpdateBookResponse = await response.json();
        if (!response.ok) throw new Error(data.error || data.message || 'Error al editar libro')

        const saved = data.updateBook
        if (!saved) throw new Error('El servidor no devolvió el libro actualizado')

        // Object.keys devuelve string[]; lo convertimos a las claves reales de BookUpdate
        const keys = Object.keys(fields) as (keyof BookUpdate)[]

        // Verificamos que el servidor realmente guardó lo que mandamos.
        // (Un backend desactualizado responde 200 pero ignora los campos que no conoce.)
        const notSaved = keys.filter(
            (key) => String(saved[key] ?? '') !== String(fields[key] ?? '')
        )
        if (notSaved.length > 0) {
            throw new Error(`El servidor no guardó: ${notSaved.join(', ')}. Puede que el backend esté desactualizado.`)
        }

        // Solo pisamos los campos que enviamos: así una respuesta que llega tarde
        // (ej: la sinopsis guardándose en segundo plano) no borra cambios más nuevos
        const updatedFields: BookUpdate = Object.fromEntries(keys.map((key) => [key, saved[key]]))
        setBooks((prevBooks) => prevBooks.map((book) => (book._id === id ? { ...book, ...updatedFields } : book)))
        return saved
    }

    const handleStatusChange = async (id: string, newStatus: Book['status']) => {
        try{
            await handleUpdateBook(id, { status: newStatus })
        } catch (error){
            console.error('Error al editar libro', error)
        }
    }

    /* delete book */
    const handleDeleteBook = async (id: string) => {
        try{
            await authFetch (`${import.meta.env.VITE_API_URL}/books/${id}`, { method: 'DELETE' })
            setBooks(books.filter((book) => book._id !== id))
        } catch (error) {
            console.error('Error al eliminar el libro', error)
        }
    }

    const readCount = books.filter((book) => book.status === 'leido').length
    const readingCount = books.filter((book) => book.status === 'leyendo').length

    const filterOptions: { label: string; value: FilterValue }[] = [
        {label: 'Todos', value: 'todos'},
        {label: 'Leyendo', value: 'leyendo'},
        {label: 'Quiero leer', value: 'quiero-leer'},
        {label: 'Leído', value: 'leido'},
    ]
    const filterWithCounts = filterOptions.map((filter) => ({
        ...filter,
        count: filter.value === 'todos' 
        ? books.length : books.filter((book) => book.status === filter.value).length
    }))

    const wantToReadCount = books.filter((book) => book.status === 'quiero-leer').length

    /* leer nombre de usuario */
    // getItem puede devolver null, y JSON.parse solo acepta strings: por eso el "?? 'null'"
    const user: User | null = JSON.parse(localStorage.getItem('user') ?? 'null')
     
  return (
    <div>
        <Layout searchQuery={searchQuery} onSearchChange={setSearchQuery}>
            <h1 className='text-2xl md:text-3xl font-principal font-medium tracking-tight text-principal'>
                Hola, {user?.name}
                {readingCount > 0 && (
                    <span className='text-secundario font-normal'> · {readingCount === 1 ? '1 libro en curso' : `${readingCount} libros en curso`}</span>
                )}
            </h1>
            <div className='grid grid-cols-3 md:flex md:gap-14 gap-4 py-6 md:py-8 border-b border-border'>
                <StatsCards label='Leídos' value={readCount} />
                <StatsCards label='Leyendo' value={readingCount} />
                <StatsCards label='Quiero leer' value={wantToReadCount} />
            </div>
            <div className='flex flex-wrap gap-4 justify-between items-end pt-8 md:pt-10'>
                <div>
                    <h2 className='text-lg md:text-xl text-principal font-medium tracking-tight'>Mi biblioteca</h2>
                    <p className='text-sm text-secundario'>Los libros de tu colección</p>
                </div>
                {books.length > 0 && (
                    <button onClick={() => setIsModalOpen(true)} className='bg-accent text-on-accent px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-accent-hover transition-colors'>
                        + Agregar libro
                    </button>
                )}
            </div>
            <div className='pt-5 pb-6'>
                <FilterTabs activeFilter={activeFilter} onSelect={setActiveFilter} filters={filterWithCounts}/>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4'>
                {filteredBooks.length > 0 ? ( 
                    filteredBooks.map((book) => (
                <BookCard
                    key={book._id}
                    id={book._id}
                    title={book.title}
                    author={book.author}
                    status={book.status}
                    cover={book.cover}
                    rating={book.rating}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDeleteBook}
                    onOpen={setSelectedBookId}
                />
            ))
            ) : ( 
            <EmptyState
            title={books.length === 0 ? 'Tu biblioteca está vacía' : 'No encontramos libros'}
            message={
                books.length === 0
                ? 'Agregá tu primer libro para empezar a trackear tu lectura.'
                : 'Probá cambiar el filtro o la búsqueda.'
            }
            actionLabel={books.length === 0 ? '+ Agregar libro' : undefined}
            onAction={books.length === 0 ? () => setIsModalOpen(true) : undefined}
            />
            )}
            </div>
            <div>
                {isModalOpen && (
                    <ModalLibrary onCloseModal={() => setIsModalOpen(false)}>
                        <BookSearch onAddBook={handleAddBook} libraryBooks={books}/>
                    </ModalLibrary>
                )}
                {selectedBook && (
                    <BookDetailModal
                        key={selectedBook._id}
                        book={selectedBook}
                        onClose={() => setSelectedBookId(null)}
                        onSave={handleUpdateBook}
                    />
                )}
            </div>
        </Layout>
    </div>
  )
}
