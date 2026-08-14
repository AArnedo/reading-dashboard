import { Layout } from '../components/Layout'
import React from 'react'
import { StatsCards } from '../components/StatsCards'
import { BookCard } from '../components/BookCard'
import { FilterTabs } from '../components/FilterTabs'
import {books} from '../data/books.js'

export const Dashboard = () => {
  return (
    <div>
        <Layout>
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
                    <button className='bg-accent px-6 py-2 rounded-2xl text-sm md:text-lg text-sage-light font-semibold cursor-pointer hover:bg-accent-dark'>+ Agregar Libro</button>
                </div>
            </div>
            <div className='py-8 font-principal'>
                <FilterTabs/>
            </div>
            <div className='flex gap-8 flex-wrap'>
                {books.map((book) =>(
                    <BookCard
                        key={book.id}
                        id={book.id}
                        title={book.title}
                        author={book.author}
                        status={book.status}
                    />
                ))}
            </div>
        </Layout>
    </div>
  )
}
