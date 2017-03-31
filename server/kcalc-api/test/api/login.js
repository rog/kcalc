import test from 'tape'
import request from 'request'
import config from 'config'

require('../../app')
import resetDb from '../reset-db'

const baseUri = `http://localhost:${config.api.port}`
const endpoint = `${baseUri}/login`
const post = request.defaults({json: true}).post

const user = {
  name: 'Audra Puig',
  email: 'audra.puig@fixture.none',
  password: 'password',
  role: 'user'
}
const fixture = {
  Users: [user]
}

test('/login Setup', (t) => {
  resetDb(fixture).then(() => t.end())
})

test('/login should succeed', (t) => {
  let body = {
    email: user.email,
    password: user.password
  }

  post({
    uri: endpoint,
    body
  }, (err, res, doc) => {
    t.error(err, 'No error')
    t.equal(res.statusCode, 200, 'Status code is 200')
    t.ok(doc.success, 'success')
    t.equal(doc.role, 'user', 'role is returned')
    t.ok(doc.id, 'User is returned')
    t.ok(doc.key, 'key is returned')
    t.ok(doc.algorithm, 'algorithm is returned')
    t.end()
  })
})

test('/login should ignore case', (t) => {
  let body = {
    email: 'AUDRA.PUIG@fixture.none',
    password: 'password'
  }

  post({
    uri: endpoint,
    body
  }, (err, res, doc) => {
    t.error(err, 'No error')
    t.equal(res.statusCode, 200, 'Status code is 200')
    t.equal(doc.role, user.role, 'Role is returned')
    t.ok(doc.key, 'Key is returned')
    t.ok(doc.algorithm, 'Algorithm is returned')
    t.ok(doc.id, 'User is returned')
    t.end()
  })
})

