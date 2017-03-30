import emailRegex from 'email-regex'

export function password (value) {
  return value != null && value.match(/.{6,}/)
}

export function email (value) {
  return emailRegex({exact: true}).test(value)
}

