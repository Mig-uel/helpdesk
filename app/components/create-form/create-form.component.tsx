'use client'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PostgrestError } from '@supabase/supabase-js'

type Title = string
type Body = string
type IsLoading = boolean

const CreateForm = () => {
  const router = useRouter()

  const [title, setTitle] = useState<Title>('')
  const [body, setBody] = useState<Body>('')
  const [priority, setPriority] = useState<Priority>('low')
  const [isLoading, setIsLoading] = useState<IsLoading>(false)
  const [formError, setFormError] = useState<string>('')

  // submit handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError('')
    setIsLoading(true)

    const ticket: Ticket = {
      title,
      body,
      priority,
    }

    try {
      const res = await fetch('http://localhost:3000/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticket),
      })

      const { data, error }: { data: Ticket; error: PostgrestError | null } =
        await res.json()

      if (error) throw new Error(error.message)

      router.refresh()
      router.push('/tickets')
    } catch (error) {
      setFormError((error as Error).message)
    }
  }

  return (
    <form className='w-1/2' onSubmit={handleSubmit}>
      <label>
        <span>Title:</span>
        <input
          required
          type='text'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </label>
      <label>
        <span>Body:</span>
        <textarea
          required
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
      </label>
      <label>
        <span>Priority:</span>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          <option value='low'>Low Priority</option>
          <option value='medium'>Medium Priority</option>
          <option value='high'>High Priority</option>
        </select>
      </label>
      <button className='btn-primary' disabled={isLoading}>
        {isLoading && <span>Adding...</span>}
        {!isLoading && <span>Add Ticket</span>}
      </button>

      {}
    </form>
  )
}

export default CreateForm
