import mongoose from 'mongoose'
import {hash} from '../util/bcrypt'
import {sha} from '../util/sha'

import {userRoles} from './enums'
import {email as emailValidator, password as passwordValidator} from './validators'

const {Schema} = mongoose

let Token = new Schema({
  hash: {type: String},
  algorithm: {type: String, default: 'sha1'}
})

// fields
let User = new Schema({
  name: {type: String},
  email: {type: String, required: true, lowercase: true},
  password: {type: String, required: true},
  token: Token,
  role: {type: String, enum: userRoles, required: true},
  preferences: {
    caloriesPerDay: Number,
  },
  lastLogin: Date,
  createdAt: {type: Date, default: Date.now},
  archived: {type: Boolean, default: false},
  updatedAt: Date
})

// indexes
User.index({email: 1}, {unique: true})
User.index({'token.hash': 1}, {unique: true, sparse: true})
User.index({role: 1})

User.path('email').validate(
  value => emailValidator(value)
, 'Path `{PATH}` is invalid: `{VALUE}`')

User.path('password').set(value => {
  // skip hashing if not valid
  if (!passwordValidator(value)) return value

  // hash password and update salt
  return hash(value)
})

User.path('password').validate(
  value => passwordValidator(value)
, 'Path `{PATH}` is invalid: `{VALUE}`')

User.methods.createToken = function () {
  return {hash: getToken(this.id)}
}

User.set('toObject', {
  transform: function (doc, ret, options) {
    delete ret.token
    delete ret.password
    delete ret.lastLogin
    delete ret.__v
  }
})

function getToken (id) {
  return sha(id + Date.now() + Math.random() + '')
}

export default mongoose.model('User', User)
