/* This will be a schema for a ticket I.E all the fields we want a ticket to have */

const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product: {
        type: String,
        required: [true, 'Please select a product'],
        enum: ['iPhone', 'Macbook pro', 'iMac', 'iPad']
    },
    description: {
        type: String,
        required: [true, 'Please describe the issue']
    },
    status: {
        type: String,
        required: true,
        enum: ['new', 'open', 'closed'],
        default: 'new'
    },
}, 
{
    timestamps: true,
})

module.exports = mongoose.model('Ticket', ticketSchema)
