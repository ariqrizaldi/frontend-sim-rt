import http from '../http-set'
class DataService {
  create (link, data) {
    return http.post(`${link}`, data)
  }

  get (link, id) {
    return http.get(`${link}` + `${id}`)
  }

  update (link, id, data) {
    return http.put(`${link}` + `${id}`, data)
  }

  upload (link, id, file, onUploadProgress) {
    return http.post(`${link}` + `${id}`, file, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress
    })
  }

  delete (link, id) {
    return http.delete(`${link}` + `${id}`)
  }
}
export default new DataService()
