'use strict'

const OpenTok = require('opentok')
const app = require('express')()
const cors = require('cors')
const queue = require('queue')
const argv = require('nomnom').parse()
const opentok = new OpenTok(+argv['opentok-api-key'], argv['opentok-api-secret'])
const q = queue({ autostart: true, concurrency: 1 })

app.use(cors({
  credentials: true,
  origin: '*'
}))

const sessions = []

const findOrCreateSession = session_name => {
  return new Promise((resolve, reject) => {
    const existing = sessions.find(session => session.name === session_name)

    if (existing)
      return resolve(existing)

    opentok.createSession({ mediaMode: 'routed' }, (err, session) => {
      if (err)
        return reject(err)

      session = {
        name: session_name,
        api_key: +argv['opentok-api-key'],
        session_id: session.sessionId,
        token: opentok.generateToken(session.sessionId, {
          expireTime: Date.now() + 10 * 60 * 1000 // 10 minutes
        }),
        expiry_date: Date.now() + 10 * 60 * 1000 // 10 minutes
      }

      sessions.push(session)

      return resolve(session)
    })
  })
}

app.post('/credentials/:session_name', (req, res) => {
  // @NOTE
  // We need to serve credentials one-at-a-time, otherwise 2 simultaneously
  // opened instances (such as in unit-tests), will both race to create
  // a session and get different tokens; `findOrCreateSession()` above
  // will not have time to save the session in the `sessions` arr.
  q.push(() => {
    return findOrCreateSession(req.params.session_name)
      .then(credentials => res.json(credentials))
      .catch(err => {
        console.error(err)
        res.sendStatus(500)
      })
  })
})

module.exports = app
