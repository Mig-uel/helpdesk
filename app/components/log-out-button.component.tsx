'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

const LogoutButton = () => {
  const router = useRouter()

  const logoutHandler = async () => {
    const supabase = createClientComponentClient()

    try {
      const { error } = await supabase.auth.signOut()

      if (error) throw new Error(error.message)

      router.push('/login')
    } catch (error) {
      console.log((error as Error).message)
    }
  }

  return (
    <button className='btn-primary' onClick={logoutHandler}>
      Log out
    </button>
  )
}

export default LogoutButton
