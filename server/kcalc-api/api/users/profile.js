import User from '../../models/user'
import parse from 'co-body'

export function * get () {
  const user = yield User.findById(this.params.user).exec()
  this.body = user.toJSON()
}

export function * update () {
  const user = yield User.findById(this.params.user).exec()
  this.assert(user, 404, `User not found [${this.auth.user}]`)

  const body = yield parse(this)

  const fields = ['name', 'email', 'password', 'preferences']
  let update = {}
  for (let field of fields) {
    if (body[field] != null) {
      update[field] = body[field]
    }
  }
  yield user.update(update)

  this.body = {success: true}
}

