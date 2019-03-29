import * as request from '../Library/Request'

export const getManager = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    if (getState().manager.acquired) return false
    dispatch(loading(true))
    request.post('https://api.winds-n.com/manager/', {}, (err, res) => {
      if (err) {
        return false
      } else {
        dispatch(update(res.body))
        dispatch(acquired(true))
      }
      dispatch(loading(false))
    })
  }
}

export const update = (data) => ({
  type: 'MANAGER_UPDATE',
  payload: {
    data
  }
})

export const acquired = (acquired) => ({
  type: 'MANAGER_ACQUIRED',
  payload: {
    acquired
  }
})

export const loading = (loading) => ({
  type: 'MANAGER_LOADING',
  payload: {
    loading: loading
  }
})
