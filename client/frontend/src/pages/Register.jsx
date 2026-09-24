import { AuthLayout } from '../components/AuthLayout'
import { TbLockPassword } from 'react-icons/tb'
import { CiMail } from 'react-icons/ci'
import { CiUser } from "react-icons/ci";
import { useState } from 'react'
import { useNavigate, Link } from 'react-router';


export const Register = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('') 
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try{
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      })

      const data = await response.json()

      if(!response.ok) {
        setError(data.message || 'No pudimos registarte correctamente')
        return
      }
      
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      
      navigate('/login')
    } catch (err){
      setError('Error de conexion, proba nuevamente')
    } finally{
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout tagline={"Empezá hoy a construir tu historia de lectura, un libro a la vez."}>
      <div>
        <div className='py-4'>
          <span className='text-principal font-principal font-bold text-xl md:text-2xl'>Creá tu cuenta</span>
          <p className='text-secundario font-principal italic text-sm md:text-lg'>Empezá a trackear tus lecturas hoy</p>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label className='text-secundario text-md font-principal'>Nombre</label>
            <div className='flex items-center gap-2 border rounded-xl pl-4'>
              <CiUser className='text-accent'/>
              <input
              type="text"
              placeholder='Tu nombre'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full p-2 focus:outline-none'
              required
              />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-secundario text-md font-principal'>Email</label>
            <div className='flex items-center gap-2 border rounded-xl pl-4'>
              <CiMail className='text-accent'/>
              <input 
              type="email" 
              placeholder='vos@ejemplo.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-2 focus:outline-none'
              required
              />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-secundario text-md font-principal'>Contraseña</label>
            <div className='flex items-center gap-2 border rounded-xl pl-4'>
              <TbLockPassword className='text-accent'/> 
              <input 
              type="password" 
              placeholder='*********'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full p-2 focus:outline-none'
              required
              />
            </div>
          </div>

          {error && <p className='text-red-500 text-center text-sm'>{error}</p>}

        <div className='py-6'> 
          <button
          type='submit'
          disabled={isLoading}
          className='bg-accent py-2 rounded-xl text-background block w-full cursor-pointer'>
            {isLoading ? 'Estamos registrandote...' : 'Crear cuenta'}
          </button>
        </div>
        </form>
        <div className='text-sm flex justify-center gap-2'>
          <span>¿Ya tienes cuenta?</span><Link to='/login' className='text-accent cursor-pointer hover:underline'>Inicia sesion</Link>
        </div>
      </div>
    </AuthLayout>
  )
}
