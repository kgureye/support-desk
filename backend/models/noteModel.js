/* This will be a schema for a ticket I.E all the fields we want a ticket to have */

const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    ticket: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Ticket'
    },
    text: {
        type: String,
        required: [true, 'Please add some text']
    }, 
    isStaff: {
        type: Boolean,
        default: false
    },
    staffId: {
        type: String,
    }, 
}, 
{
    timestamps: true,
})

module.exports = mongoose.model('Note', noteSchema)


