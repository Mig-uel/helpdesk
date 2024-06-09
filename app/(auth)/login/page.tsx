import AuthForm from '@/app/components/auth-form/auth-form.component'

type Email = string
type Password = string

const Login = () => {
  const handleLoginSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    email: Email,
    password: Password
  ) => {
    e.preventDefault()

    console.log(email, password)
  }

  return (
    <main>
      <h2 className='text-center'>Login</h2>

      <AuthForm handleAuthSubmit={handleLoginSubmit} />
    </main>
  )
}

export default Login
