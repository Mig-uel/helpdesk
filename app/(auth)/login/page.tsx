'use client'

// libs
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

// components
import AuthForm from '@/app/components/auth-form/auth-form.component'

type Email = string
type Password = string

const Login = () => {
  const router = useRouter()
  const [formError, setFormError] = useState<string>('')

  const handleLoginSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    email: Email,
    password: Password
  ) => {
    e.preventDefault()
    setFormError('')

    const supabase = createClientComponentClient()

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw new Error(error.message)

      router.push('/')
    } catch (error) {
      setFormError((error as Error).message || 'Please try again')
    }
  }

  return (
    <main>
      <h2 className='text-center'>Login</h2>

      <AuthForm handleAuthSubmit={handleLoginSubmit} />
      {formError && <div className='error'>{formError}</div>}
    </main>
  )
}

export default Login
