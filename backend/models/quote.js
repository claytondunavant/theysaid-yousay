const mongoose = require('mongoose')

//CONNECT TO DB
const url= process.env.MONGODB_TESTING_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB', error.message)
    })

const quoteSchema = new mongoose.Schema({
    content: String,
    date: Date,
})

//this modifys Quote JSON data from the database into how we
//we want it for the frontend
quoteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

//export the Quote mongoDB model when the file is required
module.exports = mongoose.model('Quote', quoteSchema)