import Hawk from 'hawk'

class IntakeApi {
  static load () {
    const credentials = JSON.parse(sessionStorage.getItem('credentials'))
    const reqUrl = `http://localhost:8080/me/meals`
    const authorization = Hawk.client.header(reqUrl, 'GET', {credentials})
    const request = new Request(reqUrl, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: authorization.field
      })
    })
    return fetch(request).then(response => {
      return response.json()
    }).catch(error => {
      return error
    })
  }

  static loadByDate (date) {
    const credentials = JSON.parse(sessionStorage.getItem('credentials'))
    const reqUrl = `http://localhost:8080/me/meals/date/${date}`
    const authorization = Hawk.client.header(reqUrl, 'GET', {credentials})
    const request = new Request(reqUrl, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: authorization.field
      })
    })
    return fetch(request).then(response => {
      return response.json()
    }).catch(error => {
      return error
    })
  }

  static loadByPeriod (period) {
    const credentials = JSON.parse(sessionStorage.getItem('credentials'))
    const reqUrl = `http://localhost:8080/me/meals/period/${period}`
    const authorization = Hawk.client.header(reqUrl, 'GET', {credentials})
    const request = new Request(reqUrl, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: authorization.field
      })
    })
    return fetch(request).then(response => {
      return response.json()
    }).catch(error => {
      return error
    })
  }

  static delete (payload) {
    const credentials = JSON.parse(sessionStorage.getItem('credentials'))
    const reqUrl = `http://localhost:8080/me/meals/${payload._id}`
    const authorization = Hawk.client.header(reqUrl, 'DELETE', {credentials})
    const request = new Request(reqUrl, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: authorization.field
      }),
      body: {
        id: payload._id
      }
    })
    return fetch(request).then(response => {
      return response.json()
    }).catch(error => {
      return error
    })
  }
}

export default IntakeApi
