import parse from 'co-body'

import User from '../../models/user'
import {compare} from '../../util/bcrypt'

export default function * login () {
  const body = yield parse(this)
  console.log(body)
  const user = yield User.findOne({email: body.email.toLowerCase()})
  this.assert(user, 401, 'Wrong email or password')

  const result = yield compare(body.password, user.password)
  this.assert(result, 401, 'Wrong email or password')

  var token = user.createToken()
  user.lastLogin = new Date()
  user.token = token
  const savedUser = yield user.save()

  this.body = {
    success: true,
    id: savedUser.id,
    role: savedUser.role,
    key: savedUser.token.hash,
    algorithm: savedUser.token.algorithm
  }
}
