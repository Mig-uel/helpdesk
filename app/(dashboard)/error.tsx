'use client'

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  return (
    <main className='text-center'>
      <h2 className='text-4xl'>Oh, no!</h2>
      <p>{error.message}</p>

      <button onClick={reset} className='btn-primary mx-auto my-4'>
        Try Again
      </button>
    </main>
  )
}

export default Error
