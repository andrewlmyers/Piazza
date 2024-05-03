// Importing the Mongoose package
const mongoose = require('mongoose')

// Creating the new schema for the post
const UserSchema = mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    role: {
        type: [String],
        enum: ['admin', 'user'],
        required: true
    },
    time_created: {
        type: Date,
        default: Date.now

    }
    
})

module.exports = mongoose.model('users', UserSchema)