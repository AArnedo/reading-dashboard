import React from 'react'
import { AuthLayout } from '../components/AuthLayout'
import { TbLockPassword } from 'react-icons/tb'
import { CiMail } from 'react-icons/ci'
import { CiUser } from "react-icons/ci";


export const Register = () => {
  return (
    <AuthLayout tagline={"Empezá hoy a construir tu historia de lectura, un libro a la vez."}>
      <div>
        <div className='py-4'>
          <span className='text-principal font-principal font-bold text-xl md:text-2xl'>Creá tu cuenta</span>
          <p className='text-secundario font-principal italic text-sm md:text-lg'>Empezá a trackear tus lecturas hoy</p>
        </div>
        <form className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label className='text-secundario text-md font-principal'>Nombre</label>
            <div className='flex items-center gap-2 border rounded-xl pl-4'>
              <CiUser className='text-accent'/>
              <input type="email" placeholder='Tu nombre' className='w-full p-2 focus:outline-none'/>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-secundario text-md font-principal'>Email</label>
            <div className='flex items-center gap-2 border rounded-xl pl-4'>
              <CiMail className='text-accent'/>
              <input type="email" placeholder='vos@ejemplo.com' className='w-full p-2 focus:outline-none'/>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-secundario text-md font-principal'>Contraseña</label>
            <div className='flex items-center gap-2 border rounded-xl pl-4'>
              <TbLockPassword className='text-accent'/>
              <input type="email" placeholder='vos@ejemplo.com' className='w-full p-2 focus:outline-none'/>
              <input type="email" placeholder='*********' className='w-full p-2 '/>
            </div>
          </div>
        </form>
        <div className='py-6'> 
          <button className='bg-accent py-2 rounded-xl text-background block w-full'>Crear cuenta</button>
        </div>
        <div className='pt-4 text-sm flex justify-center gap-2'>
          <span>¿Ya tienes cuenta?</span><a className='text-accent'>Inicia sesión</a>
        </div>
      </div>
    </AuthLayout>
  )
}
