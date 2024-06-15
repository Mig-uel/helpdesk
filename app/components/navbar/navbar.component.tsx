import Image from 'next/image'
import Link from 'next/link'
import Logo from './dojo-logo.png'
import {
  AuthResponse,
  Session,
  User,
  UserResponse,
} from '@supabase/supabase-js'

const Navbar = ({ user }: Session) => {
  // console.log(user)
  return (
    <nav>
      <Image
        src={Logo}
        alt='Helpdesk logo'
        width={70}
        quality={100}
        placeholder='blur'
      />
      <h1>Helpdesk</h1>
      <Link href='/'>Dashboard</Link>
      <Link href='/tickets'>Tickets</Link>
      {user && <span>Hello, {user.email}</span>}
    </nav>
  )
}

export default Navbar
