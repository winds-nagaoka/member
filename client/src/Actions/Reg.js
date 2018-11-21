import request from 'superagent'

export const changeWindsid = (windsid) => ({
  type: 'REG_INPUT_WINDSID',
  payload: {
    windsid
  }
})

export const changePassword = (password) => ({
  type: 'REG_INPUT_PASSWORD',
  payload: {
    password
  }
})

export const changeKey = (approvalKey) => ({
  type: 'REG_INPUT_KEY',
  payload: {
    approvalKey
  }
})

export const error = (str) => ({
  type: 'ERROR',
  payload: {
    error: str
  }
})

export const loading = (loading) => ({
  type: 'LOADING',
  payload: {
    loading: loading
  }
})

export const registerToken = (token) => {
  return({
    type: 'LOGIN',
    payload: {
      token
    }
  })
}

export const register = () => {
  return async (dispatch, getState) => {
    const { reg: {windsid, password, approvalKey} } = getState()
    if (windsid === '' || password === '' || approvalKey === '') {
      return dispatch(error('入力を確認してください'))
    }
    dispatch(loading(true))
    console.warn('Register', windsid)
    request.post('https://auth.winds-n.com/adduser')
      .type('form')
      .send({
        userid: windsid,
        passwd: password,
        key: approvalKey
      })
      .end((err, res) => {
        console.log(res)
        if (err) return console.log('request')
        if (res.body.status) {
          console.log('Register OK: ' + res.body.status)
          window.localStorage.setItem('windsid', windsid)
          window.localStorage.setItem('token', token)
          dispatch(registerToken(res.body.token))
        } else {
          console.log('Register NG: ' + res.body.status)
          dispatch(registerToken(false))
        }
        dispatch(loading(false))
        dispatch(changePassword(''))
      })
  }
}
