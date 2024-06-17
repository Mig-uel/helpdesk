'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { TiDelete } from 'react-icons/ti'

const DeleteButton = ({ id }: { id: string | undefined }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const deleteHandler = async () => {
    setIsLoading((prev) => !prev)

    try {
      const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
        method: 'DELETE',
      })

      const { error } = await res.json()

      if (error)
        throw new Error(
          error?.message ||
            'An error occurred while trying to delete this ticket. Please try again...'
        )

      setIsLoading((prev) => !prev)
      router.refresh()
      router.push('/tickets')
    } catch (error) {
      setIsLoading((prev) => !prev)
      alert((error as Error).message)
    }
  }

  return (
    <button
      className='btn-primary'
      onClick={deleteHandler}
      disabled={isLoading}
    >
      <>
        <TiDelete />
        {isLoading ? 'Deleting...' : 'Delete Ticket'}
      </>
    </button>
  )
}

export default DeleteButton
