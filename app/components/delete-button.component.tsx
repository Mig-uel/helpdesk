'use client'

import { useState } from 'react'
import { TiDelete } from 'react-icons/ti'

const DeleteButton = ({ id }: { id: string | undefined }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const deleteHandler = async () => {
    setIsLoading((prev) => !prev)

    alert('deleting id: ' + id)

    setIsLoading((prev) => !prev)
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
