const getTickets = async () => {
  const res = await fetch('http://localhost:4000/tickets')
  return res.json()
}

const Tickets = async () => {
  const tickets = await getTickets()

  return <div></div>
}

export default Tickets
