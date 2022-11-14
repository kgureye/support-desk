import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, reset, closeTicket } from '../features/tickets/ticketSlice'
import { useParams, useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

function Ticket() {
    const { ticket, isLoading, isSuccess, isError, message } = useSelector((state) => state.tickets)
    const params = useParams()
    const { ticketId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }
        dispatch(getTicket(ticketId))
        // eslint-disable-next-line
    }, [isError, message, ticketId])

    const onTicketClose = () => {
        dispatch(closeTicket(ticketId))
        toast.success('Ticket closed')
        navigate("/tickets")
    }
    if(isLoading) {
        return <Spinner />
    }
    if(isError){
        return toast.error('Something went wrong')
    }

  return <div className="ticket-page">
    <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
            Ticket ID: {ticket._id}
            <span className={`status status-${ticket.status}`}>
                {ticket.status}
            </span>
        </h2>
        <h3> Product: {ticket.product}</h3>
        <h3>Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
        <hr />
        <div className="ticket-desc">
            <h3>Description of the issue</h3>
            <p>{ticket.description}</p> 
        </div>
    </header>
    {ticket.status !== 'closed' && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">Close Ticket</button>
    )}
  </div>
}
export default Ticket