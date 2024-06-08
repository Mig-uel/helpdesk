const getTickets = async () => {
  const res = await fetch('http://localhost:4000/tickets')
  return res.json()
}

const Tickets = async () => {
  const tickets = await getTickets()

  return (
    <>
      {tickets.map((ticket) => (
        <div key={ticket.id} className='card my-5'>
          <h3>{ticket.title}</h3>
          <p>{ticket.body.slice(0, 200)}...</p>
          <div className={`pill.${ticket.priority}`}></div>
        </div>
      ))}
    </>
  )
}

export default Tickets
