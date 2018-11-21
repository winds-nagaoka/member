import * as request from '../Library/Request'

export const loginAuth = () => {
  return async (dispatch) => {
    if (!window.localStorage.token) return dispatch(loginUpdate(false))
    dispatch(loading(true))
    const send = {
      userid: window.localStorage.windsid,
      token: window.localStorage.token
    }
    request.post('https://auth.winds-n.com/auth', send, (err, res) => {
      if (err) {
        return false
      } else {
        if (res.body.status) {
          console.log('Auth OK')
          dispatch(loginUpdate(true))
          dispatch(tokenUpdate(res.body.token))
        } else {
          console.log('Auth NG')
          dispatch(tokenUpdate(false))
          dispatch(loading(false))
        }  
      }
      dispatch(loading(false))
    })
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