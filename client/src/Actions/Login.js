import * as Status from './Status'
import * as request from '../Library/Request'
import * as lib from '../Library/Library'
import { showToast } from './Toast'

export const login = () => {
  return async (dispatch, getState) => {
    const { login: {windsid, password} } = getState()
    if (windsid === '' || password === '') return dispatch(setErrorMessage('入力を確認してください'))
    dispatch(loading(true))
    const path = lib.getAuthPath() + '/login'
    const send = {
      userid: windsid,
      passwd: password,
      clientid: lib.getClientid(),
      useragent: window.navigator.userAgent,
      version: lib.version
    }
    request.post(path, send, (err, res) => {
      if (err) {
        dispatch(setErrorMessage('ログインできませんでした'))
      } else {
        if (res.body.status) {
          location.reload()
          dispatch(showToast('ログインしました'))
          dispatch(Status.windsidUpdate(windsid))
          dispatch(Status.tokenUpdate(res.body.token))
          dispatch(Status.loginUpdate(true))
          dispatch(Status.setUser(res.body.user))
        } else {
          dispatch(Status.windsidUpdate(false))
          dispatch(Status.tokenUpdate(false))
          dispatch(Status.loginUpdate(false))
          dispatch(setErrorMessage('ログインできませんでした'))
        }  
      }
      dispatch(changePassword(''))
      dispatch(loading(false))
    })
  }
}

export const loading = (loading) => ({
  type: 'LOGIN_LOADING',
  payload: {
    loading: loading
  }
})

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

export const setErrorMessage = (str) => ({
  type: 'LOGIN_ERROR',
  payload: {
    errorMessage: str
  }
})