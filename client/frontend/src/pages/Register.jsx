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
          <span className='text-principal font-medium tracking-tight text-2xl'>Creá tu cuenta</span>
          <p className='text-secundario text-sm md:text-base'>Empezá a trackear tus lecturas hoy</p>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label className='text-secundario text-sm'>Nombre</label>
            <div className='flex items-center gap-2 border border-transparent bg-background rounded-lg pl-3 focus-within:border-border-strong transition-colors'>
              <CiUser className='text-secundario'/>
              <input
              type="text"
              placeholder='Tu nombre'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full p-2.5 bg-transparent text-principal placeholder:text-secundario focus:outline-none'
              data-cy='register-name-input'
              required
              />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-secundario text-sm'>Email</label>
            <div className='flex items-center gap-2 border border-transparent bg-background rounded-lg pl-3 focus-within:border-border-strong transition-colors'>
              <CiMail className='text-secundario'/>
              <input 
              type="email" 
              placeholder='vos@ejemplo.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-2.5 bg-transparent text-principal placeholder:text-secundario focus:outline-none'
              data-cy='register-email-input'
              required
              />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-secundario text-sm'>Contraseña</label>
            <div className='flex items-center gap-2 border border-transparent bg-background rounded-lg pl-3 focus-within:border-border-strong transition-colors'>
              <TbLockPassword className='text-secundario'/> 
              <input 
              type="password" 
              placeholder='*********'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full p-2.5 bg-transparent text-principal placeholder:text-secundario focus:outline-none'
              data-cy='register-password-input'
              required
              />
            </div>
          </div>

          {error && <p className='text-danger text-center text-sm'>{error}</p>}

        <div className='py-6'> 
          <button
          type='submit'
          disabled={isLoading}
          data-cy='register-button-submit'
          className='bg-accent py-2.5 rounded-lg text-on-accent text-sm font-medium block w-full cursor-pointer hover:bg-accent-hover disabled:opacity-60 transition-colors'>
            {isLoading ? 'Estamos registrandote...' : 'Crear cuenta'}
          </button>
        </div>
        </form>
        <div className='text-sm text-secundario flex justify-center gap-2'>
          <span>¿Ya tienes cuenta?</span><Link to='/login' className='text-principal font-medium underline underline-offset-2 cursor-pointer'>Inicia sesion</Link>
        </div>
      </div>
    </AuthLayout>
  )
}
