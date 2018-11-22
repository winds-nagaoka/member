import * as request from '../Library/Request'
import { version } from '../Library/Library'

export const loginAuth = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return dispatch(loginUpdate(false))
    if(getState().status.loading) return false
    dispatch(loading(true))
    const send = {
      userid: window.localStorage.windsid,
      token: window.localStorage.token,
      version
    }
    request.post('https://auth.winds-n.com/auth', send, (err, res) => {
      if (err) {
        return false
      } else {
        if (res.body.status) {
          console.log('Auth OK')
          dispatch(windsidUpdate(window.localStorage.windsid))
          dispatch(tokenUpdate(res.body.token))
          dispatch(loginUpdate(true))
        } else {
          console.log('Auth NG')
          dispatch(windsidUpdate(false))
          dispatch(tokenUpdate(false))
          dispatch(loginUpdate(false))
        }
      }
      dispatch(loading(false))
    })
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.clear()
    dispatch(windsidUpdate(false))
    dispatch(tokenUpdate(false))
    dispatch(loginUpdate(false))
  }
}

export const loginUpdate = (login) => {
  return({
    type: 'STATUS_LOGIN',
    payload: {
      login
    }
  })
}

export const windsidUpdate = (windsid) => {
  windsid ? window.localStorage.setItem('windsid', windsid) : false
  return({
    type: 'STATUS_WINDSID',
    payload: {
      windsid
    }
  })
}

export const tokenUpdate = (token) => {
  token ? window.localStorage.setItem('token', token) : false
  return({
    type: 'STATUS_TOKEN',
    payload: {
      token
    }
  })
}

export const loading = (loading) => ({
  type: 'STATUS_LOADING',
  payload: {
    loading: loading
  }
})

export const windowWidthChange = () => {
  return {
    type: 'STATUS_WINDOW_WIDTH',
    payload: {
      width: window.innerWidth
    }
  }
}

// function tokenUpdate (token) {
//   return({
//     type: 'STATUS_TOKEN',
//     payload: {
//       token
//     }
//   })
// }

// function loginUpdate (status) {
//   return({
//     type: 'STATUS_LOGIN',
//     payload: {
//       status
//     }
//   })
// }

// module.exports = {
//   tokenUpdate, loginUpdate
// }