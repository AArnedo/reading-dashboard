import React from 'react'
import { IoBookOutline } from "react-icons/io5";
import { RiBookShelfLine } from "react-icons/ri";
import { RiBookmarkLine } from "react-icons/ri";



export const AuthLayout = ({ children, tagline }) => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-background '>
        <div className='grid grid-cols-1 md:grid-cols-2 max-w-200 border border-border rounded-2xl bg-white'>
            <div className='hidden relative md:flex flex-col justify-between p-8 bg-cover bg-linear-to-b from-accent-dark to-sage rounded-l-2xl'>
                <div className='absolute right-10 rotate-24 text-sage-light opacity-20'>
                    <IoBookOutline size={65}/>
                </div>
                <span className='text-sage-light text-4xl font-semibold font-principal'>BookTracker</span>
                <p className='text-sage-light font-semibold text-md font-principal italic'>{tagline}</p>
                <div className='absolute bottom-12 right-4 text-sage-light opacity-20'>
                    <RiBookShelfLine size={45}/>
                </div>
                <div className='absolute text-sage-light rotate-45 opacity-20 bottom-14'>
                    <RiBookmarkLine size={45}/>
                </div>
            </div>
            <div className='p-8 '>
                {children}
            </div>
        </div>
    </div>
  )
}
