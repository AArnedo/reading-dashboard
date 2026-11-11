// En mobile los filtros quedan en una sola fila con scroll horizontal
export const FilterTabs = ({ activeFilter, onSelect, filters }) => {
  return (
    <div className='flex gap-2 md:gap-4 overflow-x-auto md:flex-wrap -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
        {filters.map((filter) =>(
            <button
            key={filter.value}
            onClick={() => onSelect(filter.value)} 
            className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm cursor-pointer
              ${filter.value === activeFilter
                ? 'bg-accent text-sage-light'
                : 'border-border border hover:bg-accent hover:text-sage-light'}`}
            >
              {filter.label} <span className='opacity-70'>({filter.count})</span>
            </button>
        ))}
    </div>
  )
}
