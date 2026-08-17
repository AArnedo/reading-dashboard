import React from 'react'

export const ModalLibrary = ({ onCloseModal, children }) => {
  return (
    <div className='fixed w-full h-full inset-0 bg-black/50 flex justify-center items-center' onClick={onCloseModal}>
        <div>
            <h1 className='bg-red-500'>Hola esto es un Modal</h1>
        </div>
        <div onClick={onCloseModal}>
            <button className='cursor-pointer'>X</button>
            {children}
        </div>
    </div>
  )
}
