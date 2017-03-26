class SessionApi {
  static login (credentials) {
    const request = new Request('http://localhost:8080/login', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    })

    return fetch(request).then(response => {
      return response.json()
    }).catch(error => {
      return error
    })
  }

  static sign (credentials) {
    const request = new Request('http://localhost:8080/signup', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    })

    return fetch(request).then(response => {
      return response.json()
    }).catch(error => {
      return error
    })
  }
}

export default SessionApi
