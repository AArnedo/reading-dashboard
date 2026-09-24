import React from 'react'
import { IoBookOutline } from "react-icons/io5";
import { bookStatus } from '../data/bookStatus';
import { MdDelete } from "react-icons/md";

export const BookCard = ({ id, title, author, status, cover, onStatusChange, onDelete }) => {
  
  const statusInfo = bookStatus[status]

  return (
    <div className='border border-sage/40 rounded-xl  p-4 flex flex-col gap-2'>
        <div className='w-60 md:w-80 h-80 md:h-100 flex justify-center items-center rounded-xl bg-sage'>
          {cover ? (
             <img 
                src={cover}
                alt={title}
                className='w-full h-full object-cover rounded-xl'
              />
          ) : ( 
            <IoBookOutline size={35}/>
          )
          }
           
        </div>
        <div className='w-62 flex flex-col gap-2 font-principal'>
            <h2 className='text-lg md:text-xl text-principal font-bold truncate' title={title}>{title}</h2>
            <span className='text-sm text-secundario italic'>{author}</span>
        </div>
        <div className='flex justify-between items-center pt-2 md:pt-4'>
          <select 
          value={status}
          onChange={(e) => onStatusChange(id, e.target.value)}
          className={`px-2 py-1.5 rounded-xl text-sm cursor-pointer ${statusInfo.badgeClass}`}
          >
            <option value="quiero-leer">Quiero Leer</option>
            <option value="leyendo">Leyendo</option>
            <option value="leido">Leido</option>
          </select>
          <button
            onClick={() => onDelete(id)}
            className='text-secundario hover:text-red-500 cursor-pointer'
            >
              <MdDelete size={25}/>
          </button>
        </div>
    </div>
  )
}
