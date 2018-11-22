import * as request from '../Library/Request'

export const getSchedule = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    if (getState().schedule.acquired) return false
    dispatch(loading(true))
    request.post('https://api.winds-n.com/schedule/', {}, (err, res) => {
      if (err) {
        return false
      } else {
        dispatch(update(res.body))
        dispatch(acquired(true))
        // if (res.body.status) {
        //   console.error('Schedule OK')
        //   dispatch(windsidUpdate(window.localStorage.windsid))
        //   dispatch(tokenUpdate(res.body.token))
        //   dispatch(loginUpdate(true))
        // } else {
        //   console.log('Schedule NG')
        //   dispatch(windsidUpdate(false))
        //   dispatch(tokenUpdate(false))
        //   dispatch(loginUpdate(false))
        // }
      }
      dispatch(loading(false))
    })
  }
}

export const update = (data) => ({
  type: 'SCHEDULE_UPDATE',
  payload: {
    data
  }
})

export const acquired = (acquired) => ({
  type: 'SCHEDULE_ACQUIRED',
  payload: {
    acquired
  }
})

export const loading = (loading) => ({
  type: 'SCHEDULE_LOADING',
  payload: {
    loading: loading
  }
})
