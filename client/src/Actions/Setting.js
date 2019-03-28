import * as request from '../Library/Request'
import { replace } from 'react-router-redux'
import { version } from '../Library/Library'
import { showToast } from './Toast'

import { setUser, logout } from './Status'

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
          console.log('getUser OK', res.body)
          dispatch(setUser(res.body.user))
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
          console.log('updateModifyText OK', res.body)
          dispatch(replace(replacePath))
          dispatch(showToast('変更しました'))
        } else {
          dispatch(showToast('入力した内容を確認してください'))
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
          dispatch(showToast('メールアドレスを削除しました'))
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
          dispatch(showToast('パスワードを変更しました'))
        } else {
          dispatch(showToast('古いパスワードを確認してください'))
        }
        dispatch(setOldPassword(''))
        dispatch(setNewPassword(''))
      }
      dispatch(loadingUpdatePassword(false))
    })
  }
}

// Delete Account
export const setDeletePassword = (deletePassword) => ({
  type: prefix + 'SET_DELETE_PASSWORD',
  payload: { deletePassword }
})

const loadingDeleteAccount = (loadingDeleteAccount) => ({
  type: prefix + 'LOADING_DELETE_ACCOUNT',
  payload: { loadingDeleteAccount }
})

export const sendDeleteRequest = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    dispatch(loadingDeleteAccount(true))
    const path = 'https://auth.winds-n.com/api/setting/delete'
    const send = {
      userid: window.localStorage.windsid,
      token: window.localStorage.token,
      pass: getState().setting.deletePassword,
      version
    }
    request.post(path, send, (err, res) => {
      if (err) {
        return false
      } else {
        if (res.body.status) {
          // dispatch(replace('/setting'))
          // ここでログアウト処理
          dispatch(logout())
        } else {
          dispatch(showToast('パスワードを確認してください'))
        }
        dispatch(setDeletePassword(''))
      }
      dispatch(loadingDeleteAccount(false))
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
    const adminRequest = 'scoreAdmin' in getState().status.user ? !getState().status.user.scoreAdmin : true
    // if (!adminRequest && getState().setting.scoreAdminRequestPass === '') return false
    console.log('管理者Request', adminRequest)
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
          if (!res.body.error) {
            dispatch(replace('/setting'))
            res.body.admin ? dispatch(showToast('楽譜管理者になりました')) : dispatch(showToast('楽譜管理者を辞めました'))
          } else {
            dispatch(showToast('管理者パスワードが違います'))
          }
        }
      }
      dispatch(setScoreAdminRequestPass(''))
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
          dispatch(showToast('メールを送信しました'))
        }
      }
      dispatch(loadingScoreMailRequest(false))
    })
  }
}