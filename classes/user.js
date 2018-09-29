'use strict'

class User {
  constructor(name, toggleVideo, toggleScreenShare) {
    this.name = name
    this.isConnected = false
    this.streams = {
      screen: null,
      camera: null
    }

    this.toggleVideo = toggleVideo
    this.toggleScreenShare = toggleScreenShare
  }

  isPublisher() {
    return Object.keys(this.streams)
      .filter(key => this.streams[key])
      .some(key => this.streams[key].publisher)
  }
}
