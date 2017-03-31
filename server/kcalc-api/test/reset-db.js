import mongoose from 'mongoose'
import config from 'config'
import co from 'co'
import Debug from 'debug'

import Users from '../models/user'
import Meal from '../models/meal'

const debug = Debug('app:test:reset-db')
const models = {Users, Meal}

export default function resetDb (fixtures) {
  if (!config.mongodb.can_reset) {
    console.error(' > Cannot reset database with NODE_ENV=%s (can_reset_db=false), you sure you wanna do that buddy?')
    process.exit(1)
  }

  return co(function * () {
    debug('resetdb')
    yield checkConnection()
    yield dropCollections()
    if (fixtures) {
      yield loadMongoDbFixtures(fixtures)
    }
  }).catch((err) => console.error(err))
}

function * dropCollections () {
  debug('dropping collections...')
  const collections = yield new Promise((done, rej) => {
    mongoose.connection.db.collections(function (err, collections) {
      if (err) return rej(err)
      done(collections)
    })
  })

  const dropChain = collections.reduce(function (current, collection) {
    if (collection.collectionName.match(/system/)) return current
    debug(' - %s...', collection.collectionName)
    var promise = new Promise((done, rej) => {
      collection.drop((err) => {
        if (err) return rej(err)
        done()
      })
    })
    return current.then(promise)
  }, Promise.resolve())
  yield dropChain
}

function * loadMongoDbFixtures (fixtures) {
  debug('mongodb fixtures...')
  if (fixtures == null) return
  Object.keys(fixtures).reduce((current, model) => {
    const documents = fixtures[model]
    debug(' + %s (%d docs)...', model, documents.length)

    let docs = documents.map((doc) => models[model].create(doc))
    debug('   %s (%d docs) done', model, documents.length)
    return current.then(docs)
  }, Promise.resolve())
}

function checkConnection () {
  debug('checkConnection (%d)...', mongoose.connection.readyState)

  switch (mongoose.connection.readyState) {
    case 1:
      debug('connection found')
      return Promise.resolve()
    case 2:
      debug('waiting for connection...')
      return new Promise((done) => mongoose.connection.once('open', done))
    case 0:
      debug('not connected to mongodb')
      return new Promise((done) => {
        mongoose
        .connect(config.mongodb.uri, config.mongodb.options)
        .connection
        .once('open', function callback () {
          debug('mongodb up and running at %s', config.mongodb.uri)
          done()
        })
        .on('error', function (err) {
          debug('cannot connect to mongodb: %s', err.message)
          debug()
          process.exit(1)
        })
        .on('close', function () {
          debug('lost connection to mongodb')
        })
      })
    default:
      return Promise.reject()
  }
}

