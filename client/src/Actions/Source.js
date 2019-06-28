import * as request from '../Library/Request'
import * as lib from '../Library/Library'

const prefix = 'SOURCE_'

const loading = (loading) => ({
  type: prefix + 'LOADING',
  payload: { loading }
})

export const getSource = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    if (getState().source.acquired) return false
    dispatch(loading(true))
    const path = lib.getAppPath() + '/api/source'
    const send = {
      session: lib.getSession()
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