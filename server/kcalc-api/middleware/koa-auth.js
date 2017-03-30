import Hawk from 'hawk'

function credentialsToAuth (credentials, artifacts) {
  let ret = {
    credentials,
    artifacts,
    user: credentials.id
  }

  for (let key in credentials) {
    if (~['id', 'algorithm', 'key'].indexOf(key)) {
      continue
    }
    ret[key] = credentials[key]
  }
  return ret
}

function serverAuthenticate (request, getCredentials, options) {
  return new Promise((resolve, reject) => {
    Hawk.server.authenticate(request, getCredentials, options, (err, credentials, artifacts) => {
      if (err) return reject(err)
      resolve(credentialsToAuth(credentials, artifacts))
    })
  })
}

function bewitAuthenticate (request, getCredentials, options) {
  return new Promise((resolve, reject) => {
    Hawk.uri.authenticate(request, getCredentials, options, (err, credentials, artifacts) => {
      if (err) return reject(err)
      resolve(credentialsToAuth(credentials, artifacts))
    })
  })
}

function * headerHawk (ctx, getCredentials, options, next) {
  try {
    ctx.auth = yield serverAuthenticate(ctx.request, getCredentials, options)
  } catch (err) {
    ctx.throw(401, err)
  }

  yield next

  let headerData = {
    payload: ctx.body,
    contentType: ctx.type
  }
  // Hawk complains when the body is a json object
  if (typeof ctx.body !== 'string' && !Buffer.isBuffer(ctx.body)) {
    try {
      headerData.payload = JSON.stringify(ctx.body)
      headerData.type = 'application/json'
    } catch (e) {
      ctx.throw(500, 'Hawk: Unable to calculate headers')
    }
  }
  var header = Hawk.server.header(ctx.auth.credentials, ctx.auth.artifacts, headerData)
  ctx.set('Server-Authorization', header)
}

function * bewitHawk (ctx, getCredentials, options, next) {
  try {
    ctx.auth = yield bewitAuthenticate(ctx.request, getCredentials, options)
  } catch (err) {
    ctx.throw(401, err)
  }
  yield next
}

export default function auth (getCredentials, options = {}) {
  if (typeof getCredentials !== 'function') {
    throw new Error('koa-hawk-auth: The first parameter should be a function [credentialsFunc]')
  }

  return function * hawkAuth (next) {
    if (this.get('authorization')) {
      yield* headerHawk(this, getCredentials, options, next)
    } else if (this.query.bewit) {
      yield* bewitHawk(this, getCredentials, options, next)
    } else {
      this.throw(401)
    }
  }
}
