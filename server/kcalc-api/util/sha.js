import crypto from 'crypto'

export function sha (password, _salt) {
  return crypto.createHash('sha256').update(password).digest('hex')
}
