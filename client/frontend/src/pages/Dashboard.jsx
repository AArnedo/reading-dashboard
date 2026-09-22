import { Layout } from '../components/Layout'
import { useEffect, useState } from 'react'
import { StatsCards } from '../components/StatsCards'
import { BookCard } from '../components/BookCard'
import { FilterTabs } from '../components/FilterTabs'
import { ModalLibrary } from '../components/ModalLibrary.jsx'
import { BookSearch } from '../components/BookSearch.jsx'
import { EmptyState } from '../components/EmptyState.jsx'
import { IoBookOutline, IoBookmarkOutline } from 'react-icons/io5'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'


export const Dashboard = () => {
    const [activeFilter, setActiveFilter] = useState('todos');
    const [searchQuery, setSearchQuery] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [books, setBooks] = useState([]);

    useEffect(() =>{
        const fetchBooks = async () =>{
            try{
                const response = await fetch(`${import.meta.env.VITE_API_URL}/books`)
                const data = await response.json()
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
    const handleAddBook = async (newBook) =>{
        try{
            const response = await fetch (`${import.meta.env.VITE_API_URL}/books`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(newBook)
            })
            const data = await response.json();
            setBooks([...books, data.book]);
        } catch (error){
            console.error('Error al agregar libro', error)
        }
    }

    /* update book */
    const handleStatusChange = async (id, newStatus) => {
        try{
            const response = await fetch (`${import.meta.env.VITE_API_URL}/books/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ status: newStatus }),
            })
            const data = await response.json();
            setBooks(books.map((book) => (book._id === id ? data.updateBook : book)))
        } catch (error){
            console.error('Error al editar libro', error)
        }
    }

    /* delete book */
    const handleDeleteBook = async (id) => {
        try{
            const response = await fetch (`${import.meta.env.VITE_API_URL}/books/${id}`, { method: 'DELETE' })
            setBooks(books.filter((book) => book._id !== id))
        } catch (error) {
            console.error('Error al eliminar el libro', error)
        }
    }

    const readCount = books.filter((book) => book.status === 'leido').length
    const readingCount = books.filter((book) => book.status === 'leyendo').length

    const filterOptions = [
        {label: 'Todos', value: 'todos'},
        {label: 'Leyendo', value: 'leyendo'},
        {label: 'Quiero Leer', value: 'quiero-leer'},
        {label: 'Leído', value: 'leido'},
    ]
    const filterWithCounts = filterOptions.map((filter) => ({
        ...filter,
        count: filter.value === 'todos' 
        ? books.length : books.filter((book) => book.status === filter.value).length
    }))

    const wantToReadCount = books.filter((book) => book.status === 'quiero-leer').length
     
  return (
    <div>
        <Layout searchQuery={searchQuery} onSearchChange={setSearchQuery}>
            <div>
                <span className='text-md md:text-xl text-secundario font-principal'>Hola Agustin - esto es lo que estas leyendo...</span>
            </div>
            <div className='flex flex-wrap justify-between gap-4 py-10'>
                <StatsCards 
                    icon={<IoIosCheckmarkCircleOutline size={20} className='text-principal'/>}
                    iconBg='bg-sage-light'
                    label='Libros leídos'
                    value={readCount} 
                />
                <StatsCards 
                    icon={<IoBookOutline size={20} className='text-accent-dark'/>}
                    iconBg='bg-accent/15'
                    label='Leyendo actualmente'
                    value={readingCount} 
                />
                <StatsCards 
                    icon={<IoBookmarkOutline size={20} className='text-secundario'/>}
                    iconBg='bg-border/40'
                    label='Quiero leer'
                    value={wantToReadCount} 
                />
            </div>
            <hr className='opacity-20'/>
            <div className='flex flex-wrap gap-4 justify-between pt-10'>
                <div>
                    <h2 className='text-xl md:text-2xl text-principal font-semibold font-principal'>Mi biblioteca</h2>
                    <p className='text-md md:text-lg text-secundario font-principal italic'>Estos son los libros en tu colección:</p>
                </div>
                <div className='font-secundario'>
                    <button onClick={() => setIsModalOpen(true)} className='bg-accent px-6 py-2 rounded-2xl text-sm md:text-lg text-sage-light font-semibold cursor-pointer hover:bg-accent-dark'>+ Agregar Libro</button>
                </div>
            </div>
            <div className='py-8 font-principal'>
                <FilterTabs activeFilter={activeFilter} onSelect={setActiveFilter} filters={filterWithCounts}/>
            </div>
            <div className='flex items-center justify-center md:justify-start gap-2 flex-wrap'>
                {filteredBooks.length > 0 ? ( 
                    filteredBooks.map((book) => (
                <BookCard
                    key={book._id}
                    id={book._id}
                    title={book.title}
                    author={book.author}
                    status={book.status}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDeleteBook}
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
                        <BookSearch onAddBook={handleAddBook}/>   
                    </ModalLibrary>
                )}
            </div>
        </Layout>
    </div>
  )
}
