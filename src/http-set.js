import axios from 'axios'
export default axios.create({
  baseURL: 'https://simrt.herokuapp.com/api',
  headers: {
    'Content-type': 'application/json'
  }
})
