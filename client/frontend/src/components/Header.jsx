import React from 'react'
import { Search } from 'lucide-react';
import { RxAvatar } from "react-icons/rx";


export const Header = () => {
  return (
    <header className='flex justify-between items-center border-b border-border py-4 md:py-8'>
        <div className='text-2xl md:text-4xl text-principal font-principal font-semibold cursor-pointer'>BookTracker</div>
        <div className='hidden md:flex items-center gap-4 bg-surface border border-border w-1/3 p-2 rounded-xl'>
            <Search />
            <input type="text" placeholder='Buscar' className='w-full h-full focus:outline-none'/>
        </div>
        <button className='rounded-full cursor-pointer'>
            <RxAvatar size={40} className='text-secundario'/>
        </button>
    </header>
  )
}
