type Priority = 'low' | 'medium' | 'high'

interface Ticket {
  id?: string
  title: string
  body: string
  priority: Priority
  user_email?: string
}
