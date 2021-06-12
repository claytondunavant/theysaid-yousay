//IMPORTS

const { response } = require('express')
const express = require('express')
const app = express()
//install cors
const cors = require('cors')
//bring in env variables
require('dotenv').config()
//import the mongodb model for a quote
const Quote = require('./models/quote')

//MIDDLE WARE

//allows use of json-parse
app.use(express.json())
//allow the ability to serve static files
//checks build for first for what HTTP is asking for
app.use(express.static('build'))
app.use(cors())

////ROUTES

//peek most recent quote
//GET latest
app.get('/api/quotes/latest', (request, response) => {
    Quote.find().limit(1).sort({$natural:-1}).then(result => {
        response.json(result[0])    
    })
})

//push new quote
//POST
app.post('/api/quotes', (request, response) => {
    const body = request.body
    
    //test if body has content
    if (!body.content) {
        return response.status(400).json({
        error: 'content missing'
        })
    }
    
    //make new quote with MongoDB quote schema
    const quote = new Quote({
        content: body.content,
        date: new Date(),
    })
    
    //save note to MongoDB
    quote.save().then(savedNote => {
        response.json(savedNote)
    })
    
})

////RUN SERVER

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)    
})
