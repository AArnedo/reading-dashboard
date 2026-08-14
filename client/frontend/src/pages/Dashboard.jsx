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
            <div className='pb-4'>
                <span className='text-lg text-secundario'>Hola Agustin - esto es lo que estas leyendo...</span>
            </div>
            <div className='flex flex-wrap justify-between gap-4 py-10'>
                <StatsCards label={"Libros leidos en 2026"} value={14}/>
                <StatsCards label={"Leyendo actualmente"} value={2}/>
                <StatsCards label={"Páginas este mes"} value={342}/>
            </div>
            <div className='flex justify-between py-8'>
                <div>
                    <h2 className='text-2xl text-principal font-semibold'>Mi biblioteca</h2>
                    <p className='text-lg text-secundario'>3 libros en tu coleccion</p>
                </div>
                <div>
                    <button className='bg-accent px-6 py-2 rounded-2xl text-md text-sage-light font-semibold cursor-pointer hover:bg-accent-dark'>+ Agregar Libro</button>
                </div>
            </div>
            <div className='pb-8'>
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
