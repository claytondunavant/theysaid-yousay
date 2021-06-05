import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/quotes'

//get the latest quote
const getLatest = () => {
    const request = axios.get(`${baseUrl}/latest`)
    return request.then(response => response.data)
}

//create a new quote
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    
}

export default { getLatest, create }