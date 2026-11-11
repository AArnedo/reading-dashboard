import { Header } from './Header'

export const Layout = ({ children, searchQuery, onSearchChange }) => {
  return (
    <div className='min-h-screen bg-background text-principal font-secundaria'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 md:px-10 pb-16'>
        <Header searchQuery={searchQuery} onSearchChange={onSearchChange}/>
        <main className='pt-8 md:pt-10'>
            {children}
        </main>
      </div>
    </div>
  )
}
