import { replace } from 'react-router-redux'

import { navigationMenu } from './Navigation'
import * as request from '../Library/Request'
import { version } from '../Library/Library'

// import { listen } from 'react-router-redux'

export const loginAuth = (location) => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return dispatch(loginUpdate(false))
    if(getState().status.loading) return false
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
          console.log('Auth OK')
          dispatch(windsidUpdate(window.localStorage.windsid))
          dispatch(tokenUpdate(res.body.token))
          dispatch(loginUpdate(true))
          dispatch(replace(location))
        } else {
          console.log('Auth NG')
          dispatch(windsidUpdate(false))
          dispatch(tokenUpdate(false))
          dispatch(loginUpdate(false))
        }
      }
      dispatch(loading(false))
    })
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.clear()
    dispatch(windsidUpdate(false))
    dispatch(tokenUpdate(false))
    dispatch(loginUpdate(false))
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

// export const windowWidthChange = () => {
//   const width = window.innerWidth
//   const pc = width > 960 ? true : false
//   const mobile = !pc
//   return {
//     type: 'STATUS_WINDOW_WIDTH',
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
    const pc = width > 960 ? true : false
    const mobile = !pc
    dispatch(setWidth(width, pc, mobile))
    if (pc) dispatch(navigationMenu(false))
    // return {
    //   type: 'STATUS_WINDOW_WIDTH',
    //   payload: {
    //     width,
    //     pc,
    //     mobile
    //   }
    // }
  }
}

export const setWidth = (width, pc, mobile) => ({
  type: 'STATUS_WINDOW_WIDTH',
  payload: {
    width,
    pc,
    mobile
  }
})

export const setContentsRef = (contentsRef) => ({
  type: 'STATUS_SET_CONTENTS_REF',
  payload: { contentsRef }
})

export const scrollToTop = () => {
  return (dispatch, getState) => {
    // if (getState().status.contentsRef) getState().status.contentsRef.scrollTop = 0
    if (getState().status.contentsRef) {
      getState().status.contentsRef.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth'
      })
    } 
  }
}