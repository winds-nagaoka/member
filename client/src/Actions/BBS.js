import * as request from '../Library/Request'

export const getBBSList = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    if (getState().bbs.acquired) return false
    dispatch(loading(true))
    request.post('https://api.winds-n.com/bbs/', {}, (err, res) => {
      if (err) {
        return false
      } else {
        console.log(res.body)
        dispatch(update(res.body))
        dispatch(acquired(true))
      }
      dispatch(loading(false))
    })
  }
}

export const update = (data) => ({
  type: 'BBS_UPDATE',
  payload: {
    data
  }
})

export const acquired = (acquired) => ({
  type: 'BBS_ACQUIRED',
  payload: {
    acquired
  }
})

export const loading = (loading) => ({
  type: 'BBS_LOADING',
  payload: {
    loading: loading
  }
})
