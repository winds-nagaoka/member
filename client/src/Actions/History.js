import * as request from '../Library/Request'
import { version } from '../Library/Library'

const prefix = 'HISTORY_'

const loading = (loading) => ({
  type: prefix + 'LOADING',
  payload: { loading }
})

export const getHistory = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    if (getState().history.acquired) return false
    dispatch(loading(true))
    const path = 'https://app.winds-n.com/api/practice'
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
        dispatch(setList(res.body.list))
        dispatch(acquired(true))
      }
      dispatch(loading(false))
    })
  }
}

const setList = (list) => ({
  type: prefix + 'SET_LIST',
  payload: { list }
})

const acquired = (acquired) => ({
  type: prefix + 'ACQUIRED',
  payload: { acquired }
})