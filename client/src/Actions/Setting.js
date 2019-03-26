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

const loadingDeleteEmailRequest = (loadingDeleteEmailRequest) => ({
  type: prefix + 'LOADING_DELETE_EMAIL_REQUEST',
  payload: { loadingDeleteEmailRequest }
})

export const deleteEmailRequest = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    dispatch(loadingDeleteEmailRequest(true))
    const path = 'https://auth.winds-n.com/api/setting/email'
    const send = {
      // ここで空にする(この値が保存される)
      text: '',
      userid: window.localStorage.windsid,
      token: window.localStorage.token,
      delMail: true,
      version
    }
    request.post(path, send, (err, res) => {
      if (err) {
        return false
      } else {
        if (res.body.status) {
          dispatch(replace('/setting'))
        }
      }
      dispatch(loadingDeleteEmailRequest(false))
    })
  }
}

// Password
export const setOldPassword = (oldPassword) => ({
  type: prefix + 'SET_OLD_PASSWORD',
  payload: { oldPassword }
})

export const setNewPassword = (newPassword) => ({
  type: prefix + 'SET_NEW_PASSWORD',
  payload: { newPassword }
})

const loadingUpdatePassword = (loadingUpdatePassword) => ({
  type: prefix + 'LOADING_UPDATE_PASSWORD',
  payload: { loadingUpdatePassword }
})

export const updatePassword = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    dispatch(loadingUpdatePassword(true))
    const path = 'https://auth.winds-n.com/api/setting/password'
    const send = {
      userid: window.localStorage.windsid,
      token: window.localStorage.token,
      old: getState().setting.oldPassword,
      new: getState().setting.newPassword,
      version
    }
    request.post(path, send, (err, res) => {
      if (err) {
        return false
      } else {
        if (res.body.status) {
          dispatch(replace('/setting'))
        }
        dispatch(setOldPassword(''))
        dispatch(setNewPassword(''))
      }
      dispatch(loadingUpdatePassword(false))
    })
  }
}

// Score Setting
export const setScoreAdminRequestPass = (scoreAdminRequestPass) => ({
  type: prefix + 'SET_SCORE_ADMIN_REQUEST_PASS',
  payload: { scoreAdminRequestPass }
})

const loadingScoreAdminRequest = (loadingScoreAdminRequest) => ({
  type: prefix + 'LOADING_SCORE_ADMIN_REQUEST',
  payload: { loadingScoreAdminRequest }
})

export const sendScoreAdminRequest = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    dispatch(loadingScoreAdminRequest(true))
    const adminRequest = 'scoreAdmin' in getState().status.user ? !getState().status.user.scoreAdmin : false
    // if (!adminRequest && getState().setting.scoreAdminRequestPass === '') return false
    const path = 'https://auth.winds-n.com/api/setting/score/admin'
    const send = {
      userid: window.localStorage.windsid,
      token: window.localStorage.token,
      admin: adminRequest,
      pass: getState().setting.scoreAdminRequestPass,
      version
    }
    request.post(path, send, (err, res) => {
      if (err) {
        return false
      } else {
        if (res.body.status) {
          dispatch(setScoreAdminRequestPass(''))
          if (!res.body.error) dispatch(replace('/setting'))
        } else {
        }
      }
      dispatch(loadingScoreAdminRequest(false))
    })
  }
}

const loadingScoreCount = (loadingScoreCount) => ({
  type: prefix + 'LOADING_SCORE_COUNT',
  payload: { loadingScoreCount }
})

export const getScoreCount = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    dispatch(loadingScoreCount(true))
    const path = 'https://score.winds-n.com/api/member/count'
    const send = {
      userid: window.localStorage.windsid,
      token: window.localStorage.token,
      member: true,
      version
    }
    request.post(path, send, (err, res) => {
      if (err) {
        return false
      } else {
        if (res.body.status) {
          dispatch(setScoreCount(res.body.count))
        }  
      }
      dispatch(loadingScoreCount(false))
    })
  }
}

const setScoreCount = (scoreCount) => ({
  type: prefix + 'SET_SCORE_COUNT',
  payload: { scoreCount }
})

const loadingScoreMailRequest = (loadingScoreMailRequest) => ({
  type: prefix + 'LOADING_SCORE_MAIL_REQUEST',
  payload: { loadingScoreMailRequest }
})

export const scoreMailRequest = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    console.log('メール送信')
    dispatch(loadingScoreMailRequest(true))
    const name = 'name' in getState().status.user ? getState().status.user.name : 'ウィンズユーザー'
    const email = 'email' in getState().status.user ? getState().status.user.email : false
    if (!email) return false
    const path = 'https://score.winds-n.com/api/member/sendmail'
    const send = {
      userid: window.localStorage.windsid,
      token: window.localStorage.token,
      to: email,
      name: getState().status.user.name,
      subject: 'ウィンズスコア',
      body: 'ウィンズが保管している楽譜データをお送りします。\r\n'
          + 'CSV形式で記録されています。\r\n'
          + '直接Excelで開くと文字化けするため\r\n'
          + '一度Googleスプレッドシードなどで開き\r\n'
          + '上書き保存してからご利用ください。\r\n',
      member: true,
      version
    }
    request.post(path, send, (err, res) => {
      if (err) {
        return false
      } else {
        if (res.body.status) {
          // if (!res.body.error) dispatch(replace('/setting'))
        }
      }
      dispatch(loadingScoreMailRequest(false))
    })
  }
}