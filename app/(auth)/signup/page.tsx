'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import AuthForm from '@/app/components/auth-form/auth-form.component'
import { useRouter } from 'next/navigation'

type Email = string
type Password = string

const SignUp = () => {
  const router = useRouter()
  const [formError, setFormError] = useState<string>('')

  const handleSignUpSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    email: Email,
    password: Password
  ) => {
    e.preventDefault()
    const supabase = createClientComponentClient()

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/api/auth/callback`,
        },
      })

      if (error) throw new Error(error.message)

      router.push('/verify')
    } catch (error: any) {
      setFormError(error.message)
    }
  }

  return (
    <main>
      <h2 className='text-center'>Sign Up</h2>

      <AuthForm handleAuthSubmit={handleSignUpSubmit} />
      {formError && <div className='error'>{formError}</div>}
    </main>
  )
}

export default SignUp
