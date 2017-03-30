import parse from 'co-body'
import User from '../../models/user'

export default function * signup () {
  const body = yield parse(this)
  body.role = body.role || 'user'

  const {name, email, password, role} = body

  try {
    yield User.create({name, email, password, role})
  } catch (err) {
    if (isDuplicateError('email', err)) {
      onDuplicateError(this, 'email', `Email [${body.email}] already taken`)
    }

    throw err
  }
  this.status = 201
  this.body = { success: true }
}

/**
 * detects if the error is duplicated
 */
function isDuplicateError (type, err) {
  return err.code === 11000 && err.message.includes(type)
}

/**
* called when signup fails
*/
function onDuplicateError (ctx, reason, message) {
  ctx.set('x-status-reason', reason)
  ctx.throw(409, message)
}
