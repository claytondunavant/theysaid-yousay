import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/quotes'

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