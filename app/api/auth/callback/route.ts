import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url)
  const tokenSearchParam = url.searchParams.get('token')

  if (tokenSearchParam) {
    const supabase = createRouteHandlerClient({ cookies })
    await supabase.auth.exchangeCodeForSession(tokenSearchParam)
  }

  return NextResponse.redirect(url.origin)
}
