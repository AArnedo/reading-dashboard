// En mobile: tarjeta compacta y vertical (entran las 3 en una fila). En desktop: horizontal.
export const StatsCards = ({ icon, iconBg, label, value }) => {
  return (
    <div className='flex flex-col md:flex-row items-center gap-1.5 md:gap-3 bg-surface border border-border rounded-xl px-2 py-3 md:px-6 md:py-5 flex-1 md:min-w-42 text-center md:text-left'>
      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div className='flex flex-col-reverse md:flex-col'>
        <p className='text-[11px] leading-tight md:text-sm text-secundario font-secundaria'>{label}</p>
        <p className='text-xl md:text-2xl font-bold text-principal'>{value}</p>
      </div>
    </div>
  )
}
