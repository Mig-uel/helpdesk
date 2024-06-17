import { Suspense } from 'react'
import { Metadata } from 'next'
import TicketList from './ticket-list.tickets'
import Loading from '../loading'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Helpdesk | Tickets',
}

const Tickets = () => {
  return (
    <main>
      <nav>
        <div>
          <h2>Tickets</h2>
          <p>
            <small>Currently open tickets</small>
            <Link href='/tickets/create' className='m1-auto'>
              <button className='btn-primary'>New Ticket</button>
            </Link>
          </p>
        </div>
      </nav>

      <Suspense fallback={<Loading />}>
        <TicketList />
      </Suspense>
    </main>
  )
}

export default Tickets
