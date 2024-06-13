import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

type Params = {
  params: {
    id: string
  }
}

type Error = {
  error: string
}

export const GET = async (
  request: NextRequest,
  { params }: Params
): Promise<NextResponse<Ticket | Error>> => {
  const { id } = params

  const res = await fetch(`http://localhost:4000/tickets/${id}`)

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Ticket does not exists!' },
      { status: 404 }
    )
  }

  const ticket: Ticket = await res.json()

  return NextResponse.json(ticket, { status: 200 })
}