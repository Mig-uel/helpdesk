import { Suspense } from 'react'
import { Metadata } from 'next'
import TicketList from './ticket-list.tickets'
import Loading from '../loading'

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
