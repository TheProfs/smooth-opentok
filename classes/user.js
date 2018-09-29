'use strict'

class User {
  constructor(name) {
    this.name = name
    this.isConnected = false
    this.streams = {
      screen: null,
      camera: null
    }
  }

  isPublisher() {
    return Object.keys(this.streams)
      .filter(key => this.streams[key])
      .some(key => this.streams[key].publisher)
  }
}
