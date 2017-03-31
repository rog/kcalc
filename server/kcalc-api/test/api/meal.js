import test from 'tape'
import Request from 'request'
import config from 'config'
import moment from 'moment'

require('../../app')
import resetDb from '../reset-db'
import {oid} from '../../util/oid'

const baseUri = `http://localhost:${config.api.port}`
const endpoint = `${baseUri}/me/meals`

const user = {
  _id: oid(1),
  name: 'Audra Puig',
  email: 'audra.puig@fixture.none',
  password: 'password',
  role: 'user',
  token: {
    hash: '00000',
    algorithm: 'sha1'
  }
}

const meal = {
  _id: oid(100),
  calories: 200,
  text: 'Pita chips',
  user: oid(1)
}

const fixture = {
  Users: [user],
  Meal: [meal, {
    calories: 800,
    text: 'Ice cream',
    user: oid(110)
  }]
}

const request = Request.defaults({
  json: true,
  hawk: {
    credentials: {
      key: user.token.hash,
      algorithm: user.token.algorithm,
      id: user._id.toString()
    }
  }
})

test('/meals Setup', (t) => {
  resetDb(fixture).then(() => t.end())
})

test('POST /meals should create meal', (t) => {
  const date = moment().startOf('day').hours(10).toDate()
  const body = {
    calories: 100,
    text: 'Cesar Salad',
    date
  }

  request({
    method: 'POST',
    uri: endpoint,
    body
  }, (err, res, doc) => {
    t.error(err, 'No error')
    t.equal(res.statusCode, 201, 'Status code is 201')
    t.equal(doc.text, body.text, 'Text is returned')
    t.equal(doc.calories, body.calories, 'Calories is returned')
    t.equal(doc.date, date.toISOString(), 'Should return date')
    t.equal(doc.time, 1000, 'Should store the meal time')
    t.end()
  })
})

test('GET /meals/:meal should get the meal', (t) => {
  request({
    method: 'GET',
    uri: `${endpoint}/${meal._id.toString()}`
  }, (err, res, doc) => {
    t.error(err, 'No error')
    t.equal(res.statusCode, 200, 'Status code is 200')
    t.equal(doc.text, meal.text)
    t.equal(doc.calories, meal.calories)
    t.end()
  })
})

test('PUT /meals/:meal should update meal', (t) => {
  let body = {
    calories: 250
  }

  request({
    method: 'PUT',
    uri: `${endpoint}/${meal._id.toString()}`,
    body
  }, (err, res, doc) => {
    t.error(err, 'No error')
    t.equal(res.statusCode, 200, 'Status code is 200')
    t.equal(doc.success, true)
    t.end()
  })
})

test('GET /meals should get all the user\'s meals', (t) => {
  request({
    method: 'GET',
    uri: endpoint
  }, (err, res, docs) => {
    t.error(err, 'No error')
    t.equal(res.statusCode, 200, 'Status code is 200')
    t.equal(docs.length, 2, 'Two meals were found')
    t.end()
  })
})

