import * as request from '../Library/Request'
import * as lib from '../Library/Library'

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
    const path = lib.getAppPath() + '/api/practice'
    const send = {
      session: lib.getSession()
    }
    request.post(path, send, (err, res) => {
      if (err) {
        return false
      } else {
        const reverseList = res.body.list.reverse()
        dispatch(setList(reverseList))
        dispatch(showListUpdate(reverseList.slice(0, 10)))
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

export const loadMore = () => {
  return async (dispatch, getState) => {
    const showList = getState().history.showList.concat(getState().history.list.slice(10))
    dispatch(showListUpdate(showList))
  }
}

const showListUpdate = (showList) => ({
  type: prefix + 'SHOW_LIST_UPDATE',
  payload: { showList }
})

const acquired = (acquired) => ({
  type: prefix + 'ACQUIRED',
  payload: { acquired }
})