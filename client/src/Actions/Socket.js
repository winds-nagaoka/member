// import socketio from 'socket.io-client'
// import * as Status from './Status'

// import * as Cast from './Cast'

// const socket = socketio.connect('https://cast.winds-n.com/', {secure: true})

export const connectSocket = () => {
  // return async (dispatch, getState) => {
  //   socket.on('connect', () => {
  //     // console.log('接続',socket.id)
  //     // state.socket.emit('connect', {
  //     //   recorderid: this.state.socket.id,
  //     //   from: this.state.socket.id,
  //     //   status: true
  //     // })
  //     dispatch(updateSocket(true, socket.id))
  //   })
  //   // Presenterがcastした場合
  //   socket.on('cast_start', async () => {
  //     // console.log('放送開始')
  //     dispatch(Cast.getList())
  //   })
  //   // Presenterがcastを終了した場合
  //   socket.on('cast_end', async (obj) => {
  //     // console.log('放送終了')
  //     // this.closePeer()
  //   })
  // }
}

export const disconnectSocket = () => {
  return async (dispatch, getState) => {
    if (getState().socket.status) {
      // console.log('接続解除')
      // socket.disconnect()
      dispatch(updateSocket(false, false))
    }
  }
}

export const updateSocket = (connectStatus, id) => ({
  type: 'SOCKET_CONNECT',
  payload: {
    status: connectStatus,
    id,
  },
})
