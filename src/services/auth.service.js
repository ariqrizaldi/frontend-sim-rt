import axios from 'axios'
const API_URL = 'https://simrt.herokuapp.com/auth/'
class AuthService {
  login (user) {
    return axios
      .post(API_URL + 'signin', {
        nama: user.nama,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data
      })
  }

  logout () {
    localStorage.removeItem('user')
  }

  /* register (user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    })
  } */
}
export default new AuthService()
