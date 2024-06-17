'use client'
import { useState } from 'react'
import { addTicket } from '@/app/(dashboard)/tickets/actions'

type IsLoading = boolean

const CreateForm = () => {
  const [isLoading, setIsLoading] = useState<IsLoading>(false)
  const [formError, setFormError] = useState<string>('')

  return (
    <form className='w-1/2' action={addTicket}>
      <label htmlFor='title'>
        <span>Title:</span>
        <input name='title' required type='text' />
      </label>
      <label htmlFor='body'>
        <span>Body:</span>
        <textarea name='body' required />
      </label>
      <label htmlFor='priority'>
        <span>Priority:</span>
        <select name='priority'>
          <option value='low'>Low Priority</option>
          <option value='medium'>Medium Priority</option>
          <option value='high'>High Priority</option>
        </select>
      </label>
      {formError && <p className='error'>{formError}</p>}

      <button className='btn-primary' disabled={isLoading}>
        {isLoading && <span>Adding...</span>}
        {!isLoading && <span>Add Ticket</span>}
      </button>
    </form>
  )
}

export default CreateForm
