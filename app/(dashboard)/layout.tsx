import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
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

  // console.log(data)

  return (
    <>
      <Navbar user={data?.session?.user} />
      {children}
    </>
  )
}

export default DashboardLayout
