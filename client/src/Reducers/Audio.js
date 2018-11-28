const initialState = {
  loadingAudio: false,
  loadingAudioPercent: undefined,
  src: false,
  // meta: false,
  playRequest: false,
  playStatus: false,
  playing: false,
  current: undefined,
  currentText: undefined,
  duration: undefined,
  durationText: undefined,
  percent: undefined,

  loadingPlaylist: false,
  playlist: [],
}

export default function audioReducer (state = initialState, action) {
  switch (action.type) {
    case 'AUDIO_LOADING':
      return {
        ...state,
        loadingAudio: action.payload.loadingAudio
      }
    case 'AUDIO_LOADING_UPDATE':
      return {
        ...state,
        loadingAudioPercent: action.payload.loadingAudioPercent
      }
    case 'AUDIO_SETSRC':
      return {
        ...state,
        src: action.payload.src
      }
    case 'AUDIO_PLAY':
      return {
        ...state,
        playRequest: action.payload.playRequest,
      }
    case 'AUDIO_STOP':
      return {
        ...state,
        playRequest: action.payload.playRequest
      }
    // case 'AUDIO_PLAYING':
    //   return {
    //     ...state,
    //     playing: action.payload.playing
    //   }
    case 'AUDIO_PLAY_UPDATE':
      return {
        ...state,
        current: action.payload.current,
        currentText: action.payload.currentText,
        duration: action.payload.duration,
        durationText: action.payload.durationText,
        percent: action.payload.percent
      }
    // case 'AUDIO_PLAYLIST':
    //   return {
    //     ...state,
    //     playlist: action.payload.playlist
    //   }
    case 'AUDIO_STATUS_UPDATE':
      return {
        ...state,
        playStatus: action.payload.playStatus
      }
    default:
      return state
  }
}
