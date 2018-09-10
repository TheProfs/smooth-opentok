'use strict'

const spawn = require('child_process').spawn

const spawnPolymerTest = ({ times = 2 }) => {
  const tasks = Array.from({ length: times }, () => ['polymer', ['test']])
    .map(set => {
      return new Promise(resolve => {
        const child = spawn(set[0], set[1])
        child.stdout.pipe(process.stdout)
        child.stderr.pipe(process.stdout)
        child.on('exit', resolve)
      })
    })

  return Promise.all(tasks)
    .then(exitCodes => {
      if (exitCodes.every(result => result === 0))
        return true
      else
        throw new Error('Some tests have failed')
    })
}

describe('Test Suite', () => {
  it ('Runs OK under normal network conditions', function() {
    this.timeout(120000)

    return spawnPolymerTest({ times: 2 })
  })

  // ... add more tests as you see fit.
})
