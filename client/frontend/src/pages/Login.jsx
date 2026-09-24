import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { AuthLayout } from '../components/AuthLayout'
import { CiMail } from "react-icons/ci";
import { TbLockPassword } from "react-icons/tb";

export const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'No pudimos iniciar sesión')
        return
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      navigate('/')
    } catch (err) {
      setError('Error de conexión. Probá de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout tagline={"Cada libro que termines suma una página más a tu propia historia de lectura."}>
        <div>
          <div className='py-4'>
            <span className='text-principal font-principal font-bold text-xl md:text-2xl'>Iniciar sesión</span>
            <p className='text-secundario font-principal italic text-sm md:text-lg'>Bienvenido de nuevo a tu biblioteca</p>
          </div>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <label className='text-secundario text-md'>Email</label>
              <div className='flex items-center gap-2 border rounded-xl pl-4'>
                <CiMail className='text-accent'/>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='vos@ejemplo.com'
                  className='w-full p-2 focus:outline-none'
                  required
                />
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-secundario text-md'>Contraseña</label>
              <div className='flex items-center gap-2 border rounded-xl pl-4'>
                <TbLockPassword className='text-accent'/>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='*********'
                  className='w-full p-2 focus:outline-none'
                  required
                />
              </div>
            </div>

            {error && <p className='text-red-500 text-sm text-center'>{error}</p>}

            <button
              type='submit'
              disabled={isLoading}
              className='bg-accent mt-4 py-2 rounded-xl text-background block w-full cursor-pointer hover:bg-accent-dark disabled:opacity-60'
            >
              {isLoading ? 'Ingresando...' : 'Iniciar sesión'}
            </button>
          </form>
          <div className='pt-4 text-sm flex justify-center gap-2'>
            <span>¿No tenés cuenta?</span>
            <Link to='/register' className='text-accent cursor-pointer hover:underline'>Regístrate</Link>
          </div>
        </div>
    </AuthLayout>
  )
}