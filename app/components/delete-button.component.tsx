'use client'
import { useTransition } from 'react'
import { TiDelete } from 'react-icons/ti'
import { deleteTicket } from '../(dashboard)/tickets/actions'

const DeleteButton = ({ id }: { id: string | undefined }) => {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      className='btn-primary'
      onClick={() => startTransition(deleteTicket(id) as any)}
      disabled={isPending}
    >
      <>
        <TiDelete />
        {isPending ? 'Deleting...' : 'Delete Ticket'}
      </>
    </button>
  )
}

export default DeleteButton
