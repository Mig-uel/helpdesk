import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { PostgrestError } from '@supabase/supabase-js'

// because its a server component, no need to create an api route and just fetch straight from component

const getTickets = async (): Promise<{
  data: Ticket[] | null
  error: PostgrestError | null
}> => {
  const supabase = createServerComponentClient({ cookies })
  const { data, error } = await supabase.from('tickets').select()

  return { data, error }
}

const TicketList = async () => {
  const { data: tickets, error } = await getTickets()

  return tickets ? (
    tickets?.map((ticket) => (
      <div key={ticket.id} className='card my-5'>
        <Link href={`/tickets/${ticket.id}`}>
          <h3>{ticket.title}</h3>
          <p>{ticket.body.slice(0, 200)}...</p>
          <div className={`pill ${ticket.priority}`}>
            {ticket.priority} priority
          </div>
        </Link>
      </div>
    ))
  ) : (
    <p className='text-center'>
      {error ? 'Something went wrong...' : 'There are no open tickets...'}
    </p>
  )
}

export default TicketList
