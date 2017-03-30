import koaAuth from './koa-auth'
import User from '../models/user'

function getCredentials (id, callback) {
  User.findById(id).select('token role').exec()
    .then((user) => {
      const result = {
        id: user.id,
        key: user.token.hash,
        algorithm: user.token.algorithm,
        role: user.role
      }
      callback(null, result)
    }, (err) => callback(err))
}

export default function () {
  return koaAuth(getCredentials)
}
