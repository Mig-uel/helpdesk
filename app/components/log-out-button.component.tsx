'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

const LogoutButton = ({ text }: { text: string }) => {
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
      {text}
    </button>
  )
}

export default LogoutButton
