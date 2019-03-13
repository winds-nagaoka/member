import * as request from '../Library/Request'
import { version } from '../Library/Library'

// import { listen } from 'react-router-redux'
const prefix = 'SETTING_'

const loading = () => ({
  type: prefix + 'LOADING',
  payload: { loading }
})

export const updateName = (name) => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    dispatch(loading(true))
    const send = {
      name,
      userid: window.localStorage.windsid,
      token: window.localStorage.token,
      version
    }
    request.post('https://auth.winds-n.com/setting/name', send, (err, res) => {
      if (err) {
        return false
      } else {
        if (res.body.status) {
          console.log('updateName OK', res.body)
        } else {
          console.log('updateName NG')
        }
      }
      dispatch(loading(false))
    })
  }
}