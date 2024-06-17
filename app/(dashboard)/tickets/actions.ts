'use server'

import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const addTicket = async (data: FormData) => {
  // create object from FormData
  const ticket = Object.fromEntries(data)
  const supabase = createServerActionClient({ cookies })

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // insert data
    const { data, error } = await supabase
      .from('tickets')
      .insert({ ...ticket, user_email: session?.user.email })
      .select()

    if (data === null) {
      throw new Error(error?.message)
    }

    revalidatePath('/tickets')
  } catch (error) {
    return { message: (error as Error).message }
  }

  // redirect user
  redirect('/tickets')
}
