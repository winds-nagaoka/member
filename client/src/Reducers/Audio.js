const initialState = {
  // アーカイブプレイリスト(トラック情報全体)
  loadingArchivePlaylist: false,
  archivePlaylist: undefined,
  archiveBaseUrl: undefined,

  // 練習記録プレイリスト
  loadingPracticePlaylist: false,
  practicePlaylist: undefined,
  practiceBaseUrl: undefined,

  // 参考音源プレイリスト
  loadingSourcePlaylist: false,
  sourcePlaylist: undefined,
  sourceBaseUrl: undefined,

  // オーディオタグ本体
  audioRef: undefined,

  // 要素の表示状態

  // プレイヤーの表示状態
  displayPlayer: window.localStorage.displayPlayer === 'true' ? true : false,
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

  // 再生モード => archive, practice
  playmode: undefined,

  // アーカイブモード
  concertid: undefined,
  number: undefined,
  // album: undefined,
  // track: undefined,

  // 練習記録モード
  practiceid: undefined,
  fileNumber: undefined,
  requestTime: undefined,
  // practiceAlbum: undefined,
  // file: undefined,

  // 参考音源モード
  sourceid: undefined,
  sourceNumber: undefined,

  countFlag: true
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

    // 練習記録プレイリスト
    case prefix + 'LOADING_PRACTICE_PLAYLIST':
      return {
        ...state,
        loadingPracticePlaylist: action.payload.loadingPracticePlaylist
      }
    case prefix + 'SET_PRACTICE_PLAYLIST':
      return {
        ...state,
        practicePlaylist: action.payload.practicePlaylist,
        practiceBaseUrl: action.payload.practiceBaseUrl,
      }

    // 参考音源プレイリスト
    case prefix + 'LOADING_SOURCE_PLAYLIST':
      return {
        ...state,
        loadingSourcePlaylist: action.payload.loadingSourcePlaylist
      }
    case prefix + 'SET_SOURCE_PLAYLIST':
      return {
        ...state,
        sourcePlaylist: action.payload.sourcePlaylist,
        sourceBaseUrl: action.payload.sourceBaseUrl,
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
    case prefix + 'ARCHIVE_SET_PLAY_BASE':
      return {
        ...state,
        playmode: action.payload.playmode,
        concertid: action.payload.concertid,
        number: action.payload.number,
        // album: action.payload.album,
        // track: action.payload.track,
        // playlistLoad: action.payload.playlistLoad
      }
    // case prefix + 'ARCHIVE_SET_PLAY':
    //   return {
    //     ...state,
    //     // playmode: action.payload.playmode,
    //     // concertid: action.payload.concertid,
    //     // number: action.payload.number,
    //     album: action.payload.album,
    //     track: action.payload.track,
    //     playlistLoad: action.payload.playlistLoad
    //   }
            
    // 曲情報
    case prefix + 'PRACTICE_SET_PLAY_BASE':
      return {
        ...state,
        playmode: action.payload.playmode,
        practiceid: action.payload.practiceid,
        fileNumber: action.payload.fileNumber,
        requestTime: action.payload.requestTime
      }
    // case prefix + 'PRACTICE_SET_PLAY':
    //   return {
    //     ...state,
    //     // playmode: action.payload.playmode,
    //     // concertid: action.payload.concertid,
    //     // number: action.payload.number,
    //     practiceAlbum: action.payload.practiceAlbum,
    //     file: action.payload.file,
    //     playlistLoad: action.payload.playlistLoad
    //   }

    // 曲情報
    case prefix + 'SOURCE_SET_PLAY_BASE':
      return {
        ...state,
        playmode: action.payload.playmode,
        sourceid: action.payload.sourceid,
        sourceNumber: action.payload.sourceNumber
      }

    case prefix + 'SET_COUNT_FLAG':
      return {
        ...state,
        countFlag: action.payload.countFlag
      }

    default:
      return state
  }
}
