// Importing the Mongoose package
const mongoose = require('mongoose')

// Creating the new schema for the post
const PostSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    topic: {
        type: [String],
        enum: ['politics', 'health', 'sport', 'tech'],
        required: true
    },
    date: {
        type: Date,
        default: Date.now

    },
    message: {
        type: String,
        require: true
    },
    hashtags: {
        type: [String]
    }
    
})

module.exports = mongoose.model('posts', PostSchema)