'use client'

import { useState } from 'react'

type Email = string
type Password = string

interface AuthForm {
  handleAuthSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    email: Email,
    password: Password
  ) => {}
}

const AuthForm = ({ handleAuthSubmit }: AuthForm) => {
  const [email, setEmail] = useState<Email>('')
  const [password, setPassword] = useState<Password>('')

  return (
    <form onSubmit={(e) => handleAuthSubmit(e, email, password)}>
      <label>
        <span>Email:</span>
        <input
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </label>

      <label>
        <span>Password:</span>
        <input
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </label>

      <button className='btn-primary'>Submit</button>
    </form>
  )
}

export default AuthForm
