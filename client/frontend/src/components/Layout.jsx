import React from 'react'
import { Header } from './Header'

export const Layout = ({ children, searchQuery, onSearchChange }) => {
  return (
    <div className='bg-background px-10 pb-10'>
        <Header searchQuery={searchQuery} onSearchChange={onSearchChange}/>
        <main className='pt-10'>
            {children}
        </main>
    </div>
  )
}
