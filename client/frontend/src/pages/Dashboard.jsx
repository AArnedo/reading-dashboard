import { Layout } from '../components/Layout'
import { useEffect, useState } from 'react'
import { StatsCards } from '../components/StatsCards'
import { BookCard } from '../components/BookCard'
import { FilterTabs } from '../components/FilterTabs'
import { books as initialBooks } from '../data/books.js'
import { ModalLibrary } from '../components/ModalLibrary.jsx'
import { BookSearch } from '../components/BookSearch.jsx'

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

     
  return (
    <div>
        <Layout searchQuery={searchQuery} onSearchChange={setSearchQuery}>
            <div>
                <span className='text-md md:text-xl text-secundario font-principal'>Hola Agustin - esto es lo que estas leyendo...</span>
            </div>
            <div className='flex flex-wrap justify-between gap-4 py-10'>
                <StatsCards label={"Libros leidos en 2026"} value={14}/>
                <StatsCards label={"Leyendo actualmente"} value={2}/>
                <StatsCards label={"Páginas leidas en el mes:"} value={342}/>
            </div>
            <hr className='opacity-20'/>
            <div className='flex flex-wrap gap-4 justify-between pt-10'>
                <div>
                    <h2 className='text-xl md:text-2xl text-principal font-semibold font-principal'>Mi biblioteca</h2>
                    <p className='text-md md:text-lg text-secundario font-principal italic'>3 libros en tu coleccion</p>
                </div>
                <div className='font-secundario'>
                    <button onClick={() => setIsModalOpen(true)} className='bg-accent px-6 py-2 rounded-2xl text-sm md:text-lg text-sage-light font-semibold cursor-pointer hover:bg-accent-dark'>+ Agregar Libro</button>
                </div>
            </div>
            <div className='py-8 font-principal'>
                <FilterTabs activeFilter={activeFilter} onSelect={setActiveFilter}/>
            </div>
            <div className='flex items-center justify-center md:justify-start gap-4 flex-wrap'>
                {filteredBooks.map((book) =>(
                    <BookCard
                        key={book._id}
                        id={book._id}
                        title={book.title}
                        author={book.author}
                        status={book.status}
                        onStatusChange={handleStatusChange}
                        onDelete={handleDeleteBook}
                    />
                ))}
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
