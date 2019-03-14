import * as request from '../Library/Request'
import { replace } from 'react-router-redux'
import { version } from '../Library/Library'

import { setUser } from './Status'

// import { listen } from 'react-router-redux'
const prefix = 'SETTING_'

const loading = (loading) => ({
  type: prefix + 'LOADING',
  payload: { loading }
})

// 確認 ここにUserdataの読み込み書けばよいのでは
export const getUser = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
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
          console.log('updateName OK', res.body)
          dispatch(setUser(res.body.user))
        } else {
          console.log('updateName NG')
        }
      }
      dispatch(loading(false))
    })
  }
}

export const setModifyText = (modifyText) => ({
  type: prefix + 'SET_MODIFY_TEXT',
  payload: { modifyText }
})

const loadingModify = (loadingModify) => ({
  type: prefix + 'LOADING_MODIFY',
  payload: { loadingModify }
})

export const updateModifyText = (apiPath, replacePath) => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    dispatch(loadingModify(true))
    const send = {
      text: getState().setting.modifyText,
      userid: window.localStorage.windsid,
      token: window.localStorage.token,
      version
    }
    request.post(apiPath, send, (err, res) => {
      if (err) {
        return false
      } else {
        if (res.body.status) {
          console.log('updateName OK', res.body)
          dispatch(replace(replacePath))
        } else {
          console.log('updateName NG')
        }
      }
      dispatch(loadingModify(false))
    })
  }
}