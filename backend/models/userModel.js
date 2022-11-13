/* This will be a schema for a user. I.E all the fields we want a user to have */

const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [false, 'Please add a name'] // put it to false for now since code breaks if I require it.
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
}, 
{
    timestamps: true,
})

module.exports = mongoose.model('User', userSchema)
