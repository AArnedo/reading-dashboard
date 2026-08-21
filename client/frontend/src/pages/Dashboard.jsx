import { Layout } from '../components/Layout'
import React, { useState } from 'react'
import { StatsCards } from '../components/StatsCards'
import { BookCard } from '../components/BookCard'
import { FilterTabs } from '../components/FilterTabs'
import { books as initialBooks } from '../data/books.js'
import { ModalLibrary } from '../components/ModalLibrary.jsx'
import { BookSearch } from '../components/BookSearch.jsx'

export const Dashboard = () => {
    const [activeFilter, setActiveFilter] = useState('todos');
    const [searchQuery, setSearchQuery] = useState('')
    const [books, setBooks] = useState(initialBooks);
    const [isModalOpen, setIsModalOpen] = useState(false);

    
    const filteredBooks = books.filter((book) => {
        const matchesStatus = activeFilter === 'todos' || book.status === activeFilter
        
        const matchesSearch = 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        book.author.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesStatus && matchesSearch
    })
    

    /* new book */
    const handleAddBook = (newBook) =>{
        setBooks([...books, newBook])
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
            <div className='flex gap-8 flex-wrap'>
                {filteredBooks.map((book) =>(
                    <BookCard
                        key={book.id}
                        id={book.id}
                        title={book.title}
                        author={book.author}
                        status={book.status}
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
