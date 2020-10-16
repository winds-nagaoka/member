import * as request from '../Library/Request'
import * as lib from '../Library/Library'

export const getSchedule = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    if (getState().schedule.acquired) return false
    dispatch(loading(true))
    const path = lib.getApiPath() + '/schedule/'
    request.post(path, {}, (err, res) => {
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
  type: 'SCHEDULE_UPDATE',
  payload: {
    data,
  },
})

export const acquired = (acquired) => ({
  type: 'SCHEDULE_ACQUIRED',
  payload: {
    acquired,
  },
})

export const loading = (loading) => ({
  type: 'SCHEDULE_LOADING',
  payload: {
    loading: loading,
  },
})
