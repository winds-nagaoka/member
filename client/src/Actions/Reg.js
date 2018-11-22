import * as Status from './Status'
import * as request from '../Library/Request'

export const register = () => {
  return async (dispatch, getState) => {
    const { reg: {windsid, password, approvalKey} } = getState()
    if (windsid === '' || password === '' || approvalKey === '') {
      return dispatch(error('入力を確認してください'))
    }
    dispatch(loading(true))
    const send = {
      userid: windsid,
      passwd: password,
      key: approvalKey
    }
    request.post('https://auth.winds-n.com/adduser', send, (err, res) => {
      if (err) {
        dispatch(error('登録できませんでした'))
      } else {
        if (res.body.status) {
          console.log('Register OK')
          dispatch(Status.windsidUpdate(windsid))
          dispatch(Status.tokenUpdate(res.body.token))
          dispatch(Status.loginUpdate(true))
        } else {
          console.log('Register NG')
          dispatch(Status.windsidUpdate(false))
          dispatch(Status.tokenUpdate(false))
          dispatch(Status.loginUpdate(false))
          dispatch(error('登録できませんでした'))
        }
      }
      dispatch(changePassword(''))
      dispatch(loading(false))
    })
  }
}

export const loading = (loading) => ({
  type: 'REG_LOADING',
  payload: {
    loading: loading
  }
})

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
  type: 'REG_ERROR',
  payload: {
    error: str
  }
})