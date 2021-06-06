import axios from 'axios'
//both frontend and backend have same address
const baseUrl = '/api/quotes'

//get the latest quote
//can stack thens because they return promises
const getLatest = () => {
    const request = axios.get(`${baseUrl}/latest`)
    return request.then(response => response.data)
}

//create a new quote
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const quotes = {
    getLatest,
    create
}
export default quotes