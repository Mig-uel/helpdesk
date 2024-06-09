import AuthForm from '@/app/components/auth-form/auth-form.component'

type Email = string
type Password = string

const SignUp = () => {
  const handleSignUpSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    email: Email,
    password: Password
  ) => {
    e.preventDefault()

    console.log(email, password)
  }

  return (
    <main>
      <h2 className='text-center'>Sign Up</h2>

      <AuthForm handleAuthSubmit={handleSignUpSubmit} />
    </main>
  )
}

export default SignUp
