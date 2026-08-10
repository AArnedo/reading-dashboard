import React from 'react'

const filters = [
    { label: 'Todos', count: 24, active: true},
    {label: 'Leyendo', count: 8, active:false},
    {label: 'Quiero Leer', count: 2, active:false},
    {label: 'Leído', count: 4, active:false},
]

export const FilterTabs = ({label, count, active}) => {
  return (
    <div className='flex gap-4 flex-wrap'>
        {filters.map((filter) =>(
            <span className='rounded-full px-4 py-2 text-sm border-border border hover:bg-accent cursor-pointer hover:text-sage-light'>{filter.label} ({filter.count})</span>
        ))}
    </div>
  )
}
