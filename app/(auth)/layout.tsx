// libs
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.auth.getUser()

  if (data.user) redirect('/')

  return (
    <>
      <nav>
        <h1>Helpdesk</h1>
        <Link href='/signup'>Sign Up</Link>
        <Link href='/login'>Login</Link>
      </nav>
      {children}
    </>
  )
}

export default AuthLayout
