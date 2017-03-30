import Router from 'koa-router'
import compose from 'koa-compose'

import {echo} from './util'

import signup from './users/signup'
import login from './users/login'
import logout from './users/logout'
import * as profile from './users/profile'
import * as meal from './customers/meal'

import * as sudoProfile from './superadmins/profile'

import auth from '../middleware/auth'
import acl from '../middleware/acl'
import me from '../middleware/me'

export default function () {
  const priv = new Router()
  const publ = new Router()

  publ.get('/ping', echo('pong'))
  publ.post('/signup', signup)
  publ.post('/login', login)
  priv.post('/:role/:user/logout', logout)

  priv.get('/secret', echo('SECRET'))
  priv.get('/:role/:user/profile', profile.get)
  priv.put('/:role/:user/profile', profile.update)

  priv.get('/:role/:user/meals', meal.list)
  priv.get('/:role/:user/meals/date/:date', meal.listByDate)
  priv.get('/:role/:user/meals/:meal', meal.get)
  priv.post('/:role/:user/meals', meal.create)
  priv.put('/:role/:user/meals/:meal', meal.update)
  priv.delete('/:role/:user/meals/:meal', meal.archive)

  priv.get('/sudo/profiles', sudoProfile.list)
  priv.get('/sudo/profiles/:user', sudoProfile.get)
  priv.post('/sudo/profiles', sudoProfile.create)
  priv.put('/sudo/profiles/:user', sudoProfile.update)
  priv.delete('/sudo/profiles/:user', sudoProfile.archive)

  return compose([
    publ.routes(),
    publ.allowedMethods(),
    auth(), me(), acl(),
    priv.routes(),
    priv.allowedMethods()
  ])
}
