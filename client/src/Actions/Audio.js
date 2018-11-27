import * as request from '../Library/Request'

export const getPlaylist = (url) => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    dispatch(loadingPlaylist(true))
    const send = {
      id: false
    }
    request.post('/api/presenter', send, (err, res) => {
      if (err) {
        return false
      } else {
        console.log(res.body)
        dispatch(listUpdate(res.body.doc))
      }
      dispatch(listLoading(false))
    })
  }
}

// Call from play demand
export const requestPlayAudio = (src, withPlay) => {
  return async (dispatch) => {
    dispatch(setSrc(src))
    if (withPlay) {
      dispatch(playAudio())
    }
    dispatch(audioStatusUpdate(true))
  }
}
// Call from play demand
export const requestStopAudio = () => {
  return async (dispatch) => {
    dispatch(setSrc(false))
    dispatch(stopAudio())
    dispatch(audioStatusUpdate(false))
  }
}

// Self
export const setSrc = (src) => ({
  type: 'AUDIO_SETSRC',
  payload: {
    src
  }
})

// Self
export const playAudio = () => ({
  type: 'AUDIO_PLAY',
  payload: {
    playRequest: true
  }
})
// Call from play demand
export const stopAudio = () => ({
  type: 'AUDIO_STOP',
  payload: {
    playRequest: false
  }
})

// Call from Audio Component
export const loadingAudio = (status) => ({
  type: 'AUDIO_LOADING',
  payload: {
    loadingAudio: status
  }
})

// Call from Audio Component
export const loadingAudioUpdate = (percent) => ({
  type: 'AUDIO_LOADING_UPDATE',
  payload: {
    loadingAudioPercent: percent
  }
})

// Call from Audio Component
export const audioStatusUpdate = (status) => ({
  type: 'AUDIO_STATUS_UPDATE',
  payload: {
    playStatus: status
  }
})

// Call from Audio Component
export const playUpdate = (current, duration) => {
  const percent = Math.round((current / duration) * 1000) / 10
  return ({
    type: 'AUDIO_PLAY_UPDATE',
    payload: {
      current,
      duration,
      percent
    }
  })
}
