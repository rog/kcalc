import Koa from 'koa'
import config from 'config'
import mongoose from 'mongoose'
import logger from 'koa-logger'
import cors from 'koa-cors'

import api from './api'
import error from './middleware/error'
import options from './middleware/options'

mongoose
  .connect(config.mongodb.uri, config.mongodb.options)
  .connection
  .once('open', () => console.log('mongodb up and running at %s', config.mongodb.uri))
  .on('error', (err) => {
    console.error('cannot connect to mongodb: %s', err.message)
    throw err
  })
  .on('close', () => console.log('lost connection to mongodb'))

const kcalcApi = new Koa()
if (process.env.NODE_ENV !== 'production') {
  kcalcApi.use(logger())
}
kcalcApi.use(error(kcalcApi))
kcalcApi.use(cors())
kcalcApi.use(options())
kcalcApi.use(api())

export default kcalcApi
