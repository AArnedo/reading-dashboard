import React from 'react'
import { Header } from './Header'

export const Layout = ({ children }) => {
  return (
    <div className='bg-background px-10 pb-10'>
        <Header />
        <main className='pt-10'>
            {children}
        </main>
    </div>
  )
}
