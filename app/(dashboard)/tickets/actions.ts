'use server'

import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const addTicket = async (data: FormData) => {
  // create object from FormData
  const ticket = Object.fromEntries(data)
  const supabase = createServerActionClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // insert data
  const { error } = await supabase
    .from('tickets')
    .insert({ ...ticket, user_email: session?.user.email })

  if (error) {
    throw new Error('Something went wrong :X')
  }

  // redirect user
  revalidatePath('/tickets')
  redirect('/tickets')
}

export const deleteTicket = async (id: string | undefined) => {
  const supabase = createServerActionClient({ cookies })

  // delete data
  const { error } = await supabase.from('tickets').delete().eq('id', id)

  if (error) throw new Error('Could not delete the ticket :X')

  revalidatePath('/tickets')
  redirect('/tickets')
}
