import { useEffect, useState} from 'react'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import {FaPlus} from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
import {getNotes, createNote, reset as notesReset} from '../features/notes/noteSlice'
import { useParams, useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import NoteItem from '../components/NoteItem'

Modal.setAppElement('#root')

function Ticket() {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [noteText, setNoteText] = useState('')
    const { ticket, isLoading, isSuccess, isError, message } = useSelector((state) => state.tickets)
    const { notes, isLoading: notesIsLoading} = useSelector((state) => state.notes)

    const params = useParams()
    const { ticketId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const customStyles = {
        content: {
          width: '600px',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          position: 'relative',
        },
      };
    useEffect(() => {
        dispatch(getTicket(ticketId))
        dispatch(getNotes(ticketId))
        .unwrap()
        // eslint-disable-next-line
    }, [ticketId, dispatch])

        //Close ticket
    const onTicketClose = () => {
        dispatch(closeTicket(ticketId))
        .unwrap()
        .then(() => {
            toast.success('Ticket closed')
            navigate("/tickets")
        })
       .catch(toast.error)
    }

    //Create note submit
    /* We can wrap our AsyncThunkAction here so no need for isError and isSuccess states. */
    const onNoteSubmit = (e) => {
        e.preventDefault()
        dispatch(createNote({ noteText, ticketId }))
        .unwrap()
        .then(() => {
            setNoteText('')
            closeModal()
        })
       .catch(toast.error)
    }

    // Open / close modals
    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)


    if(isLoading || notesIsLoading) {
        return <Spinner />
    }

    if(isError) {
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
            <h3>Notes</h3>
        </div>
    </header>
    {ticket.status !== 'closed' && (
        <button onClick={openModal} className="btn"><FaPlus /> Add Note</button>
    )}

    <Modal
     isOpen={modalIsOpen} 
     onRequestClose={closeModal}
     style={customStyles} 
     contentLabel="Add Note"
     >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>X</button>

        <form onSubmit={onNoteSubmit}>
            <div className="form-group">
                <textarea name="noteText" id="noteText" className="form-control" placeholder="Note Text" value={noteText} onChange={(e) => setNoteText(e.target.value)}></textarea>
                <div className="form-group">
                    <button className="btn" type="submit">
                        Submit
                    </button>
                </div>
            </div>
        </form>
    </Modal>
    

    {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
    ))}
    {ticket.status !== 'closed' && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">Close Ticket</button>
    )}
  </div>
}

export default Ticket