import acl from './koa-acl'

const roles = {}

roles.superadmin = (auth) => {
  return [
    ['*', /./]
  ]
}

roles.user = (auth) => {
  return [
    ['*', new RegExp('^/' + auth.role + '/' + auth.user + '/')]
  ]
}

roles.manager = (auth) => {
  return [
    ['*', new RegExp('^/' + auth.role + '/' + auth.user + '/')],
    ['GET', new RegExp('^/users/.+/profile')]
  ]
}

export default function () {
  return acl(roles)
}
