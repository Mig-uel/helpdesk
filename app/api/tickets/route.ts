import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { PostgrestError } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

// export const GET = async (): Promise<NextResponse<Ticket[]>> => {}

export const POST = async (
  request: NextRequest
): Promise<NextResponse<{ data: Ticket; error: PostgrestError | null }>> => {
  const ticket = await request.json()

  // get supabase instance
  const supabase = createRouteHandlerClient({ cookies })

  // get the current user session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // insert the data
  const { data, error } = await supabase
    .from('tickets')
    .insert({ ...ticket, user_email: session?.user.email })
    .select()
    .single()

  return NextResponse.json({ data, error })
}
