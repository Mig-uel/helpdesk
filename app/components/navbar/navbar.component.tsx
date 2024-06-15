import Image from 'next/image'
import Link from 'next/link'
import Logo from './dojo-logo.png'
import { Session } from '@supabase/supabase-js'
import LogoutButton from '../log-out-button.component'

const Navbar = ({ user }: Session & any) => {
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
      <Link href='/tickets' className='mr-auto'>
        Tickets
      </Link>

      {user && <span>Hello, {user.email}</span>}
      <LogoutButton text={user ? 'Log out' : 'Login'} />
    </nav>
  )
}

export default Navbar
