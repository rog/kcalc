module.exports = function (roles) {
  return function * acl (next) {
    var role = this.auth.role
    var endpoints = roles[role](this.auth)

    var shallPass = endpoints.some(endpoint => {
      const [method, regexp] = endpoint
      return (method === '*' || this.method === method) &&
        regexp.test(this.path)
    })

    this.assert(shallPass, 403)

    yield* next
  }
}

