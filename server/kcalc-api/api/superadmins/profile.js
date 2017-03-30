import User from '../../models/user'
import parse from 'co-body'
import {pick} from 'lodash'

export function * get () {
  const user = yield User.findOne({
    _id: this.params.user
  }).exec()
  this.assert(user, 404, `User not found [${this.params.user}]`)
  this.type = 'json'
  this.body = user.toJSON()
}

export function * list () {
  let query = User.find({
    archived: false
  })
  const users = yield query.exec()
  this.type = 'json'
  this.body = users.map (user => user.toObject())
}

export function * create () {
  let data = yield parse(this)
  let created = yield User.create(data)

  this.status = 201
  this.type = 'json'
  this.body = created.toObject()
}

export function * update () {
  let user = yield User.findOne({
    _id: this.params.user
  })
  this.assert(user, 404, `User not found ${this.params.user}`)

  const body = yield parse(this)
  const fields = ['email', 'name', 'preferences', 'role']
  const update = fields.reduce((r, field) => {
    if (body[field] === user[field]) return r
    r[field] = body[field]
    return r
  }, {})

  yield user.update(update)
  this.body = {success: true}
}

export function * archive () {
  let user = yield User.findOne({
    _id: this.params.user
  })
  this.assert(user, 404, `User not found [${this.params.user}]`)

  yield user.update({archived: true})
  this.body = {success: true}
}
