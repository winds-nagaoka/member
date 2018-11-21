import request from 'superagent'

export const changeWindsid = (windsid) => ({
  type: 'LOGIN_INPUT_WINDSID',
  payload: {
    windsid
  }
})

export const changePassword = (password) => ({
  type: 'LOGIN_INPUT_PASSWORD',
  payload: {
    password
  }
})

export const loginToken = (token) => {
  token ? window.localStorage.setItem('token', token) : false
  return({
    type: 'LOGIN',
    payload: {
      token
    }
  })
}

export const loading = (loading) => ({
  type: 'LOADING',
  payload: {
    loading: loading
  }
})

export const login = (windsid, password) => {
  return async (dispatch) => {
    dispatch(loading(true))
    console.warn('login')
    request.post('https://auth.winds-n.com/login')
      .type('form')
      .send({
        userid: windsid,
        passwd: password
      })
      .end((err, res) => {
        console.log(res)
        if (err) return console.log('request')
        if (res.body.status) {
          console.log('Login OK: ' + status)
          dispatch(loginToken(token))
        } else {
          console.log('Login NG: ' + status)
          dispatch(loginToken(false))
        }
        dispatch(loading(false))
      })
  }
}