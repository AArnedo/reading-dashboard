import React from 'react'
import { IoBookOutline } from "react-icons/io5";


export const BookCard = ({ title, author,status }) => {
  return (
    <div className='flex flex-col gap-2'>
        <div className='w-80 h-100 flex justify-center items-center rounded-xl bg-sage'>
            <IoBookOutline size={35}/>
        </div>
        <div className='flex flex-col gap-2'>
            <h2 className='text-xl text-principal font-bold'>{title}</h2>
            <span className='text-sm text-secundario'>{author}</span>
        </div>
        <div className='pt-4'>
          <span className='px-8 py-2 rounded-xl bg-sage-light text-sm text-secundario'>{status}</span>
        </div>
    </div>
  )
}
