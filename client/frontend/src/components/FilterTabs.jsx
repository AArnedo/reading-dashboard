export const FilterTabs = ({ activeFilter, onSelect, filters }) => {
  return (
    <div className='flex justify-between md:justify-start gap-4 flex-wrap'>
        {filters.map((filter) =>(
            <span
            key={filter.value}
            onClick={() => onSelect(filter.value)} 
            className={
              filter.value === activeFilter
              ? 'rounded-full px-4 py-2 text-xs md:text-sm bg-accent text-sage-light cursor-pointer'
              : 'rounded-full px-4 py-2 text-xs md:text-sm border-border border cursor-pointer hover:bg-accent hover:text-sage-light'
            }
            >
              {filter.label}({filter.count})
            </span>
        ))}
    </div>
  )
}
