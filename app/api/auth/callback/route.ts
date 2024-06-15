import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url)
  const codeSearchParam = url.searchParams.get('code')

  if (codeSearchParam) {
    const supabase = createRouteHandlerClient({ cookies })
    await supabase.auth.exchangeCodeForSession(codeSearchParam)
  }

  return NextResponse.redirect(url.origin)
}
