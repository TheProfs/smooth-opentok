'use strict'

class CallConnection {
  constructor({connection, isMe = false, toggleVideo, toggleScreenShare}) {
    Object.assign(this, connection)

    this.isMe = isMe
    this.streams = {
      screen: null,
      camera: null
    }

    this.isConnected = false
    this.principalFullScreen = false
    this.principal = false
    this.videoDisabledDueToQuality = false

    this.toggleVideo = toggleVideo
    this.toggleScreenShare = toggleScreenShare
  }
}
