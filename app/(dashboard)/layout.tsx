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
  const { data } = await supabase.auth.getSession()

  if (!data.session) redirect('/login')

  return (
    <>
      <Navbar user={data?.session?.user} />
      {children}
    </>
  )
}

export default DashboardLayout
