import axios from 'axios'
import authHeader from './auth-header'
const API_URL = 'http://localhost:8080/api/access/'
class UserService {
  getPublicContent () {
    return axios.get(API_URL + 'all')
  }

  getUserBoard () {
    return axios.get(API_URL + 'user', { headers: authHeader() })
  }

  getStaffBoard () {
    return axios.get(API_URL + 'staff', { headers: authHeader() })
  }

  getAdminBoard () {
    return axios.get(API_URL + 'admin', { headers: authHeader() })
  }

  getAdminGudangBoard () {
    return axios.get(API_URL + 'admin-gudang', { headers: authHeader() })
  }

  getTeknisiBoard () {
    return axios.get(API_URL + 'teknisi', { headers: authHeader() })
  }

  getSopirBoard () {
    return axios.get(API_URL + 'sopir', { headers: authHeader() })
  }
}
export default new UserService()
