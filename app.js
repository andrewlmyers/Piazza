// Importing the Express package
const express = require('express')

// Creating an express app
const app = express()

// Importing the Post Routes
const postRoute = require('./routes/posts')

// Importing Body-parser package
const bodyParser = require('body-parser')

// Importing the Mongoose package
const mongoose = require('mongoose')

// Importing dotenv package
require('dotenv/config')

app.use(bodyParser.json())
app.use('/posts', postRoute)

// Creating home root
app.get('/', (req, res) => {
    res.send('Homepage')
})

mongoose.connect(process.env.DB_CONNECTOR)


// Logging the conection of the database
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB database.');
});

mongoose.connection.on('error', (err) => {
    console.error('Database connection error:', err);
});

app.listen(3000, () => {
    console.log("Server is running...")
})