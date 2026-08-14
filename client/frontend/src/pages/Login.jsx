import React from 'react'
import { AuthLayout } from '../components/AuthLayout'
import { CiMail } from "react-icons/ci";
import { TbLockPassword } from "react-icons/tb";


export const Login = () => {
  return (
    <AuthLayout tagline={"Cada libro que termines suma una página más a tu propia historia de lectura."}>
        <div>
          <div className='py-4'>
            <span className='text-principal font-principal font-bold text-xl md:text-2xl'>Iniciar sesión</span>
            <p className='text-secundario font-principal italic text-sm md:text-lg'>Bienvenido de nuevo a tu biblioteca</p>
          </div>
          <form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <label className='text-secundario text-md'>Email</label>
              <div className='flex items-center gap-2 border rounded-xl pl-4'>
                <CiMail className='text-accent'/>
                <input type="email" placeholder='vos@ejemplo.com' className='w-full p-2 focus:outline-none'/>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-secundario text-md'>Contraseña</label>
              <div className='flex items-center gap-2 border rounded-xl pl-4'>
                <TbLockPassword className='text-accent'/>
                <input type="email" placeholder='*********' className='w-full p-2 focus:outline-none'/>
              </div>
            </div>
          </form>
          <a className='text-accent text-sm flex justify-end my-4'>¿Olvidaste la contraseña?</a>
          <div>
            <button className='bg-accent py-2 rounded-xl text-background block w-full'>Iniciar sesión</button>
          </div>
          <div className='pt-4 text-sm flex justify-center gap-2'>
            <span>¿No tenes cuenta?</span><a className='text-accent'>Regístrate</a>
          </div>
        </div>
    </AuthLayout>
  )
}
