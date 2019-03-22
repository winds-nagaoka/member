import * as request from '../Library/Request'
import { version } from '../Library/Library'

const prefix = 'SCOREBOX_'

const loading = (loading) => ({
  type: prefix + 'LOADING',
  payload: { loading }
})

export const getBoxList = (query) => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    dispatch(loading(true))
    // URL
    // const path = 'https://score.winds-n.com/api/member/box'
    const path = 'http://192.168.1.22:3011/api/member/box'
    const send = {
      userid: window.localStorage.windsid,
      token: window.localStorage.token,
      version,
      member: true
    }
    request.post(path, send, (err, res) => {
      if (err) {
        return false
      } else {
        if (res.body.status) {
          dispatch(setBoxList(res.body.list))  
        }
      }
      dispatch(loading(false))
    })
  }
}

const setBoxList = (boxList) => ({
  type: prefix + 'SET_BOX_LIST',
  payload: { boxList }
})