// Control segmentado: el filtro activo queda como una "pestaña" sobre el fondo
export const FilterTabs = ({ activeFilter, onSelect, filters }) => {
  return (
    <div className='flex gap-1 overflow-x-auto -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden' role='tablist'>
        {filters.map((filter) => {
            const isActive = filter.value === activeFilter
            return (
                <button
                key={filter.value}
                role='tab'
                aria-selected={isActive}
                onClick={() => onSelect(filter.value)}
                className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm cursor-pointer transition-colors
                  ${isActive
                    ? 'bg-surface text-principal font-medium shadow-sm'
                    : 'text-secundario hover:text-principal'}`}
                >
                  {filter.label} <span className='font-numeros text-xs text-secundario'>{filter.count}</span>
                </button>
            )
        })}
    </div>
  )
}
