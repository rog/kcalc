import app from '../../app'
import test from 'tape'
require('./signup')
require('./login')
require('./meal')

test('teardown', (t) => {
  app.server.close()
  t.end()
})

