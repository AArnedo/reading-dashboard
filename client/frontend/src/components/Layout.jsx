import React from 'react'
import { Header } from './Header'

export const Layout = ({ children }) => {
  return (
    <div className='bg-background p-6'>
        <Header />
        <main className='pt-14'>
            {children}
        </main>
    </div>
  )
}
