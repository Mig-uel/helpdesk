// libs
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PostgrestSingleResponse } from '@supabase/supabase-js'

// components
import DeleteButton from '../../../components/delete-button.component'

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

  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.auth.getSession()

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
        <div className='ml-auto'>
          {data.session?.user.email === ticket.user_email && (
            <DeleteButton id={ticket.id} />
          )}
        </div>
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
