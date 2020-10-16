import { replace } from 'react-router-redux'

import { navigationMenu } from './Navigation'
import * as request from '../Library/Request'
import * as lib from '../Library/Library'

import { showToast } from './Toast'

// import { listen } from 'react-router-redux'
const prefix = 'STATUS_'

export const loginAuth = (location) => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return dispatch(loginUpdate(false))
    if (getState().status.loading) return false
    dispatch(loading(true))
    const path = lib.getAuthPath() + '/auth'
    const send = {
      session: lib.getSession(),
    }
    request.post(path, send, (err, res) => {
      if (err) {
        dispatch(showToast('ログインエラー'))
        dispatch(replace('/login'))
        return false
      } else {
        if (res.body.status) {
          dispatch(windsidUpdate(window.localStorage.windsid))
          dispatch(tokenUpdate(res.body.token))
          dispatch(loginUpdate(true))
          dispatch(setUser(res.body.user))
          // location ? dispatch(replace(location)) : dispatch(replace('/'))
          location ? dispatch(replace(location)) : false
        } else {
          lib.removeLocalStorage()
          dispatch(windsidUpdate(false))
          dispatch(tokenUpdate(false))
          dispatch(loginUpdate(false))
          dispatch(showToast('ログインしてください'))
        }
      }
      dispatch(loading(false))
    })
  }
}

export const logout = () => {
  return async (dispatch, getState) => {
    if (getState().status.loading) return false
    dispatch(loading(true))
    const path = lib.getAuthPath() + '/logout'
    const send = {
      session: lib.getSession(),
    }
    request.post(path, send, (err) => {
      if (err) {
        dispatch(showToast('ネットワークエラー'))
        dispatch(replace('/login'))
        return false
      } else {
        lib.removeLocalStorage()
        dispatch(showToast('ログアウトしました'))
        dispatch(windsidUpdate(false))
        dispatch(tokenUpdate(false))
        dispatch(loginUpdate(false))
      }
      dispatch(loading(false))
    })
  }
}

export const loginUpdate = (login) => ({
  type: prefix + 'LOGIN',
  payload: { login },
})

export const setUser = (user) => ({
  type: prefix + 'SET_USER',
  payload: { user },
})

export const windsidUpdate = (windsid) => {
  windsid ? window.localStorage.setItem('windsid', windsid) : false
  return {
    type: prefix + 'WINDSID',
    payload: { windsid },
  }
}

export const tokenUpdate = (token) => {
  token ? window.localStorage.setItem('token', token) : false
  return {
    type: prefix + 'TOKEN',
    payload: { token },
  }
}

export const loading = (loading) => ({
  type: prefix + 'LOADING',
  payload: { loading },
})

// export const windowWidthChange = () => {
//   const width = window.innerWidth
//   const pc = width > 920 ? true : false
//   const mobile = !pc
//   return {
//     type: prefix + 'WINDOW_WIDTH',
//     payload: {
//       width,
//       pc,
//       mobile
//     }
//   }
// }

export const windowWidthChange = () => {
  return (dispatch) => {
    const width = window.innerWidth
    const pc = width > 920 ? true : false
    const mobile = !pc
    dispatch(setWidth(width, pc, mobile))
    if (pc) dispatch(navigationMenu(false))
    // return {
    //   type: prefix + 'WINDOW_WIDTH',
    //   payload: {
    //     width,
    //     pc,
    //     mobile
    //   }
    // }
  }
}

export const setWidth = (width, pc, mobile) => ({
  type: prefix + 'WINDOW_WIDTH',
  payload: { width, pc, mobile },
})

export const scrollToTop = () => {
  return (dispatch, getState) => {
    if (getState().status.contentsRef) {
      getState().status.contentsRef.scrollTop = 0
    }
  }
}

export const scrollToTopSmooth = () => {
  return (dispatch, getState) => {
    if (getState().status.contentsRef) {
      getState().status.contentsRef.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    }
  }
}
