type Priority = 'low' | 'medium' | 'high'

interface Ticket {
  id: number
  title: string
  body: string
  priority: Priority
  user_email: string
}
