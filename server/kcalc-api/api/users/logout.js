import User from '../../models/user'

export default function * logout () {
  const user = yield User.findById(this.params.user).exec()
  this.assert(user, 404)

  yield user.update({token: {}}).exec()
  this.body = {success: true}
}
