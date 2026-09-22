export const StatsCards = ({ icon, iconBg, label, value }) => {
  return (
    <div className='flex items-center gap-3 bg-surface border border-border rounded-xl px-5 py-4 md:px-6 md:py-5 flex-1 min-w-42'>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div>
        <p className='text-xs md:text-sm text-secundario font-secundaria'>{label}</p>
        <p className='text-lg md:text-2xl font-bold text-principal'>{value}</p>
      </div>
    </div>
  )
}