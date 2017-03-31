import faker from 'faker'

const docs = [{
  name: 'Audra Puig',
  email: 'audra.puig@fixture.none',
  token: {
    hash: '00000'
  }
}, {
  name: 'Marjory Kovacs',
  email: 'marjory.kovacs@fixture.none',
  token: {
    hash: '11111'
  }
}, {
  name: 'Ramiro Halas',
  email: 'ramiro.halas@fixture.none',
  role: 'manager',
  token: {
    hash: '22222'
  }
}, {
  name: 'Delena Vandoren',
  email: 'delena.vandoren@fixture.none',
  role: 'superadmin',
  token: {
    hash: '33333'
  }
}]

const documents = docs.map((doc) => {
  let obj = Object.assign({}, {
    password: 'password',
    role: 'user'
  }, doc)
  obj.email = obj.email && obj.email.toLowerCase() || faker.internet.email()
  obj.token = obj.token || {}
  obj.token.algorithm = obj.token.algorithm || 'sha1'
})

export default {
  storage: 'mongodb',
  name: 'users',
  model: 'Users',
  documents
}
