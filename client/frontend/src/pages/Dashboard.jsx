import { Layout } from '../components/Layout'
import React from 'react'
import { StatsCards } from '../components/StatsCards'

export const Dashboard = () => {
  return (
    <div>
        <Layout>
            {/* saludo */}
            <div className='pb-14'>
                <span className='text-xl text-secundario'>Hola Agustin - esto es lo que estas leyendo...</span>
            </div>
            <div className='flex flex-wrap justify-between gap-4'>
                <StatsCards label={"Libros leidos en 2026"} value={14}/>
                <StatsCards label={"Leyendo actualmente"} value={2}/>
                <StatsCards label={"Páginas este mes"} value={342}/>
            </div>
        </Layout>
    </div>
  )
}
