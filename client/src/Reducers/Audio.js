const initialState = {
  // アーカイブプレイリスト(トラック情報全体)
  loadingArchivePlaylist: false,
  archivePlaylist: undefined,
  archiveBaseUrl: undefined,

  // オーディオタグ本体
  audioRef: undefined,

  // 要素の表示状態

  // プレイヤーの表示状態
  displayPlayer: window.localStorage.displayPlayer ? true : false,
  // プレイリストの表示状態
  displayPlaylist: false,
  // プレイリストが存在するか
  playlistLoad: false,

  // オーディオタグの情報

  // ファイル読み込み状態
  loadingAudio: false,
  loadPercent: undefined,
  // オーディオの再生状態
  playStatus: false,
  // 再生時間
  current: undefined,
  currentTime: undefined,
  duration: undefined,
  durationTime: undefined,
  playPercent: undefined,

  // 曲情報

  // 再生モード => archive
  playmode: undefined,
  // archiveモード時のid
  concertid: undefined,
  // archiveモード時の再生中の曲
  number: undefined,
  album: undefined,
  track: undefined,

  // title: undefined,
}

const prefix = 'AUDIO_'

export default function audioReducer (state = initialState, action) {
  switch (action.type) {
    // アーカイブプレイリスト
    case prefix + 'LOADING_ARCHIVE_PLAYLIST':
      return {
        ...state,
        loadingArchivePlaylist: action.payload.loadingArchivePlaylist
      }
    case prefix + 'SET_ARCHIVE_PLAYLIST':
      return {
        ...state,
        archivePlaylist: action.payload.archivePlaylist,
        archiveBaseUrl: action.payload.archiveBaseUrl,
      }

    // オーディオタグ本体
    case prefix + 'SET_AUDIO_REF':
      return {
        ...state,
        audioRef: action.payload.audioRef
      }

    // 要素の表示状態
    case prefix + 'SET_DISPLAY_PLAYER':
      return {
        ...state,
        displayPlayer: action.payload.displayPlayer
      }
    case prefix + 'SET_DISPLAY_PLAYLIST':
      return {
        ...state,
        displayPlaylist: action.payload.displayPlaylist
      }

    // オーディオタグの情報
    case prefix + 'LOADING_AUDIO':
      return {
        ...state,
        loadingAudio: action.payload.loadingAudio
      }
    case prefix + 'LOADING_UPDATE':
      return {
        ...state,
        loadPercent: action.payload.loadPercent
      }
    case prefix + 'SET_PLAY_STATUS':
      return {
        ...state,
        playStatus: action.payload.playStatus
      }
    case prefix + 'PLAY_UPDATE':
      return {
        ...state,
        current: action.payload.current,
        currentTime: action.payload.currentTime,
        duration: action.payload.duration,
        durationTime: action.payload.durationTime,
        playPercent: action.payload.playPercent
      }
      
    // 曲情報
    case prefix + 'ARCHIVE_SET_PLAY':
      return {
        ...state,
        playmode: action.payload.playmode,
        concertid: action.payload.concertid,
        number: action.payload.number,
        album: action.payload.album,
        track: action.payload.track,
        playlistLoad: action.payload.playlistLoad
      }

    default:
      return state
  }
}
