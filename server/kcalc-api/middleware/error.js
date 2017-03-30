export default function (app) {
  return function * error (next) {
    try {
      yield* next
      if (this.status == null) this.throw(404)
    } catch (err) {
      if (err.name === 'ValidationError') err.status = 400
      if (err.name === 'CastError') err.status = 404

      err.status = err.status || 500

      this.err = err
      this.stack = err.stack && err.stack.split('\n')
      this.errors = err.errors
      this.status = err.status

      if (err.errors) {
        this.errors = Object.keys(err.errors).map(function (key) {
          return key + ': ' + err.errors[key].message
        })
      }

      this.body = {
        success: false,
        url: this.url,
        path: this.path,
        method: this.method,
        error: this.err.message,
        status: this.err.status,
        errors: this.errors
      }

      if (process.env.NODE_ENV !== 'prod') {
        this.body.stack = this.stack
      }

      if (err.status === 500) {
        app.emit('error', err)
      }
    }
  }
}
