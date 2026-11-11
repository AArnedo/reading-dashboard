// Número grande sin recuadro; las tres estadísticas se separan con espacio
export const StatsCards = ({ label, value }) => {
  return (
    <div className='flex flex-col'>
      <span className='font-numeros text-3xl md:text-4xl font-light text-principal tabular-nums leading-tight'>{value}</span>
      <span className='text-xs md:text-sm text-secundario'>{label}</span>
    </div>
  )
}
