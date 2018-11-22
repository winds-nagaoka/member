import socketio from 'socket.io-client'
// import * as Status from './Status'

const socket = socketio.connect('https://cast.winds-n.com/', {secure: true})

export const connectSocket = () => {
  return async (dispatch, getState) => {
    socket.on('connect', () => {
      console.log(socket.id)
      // state.socket.emit('connect', {
      //   recorderid: this.state.socket.id,
      //   from: this.state.socket.id,
      //   status: true
      // })
      dispatch(updateSocket(true, socket.id))
    })
  }
}

export const updateSocket = (connectStatus, id) => ({
  type: 'SOCKET_CONNECT',
  payload: {
    id,
    status: connectStatus
  }
})