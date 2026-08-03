import React from 'react'
import { Search } from 'lucide-react';
import { RxAvatar } from "react-icons/rx";


export const Header = () => {
  return (
    <header className='flex justify-between text-center'>
        <div className='text-2xl text-principal font-principal font-semibold underline'>BookTracker</div>
        <div className='bg-surface border border-border w-1/3 p-2 rounded-xl'>
            <div className='flex gap-2 '>
                <Search />
                <input type="text" placeholder='Buscar'/>
            </div>
        </div>
        <div>
            <RxAvatar size={40}/>
        </div>
    </header>
  )
}
