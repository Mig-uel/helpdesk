import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PostgrestSingleResponse } from '@supabase/supabase-js'

interface TicketID {
  id: string
}

interface TicketDetails {
  params: {
    id: string
  }
}
export const dynamicParams = true

export const generateMetadata = async ({
  params,
}: TicketDetails): Promise<Metadata> => {
  const { id } = params
  const supabase = createServerComponentClient({ cookies })
  const { data: ticket }: PostgrestSingleResponse<Ticket> = await supabase
    .from('tickets')
    .select()
    .eq('id', id)
    .single()

  return {
    title: `Helpdesk | ${ticket?.title || 'Ticket not found...'}`,
  }
}

export const generateStaticParams = async (): Promise<TicketID[]> => {
  const res = await fetch('http://localhost:4000/tickets')
  const tickets: Ticket[] = await res.json()

  return tickets.map((ticket) => ({
    id: ticket.id!,
  }))
}

const getTicketById = async (id: string): Promise<Ticket> => {
  const supabase = await createServerComponentClient({ cookies })
  const { data: ticket }: PostgrestSingleResponse<Ticket> = await supabase
    .from('tickets')
    .select()
    .eq('id', id)
    .single()

  if (!ticket) notFound()

  return ticket
}

const TicketDetails = async ({ params }: TicketDetails) => {
  const { id } = params
  const ticket = await getTicketById(id)

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>

      <div className='card'>
        <h3>{ticket.title}</h3>
        <small>Created by: {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  )
}

export default TicketDetails
