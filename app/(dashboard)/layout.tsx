import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

// components
import Navbar from '../components/navbar/navbar.component'

const DashboardLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.auth.getUser()

  if (!data.user) redirect('/login')

  return (
    <>
      <Navbar user={data.user} />
      {children}
    </>
  )
}

export default DashboardLayout
