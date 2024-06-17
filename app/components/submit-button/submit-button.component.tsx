'use client'

import { useFormStatus } from 'react-dom'

const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <button disabled={pending} className='btn-primary'>
      <span>{pending ? 'Submitting...' : 'Submit'}</span>
    </button>
  )
}

export default SubmitButton
