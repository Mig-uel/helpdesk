const { createMiddlewareClient } = require('@supabase/auth-helpers-nextjs')
const { NextResponse } = require('next/server')

export const middleware = async (req) => {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  await supabase.auth.getSession()

  return res
}
