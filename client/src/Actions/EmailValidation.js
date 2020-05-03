import { replace } from 'react-router-redux'

import * as Status from './Status'
import * as request from '../Library/Request'
import * as lib from '../Library/Library'
import { getUser } from './Setting'
import { showToast } from './Toast'

const prefix = 'EMAIL_VALIDATION_'

const loading = (loading) => ({
  type: prefix + 'LOADING',
  payload: { loading }
})

export const setKey = (key) => ({
  type: prefix + 'SET_KEY',
  payload: { key }
})

export const checkAuth = (key) => {
  return (dispatch) => {
    if (window.localStorage.token) dispatch(replace('/setting/valid/' + key))
  }
}

export const requestLogin = () => {
  return async (dispatch, getState) => {
    // 送信済みの場合キャンセル
    if (getState().emailValidation.loading) return
    const { emailValidation: {windsid, password} } = getState()
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
          // location.reload()
          // dispatch(showToast('ログインしました'))
          dispatch(Status.windsidUpdate(windsid))
          dispatch(Status.tokenUpdate(res.body.token))
          dispatch(Status.loginUpdate(true))
          dispatch(Status.setUser(res.body.user))
          dispatch(replace('/setting/valid/' + getState().emailValidation.key))
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

export const requestValid = (key) => {
  return async (dispatch, getState) => {
    // 送信済みの場合キャンセル
    if (getState().emailValidation.loading) return
    dispatch(loading(true))
    const path = lib.getAuthPath() + '/user/valid'
    const send = {
      session: lib.getSession(),
      key
    }
    request.post(path, send, (err, res) => {
      if (err) {
        dispatch(Status.windsidUpdate(false))
        dispatch(Status.tokenUpdate(false))
        dispatch(Status.loginUpdate(false))
        dispatch(setErrorMessage('管理者に問い合わせてください'))
        return
      } else {
        // res.body.status はログイン試行の結果
        if (res.body.status) {
          res.body.valid ? dispatch(setValid(true)) : dispatch(setValid(false))
          res.body.err ? dispatch(setError(res.body.err)) : false
          dispatch(Status.setUser(res.body.user))
        } else {
          dispatch(setValid(false))
          dispatch(Status.windsidUpdate(false))
          dispatch(Status.tokenUpdate(false))
          dispatch(Status.loginUpdate(false))
          dispatch(setErrorMessage('ログインできませんでした'))
        }
      }
      dispatch(loading(false))
    })
  }
}

export const requestEmail = () => {
  return async (dispatch, getState) => {
    // 送信済みの場合キャンセル
    if (getState().emailValidation.loading) return
    if (!getState().status.user.email) return
    dispatch(loading(true))
    const path = lib.getAuthPath() + '/api/setting/email'
    const send = {
      session: lib.getSession(),
      text: getState().status.user.email
    }
    request.post(path, send, (err, res) => {
      dispatch(loading(false))
      if (err) return dispatch(showToast('エラーが発生しました'))
      if (res.body.status && res.body.valid) {
        dispatch(getUser())
        dispatch(showToast('確認済みです'))
        return
      }
      if (res.body.status) return dispatch(showToast('確認メールを再送しました'))
    })
  }
}

const setValid = (valid) => ({
  type: prefix + 'SET_VALID',
  payload: { valid }
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

const setError = (err) => ({
  type: prefix + 'SET_ERROR',
  payload: { err }
})

const setErrorMessage = (str) => ({
  type: prefix + 'SET_ERROR_MESSAGE',
  payload: {
    errorMessage: str
  }
})