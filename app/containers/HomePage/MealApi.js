import Hawk from 'hawk'

class MealApi {
  static create (payload) {
    const credentials = JSON.parse(sessionStorage.getItem('credentials'))
    const reqUrl = `http://localhost:8080/me/meals`
    const authorization = Hawk.client.header(reqUrl, 'POST', {credentials})
    const request = new Request(reqUrl, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: authorization.field
      }),
      body: JSON.stringify(payload)
    })
    return fetch(request).then(response => {
      return response.json()
    }).catch(error => {
      return error
    })
  }

  static update (payload) {
    const credentials = JSON.parse(sessionStorage.getItem('credentials'))
    const reqUrl = `http://localhost:8080/me/meals/${payload.id}`
    const authorization = Hawk.client.header(reqUrl, 'PUT', {credentials})
    const request = new Request(reqUrl, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: authorization.field
      }),
      body: JSON.stringify(payload)
    })
    return fetch(request).then(response => {
      return response.json()
    }).catch(error => {
      return error
    })
  }
}

export default MealApi
