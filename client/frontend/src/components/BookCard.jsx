import React from 'react'
import { IoBookOutline } from "react-icons/io5";


export const BookCard = ({ title, author,status }) => {
  return (
    <div className='flex flex-col gap-2'>
        <div className='w-60 md:w-80 h-80 md:h-100 flex justify-center items-center rounded-xl bg-sage'>
            <IoBookOutline size={35}/>
        </div>
        <div className='flex flex-col gap-2 font-principal'>
            <h2 className='text-lg md:text-xl text-principal font-bold'>{title}</h2>
            <span className='text-sm text-secundario italic'>{author}</span>
        </div>
        <div className='pt-2 md:pt-4'>
          <span className='px-8 py-2 rounded-xl bg-sage-light text-sm text-secundario'>{status}</span>
        </div>
    </div>
  )
}
