'use strict'

const credentialServer = require('./server.js')

credentialServer.listen(3001, () => {
  console.info('Credentials server started at', 3001)
})
