'use client'
import { useState } from 'react'
import { useRouter } from 'next/router'

type Title = string
type Body = string
type IsLoading = boolean

const CreateForm = () => {
  const [title, setTitle] = useState<Title>('')
  const [body, setBody] = useState<Body>('')
  const [priority, setPriority] = useState<Priority>('low')
  const [isLoading, setIsLoading] = useState<IsLoading>(false)

  return <main></main>
}

export default CreateForm