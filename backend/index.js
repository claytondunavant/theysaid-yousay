//IMPORTS

const { response } = require('express')
const express = require('express')
const app = express()
//install cors
const cors = require('cors')
//install mongoose
const mongoose = require('mongoose')
//bring in env variables
require('dotenv').config()


//MIDDLE WARE

//allows use of json-parse
app.use(express.json())
//allow the ability to serve static files
//checks build for first for what HTTP is asking for
app.use(express.static('build'))
app.use(cors())

//CONNECT TO DB
const url= process.env.MONGODB_TESTING_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const quoteSchema = new mongoose.Schema({
    content: String,
    date: Date,
})

const Quote = mongoose.model('Quote', quoteSchema)

/*const quote = new Quote({
    content: 'test data number 2',
    date: new Date(),
})

quote.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
})*/

//DEV DATA

let quotes = [
    {
        id: 1,
        content: "hope you have a good day",
        date: "2019-05-30T17:30:31.098Z",
    },
    {
        id: 2,
        content: "you too!",
        date: "2019-05-30T18:39:34.091Z",
    },
]

//FUNCTONS

const getMaxId = () => {
    const maxId = quotes.length > 0
        ? Math.max(...quotes.map(n => n.id))
        : 0
    return maxId
}

const generateId = () => {
    return getMaxId() + 1
}

////ROUTES

//get all the quotes
//REMOVE IN PRODUCTION
app.get('/api/quotes', (request, response) => {
    response.send(quotes)
})

//peek most recent quote
//GET latest
app.get('/api/quotes/latest', (request, response) => {
    response.send(quotes[getMaxId() - 1])
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
    
    //make quote to add to db
    const quote = {
        id: generateId(),
        content: body.content,
        date: new Date(),
    }
    
    //add quote to quotes
    quotes = quotes.concat(quote)
    
    response.json(quote)
})

////RUN SERVER

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)    
})
