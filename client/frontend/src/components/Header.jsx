import React from 'react'
import { Search } from 'lucide-react';
import { RxAvatar } from "react-icons/rx";


export const Header = () => {
  return (
    <header className='flex justify-between text-center border-b border-border pb-8'>
        <div className='text-2xl text-principal font-principal font-semibold underline cursor-pointer'>BookTracker</div>
        <div className='flex items-center gap-4 bg-surface border border-border w-1/3 p-2 rounded-xl'>
            <Search />
            <input type="text" placeholder='Buscar' className='w-full h-full'/>
        </div>
        <div>
            <button className='bg-accent p-2 rounded-full cursor-pointer'>
                <RxAvatar size={40} className='text-white'/>
            </button>
        </div>
    </header>
  )
}
