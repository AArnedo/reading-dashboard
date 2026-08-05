import React from 'react'

export const StatsCards = ({label, value}) => {
  return (
    <div className=' bg-surface border border-border rounded-xl min-w-xl p-10'>
        <div className='text-xl text-secundario'>
            {label}
        </div>
        <div className='text-2xl pt-4 text-principal font-bold'>
            {value}
        </div>
    </div>
  )
}
