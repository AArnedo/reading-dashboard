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
            <span className='text-principal font-medium tracking-tight text-2xl'>Iniciar sesión</span>
            <p className='text-secundario text-sm md:text-base'>Bienvenido de nuevo a tu biblioteca</p>
          </div>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <label className='text-secundario text-sm'>Email</label>
              <div className='flex items-center gap-2 border border-transparent bg-background rounded-lg pl-3 focus-within:border-border-strong transition-colors'>
                <CiMail className='text-secundario'/>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='vos@ejemplo.com'
                  className='w-full p-2.5 bg-transparent text-principal placeholder:text-secundario focus:outline-none'
                  data-cy="login-email-input"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='*********'
                  className='w-full p-2.5 bg-transparent text-principal placeholder:text-secundario focus:outline-none'
                  data-cy="login-password-input"
                  required
                />
              </div>
            </div>

            {error && <p className='text-danger text-sm text-center' data-cy="login-error-message">{error}</p>}

            <button
              type='submit'
              disabled={isLoading}
              data-cy='login-button-submit'
              className='bg-accent mt-4 py-2.5 rounded-lg text-on-accent text-sm font-medium block w-full cursor-pointer hover:bg-accent-hover disabled:opacity-60 transition-colors'
            >
              {isLoading ? 'Ingresando...' : 'Iniciar sesión'}
            </button>
          </form>
          <div className='pt-6 text-sm text-secundario flex justify-center gap-2'>
            <span>¿No tenés cuenta?</span>
            <Link to='/register' data-cy='login-link-register' className='text-principal font-medium underline underline-offset-2 cursor-pointer'>Regístrate</Link>
          </div>
        </div>
    </AuthLayout>
  )
}