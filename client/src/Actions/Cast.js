import * as request from '../Library/Request'

export const getList = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    dispatch(listLoading(true))
    const path = 'https://cast.winds-n.com/api/presenter'
    const send = {
      id: getState().socket.id
    }
    request.post(path, send, (err, res) => {
      if (err) {
        return false
      } else {
        dispatch(listUpdate(res.body.doc))
      }
      dispatch(listLoading(false))
    })
  }
}

export const listLoading = (loadingList) => ({
  type: 'CAST_LIST_LOADING',
  payload: {
    loadingList
  }
})

export const listUpdate = (list) => ({
  type: 'CAST_LIST_UPDATE',
  payload: {
    list
  }
})

export const createPC = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    // if (getState().bbs.acquired) return false
    dispatch(loading(true))

  }
}

export const update = (status) => ({
  type: 'CAST_UPDATE',
  payload: {
    status
  }
})

export const loading = (loading) => ({
  type: 'CAST_LOADING',
  payload: {
    loading: loading
  }
})
