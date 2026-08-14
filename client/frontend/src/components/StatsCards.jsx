import React from 'react'

export const StatsCards = ({label, value}) => {
  return (
    <div className=' bg-surface border border-border rounded-xl min-w-full md:min-w-xl px-6 py-2 md:p-10'>
        <div className='text-md md:text-xl text-secundario font-secundaria'>
            {label}
        </div>
        <div className='text-xl md:text-2xl pt-4 text-principal font-bold'>
            {value}
        </div>
    </div>
  )
}
