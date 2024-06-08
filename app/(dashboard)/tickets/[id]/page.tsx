import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface TicketID {
  id: number
}

interface TicketDetails {
  params: {
    id: number
  }
}
export const dynamicParams = true

export const generateMetadata = async ({
  params,
}: TicketDetails): Promise<Metadata> => {
  const { id } = params
  const res = await fetch(`http://localhost:4000/tickets/${id}`)
  const data: Ticket = await res.json()

  return {
    title: `Helpdesk | ${data.title}`,
  }
}

export const generateStaticParams = async (): Promise<TicketID[]> => {
  const res = await fetch('http://localhost:4000/tickets')
  const tickets: Ticket[] = await res.json()

  return tickets.map((ticket) => ({
    id: ticket.id!,
  }))
}

const getTicketById = async (id: number): Promise<Ticket> => {
  const res = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: {
      revalidate: 60,
    },
  })

  if (!res.ok) notFound()

  return res.json()
}

const TicketDetails = async ({ params }: TicketDetails) => {
  const ticket = await getTicketById(params.id)

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
