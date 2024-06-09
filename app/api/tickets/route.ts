import { NextResponse } from 'next/server'

export const GET = async (): Promise<NextResponse<Ticket[]>> => {
  const res = await fetch('http://localhost:4000/tickets')
  const tickets = await res.json()

  return NextResponse.json(tickets, {
    status: 200,
  })
}
