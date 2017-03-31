import test from 'tape'
import request from 'request'
import config from 'config'
import faker from 'faker'

require('../../app')
import User from '../../models/user'
import resetDb from '../reset-db'

const baseUri = `http://localhost:${config.api.port}`
const endpoint = `${baseUri}/signup`
const post = request.defaults({json: true}).post

test('/signup setup', (t) => {
  resetDb().then(() => t.end())
})

const requiredFields = ['email', 'password']
requiredFields.map((field) => {
  test(`/signup fail if ${field} is missing`, (t) => {
    let body = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }
    delete body[field]

    post({
      uri: endpoint,
      body
    }, (err, res, body) => {
      t.error(err, 'No error')
      t.equal(res.statusCode, 400, 'Status code is 400')
      t.ok(body.errors[0].includes(field), 'The field is mentioned on the error')
      t.end()
    })
  })
})

test('/signup store data and hash password', (t) => {
  const data = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }

  post({
    uri: endpoint,
    body: data
  }, (err, res, body) => {
    t.error(err, 'No error')
    t.equals(res.statusCode, 201)
    t.ok(body.success, 'Endpoint succeeded')

    User.findOne({email: data.email.toLowerCase()}, (err, user) => {
      t.error(err, 'No error on database')
      t.equal(data.name, user.name)
      t.equal(data.email.toLowerCase(), user.email)
      t.notEqual(body.password, user.password)
      t.end()
    })
  })
})

