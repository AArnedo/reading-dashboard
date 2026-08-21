import React from 'react'

export const ModalLibrary = ({ onCloseModal, children }) => {
  return (
    <div className='fixed w-full h-full inset-0 bg-black/50 flex justify-center items-center' onClick={onCloseModal}>
        <div 
          onClick={(e) => e.stopPropagation()}
          className='p-4 bg-accent min-w-100 min-h-100'>
            <button onClick={onCloseModal} className='cursor-pointer'>X</button>
            {children}
        </div>
    </div>
  )
}
