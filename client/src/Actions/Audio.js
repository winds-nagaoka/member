import * as request from '../Library/Request'
import * as lib from '../Library/Library'
import { playTime, version } from '../Library/Library'

import * as libArchive from '../Component/Auth/Archive/Library/Library'
import * as libPractice from '../Component/Auth/Practice/Library/Library'
import * as libSource from '../Component/Auth/Practice/Source/Library/Library'

const prefix = 'AUDIO_'

// アーカイブプレイリストの読み込み
export const loadArchivePlaylist = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    if (getState().audio.archivePlaylist) return false
    dispatch(loadingArchivePlaylist(true))
    const path = lib.getAppPath() + '/api/audio'
    const send = {
      session: lib.getSession()
    }
    request.post(path, send, (err, res) => {
      if (err) {
        return false
      } else {
        if (res.body.status) {
          dispatch(setArchivePlaylist(res.body.list, res.body.url))
        }
      }
      dispatch(loadingArchivePlaylist(false))
    })
  }
}

const loadingArchivePlaylist = (loadingArchivePlaylist) => ({
  type: prefix + 'LOADING_ARCHIVE_PLAYLIST',
  payload: { loadingArchivePlaylist }
})

const setArchivePlaylist = (archivePlaylist, archiveBaseUrl) => ({
  type: prefix + 'SET_ARCHIVE_PLAYLIST',
  payload: { archivePlaylist, archiveBaseUrl }
})

// 練習記録プレイリストの読み込み
export const loadPracticePlaylist = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    if (getState().audio.practicePlaylist) return false
    dispatch(loadingPracticePlaylist(true))
    const path = lib.getAppPath() + '/api/record'
    const send = {
      session: lib.getSession()
    }
    request.post(path, send, (err, res) => {
      if (err) {
        return false
      } else {
        if (res.body.status) {
          dispatch(setPracticePlaylist(res.body.list, res.body.url))
        }
      }
      dispatch(loadingPracticePlaylist(false))
    })
  }
}

const loadingPracticePlaylist = (loadingPracticePlaylist) => ({
  type: prefix + 'LOADING_PRACTICE_PLAYLIST',
  payload: { loadingPracticePlaylist }
})

const setPracticePlaylist = (practicePlaylist, practiceBaseUrl) => ({
  type: prefix + 'SET_PRACTICE_PLAYLIST',
  payload: { practicePlaylist, practiceBaseUrl }
})

// 参考音源プレイリストの読み込み
export const loadSourcePlaylist = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    if (getState().audio.sourcePlaylist) return false
    dispatch(loadingSourcePlaylist(true))
    const path = lib.getAppPath() + '/api/reference'
    const send = {
      session: lib.getSession()
    }
    request.post(path, send, (err, res) => {
      if (err) {
        return false
      } else {
        if (res.body.status) {
          if (res.body.list.length === 0) {
            dispatch(closePlayer())
          } else {
            dispatch(setSourcePlaylist(res.body.list, res.body.url))
          }
        }
      }
      dispatch(loadingSourcePlaylist(false))
    })
  }
}

const loadingSourcePlaylist = (loadingSourcePlaylist) => ({
  type: prefix + 'LOADING_SOURCE_PLAYLIST',
  payload: { loadingSourcePlaylist }
})

const setSourcePlaylist = (sourcePlaylist, sourceBaseUrl) => ({
  type: prefix + 'SET_SOURCE_PLAYLIST',
  payload: { sourcePlaylist, sourceBaseUrl }
})

// オーディオタグ本体
export const setAudioRef = (audioRef) => ({
  type: prefix + 'SET_AUDIO_REF',
  payload: { audioRef }
})

// 要素の表示状態

// プレイヤーの表示設定
export const setDisplayPlayer = (displayPlayer) => {
  displayPlayer ? window.localStorage.setItem('displayPlayer', displayPlayer) : window.localStorage.removeItem('displayPlayer')
  return ({
    type: prefix + 'SET_DISPLAY_PLAYER',
    payload: { displayPlayer }
  })
}

// プレイリストを開く
export const setDisplayPlaylist = (displayPlaylist) => ({
  type: prefix + 'SET_DISPLAY_PLAYLIST',
  payload: { displayPlaylist }
})

// オーディオタグの情報

// ファイルの読み込みフラグ
export const setLoadingAudio = (status) => ({
  type: prefix + 'LOADING_AUDIO',
  payload: { loadingAudio: status }
})

// ファイルの読み込み量更新
export const loadPercentUpdate = (percent) => ({
  type: prefix + 'LOADING_UPDATE',
  payload: { loadPercent: percent }
})

const setPlayStatus = (playStatus) => ({
  type: prefix + 'SET_PLAY_STATUS',
  payload: { playStatus }
})

// 再生時間の更新
export const playUpdate = (current, duration) => {
  const playPercent = (duration && current) ? Math.round((current / duration) * 1000) / 10 : undefined
  const currentTime = current ? playTime(Math.floor(current)) : undefined
  const durationTime = duration ? playTime(Math.round(duration)) : undefined
  return ({
    type: prefix + 'PLAY_UPDATE',
    payload: {
      current,
      currentTime,
      duration,
      durationTime,
      playPercent
    }
  })
}

// 曲情報

// アーカイブから曲を選択
export const archivePlayRequest = (concertid, number, playRequest) => {
  return async (dispatch, getState) => {
    // プレイヤーを表示
    !getState().audio.displayPlayer ? dispatch(setDisplayPlayer(true)) : false
    // 練習記録側は削除
    dispatch(practiceSetPlayBase(undefined, undefined, undefined))
    // 再生する曲情報
    dispatch(archiveSetPlayBase(concertid, number))
    // localStorageの記録更新
    dispatch(removePracticeStorage())
    dispatch(removeSourceStorage())
    window.localStorage.setItem('playerConcertid', concertid)
    window.localStorage.setItem('playerNumber', number)
    // 曲を再生
    playRequest ? dispatch(audioPlay()) : false
    // 再生フラグをリセット
    dispatch(setCountFlag(true))
  }
}

// 再生する曲情報を設定
const archiveSetPlayBase = (concertid, number) => {
  return ({
    type: prefix + 'ARCHIVE_SET_PLAY_BASE',
    payload: { playmode: 'archive', concertid, number }
  })
}

// 練習記録から曲を選択
export const practicePlayRequest = (practiceid, fileNumber, requestTimeString, playRequest) => {
  return async (dispatch, getState) => {
    // プレイヤーを表示
    !getState().audio.displayPlayer ? dispatch(setDisplayPlayer(true)) : false
    const requestTime = libPractice.timeSecond(requestTimeString)
    // アーカイブ側は削除
    dispatch(archiveSetPlayBase(undefined, undefined))
    // 再生する曲情報
    dispatch(practiceSetPlayBase(practiceid, fileNumber, requestTime))
    // localStorageの記録更新
    dispatch(removeArchiveStorage())
    dispatch(removeSourceStorage())
    window.localStorage.setItem('playerPracticeid', practiceid)
    window.localStorage.setItem('playerPracticeFile', fileNumber)
    // 曲を再生
    playRequest ? dispatch(audioPlay(requestTime)) : false
    // 再生フラグをリセット
    dispatch(setCountFlag(true))
  }
}

// 再生する曲情報を設定
const practiceSetPlayBase = (practiceid, fileNumber, requestTime) => {
  return ({
    type: prefix + 'PRACTICE_SET_PLAY_BASE',
    payload: { playmode: 'practice', practiceid, fileNumber, requestTime }
  })
}

// 参考音源から曲を選択
export const sourcePlayRequest = (sourceid, sourceNumber, playRequest) => {
  return async (dispatch, getState) => {
    // プレイヤーを表示
    !getState().audio.displayPlayer ? dispatch(setDisplayPlayer(true)) : false
    // アーカイブ側は削除
    dispatch(archiveSetPlayBase(undefined, undefined))
    // 再生する曲情報
    dispatch(sourceSetPlayBase(sourceid, sourceNumber))
    // localStorageの記録更新
    dispatch(removeArchiveStorage())
    dispatch(removePracticeStorage())
    window.localStorage.setItem('playerSourceid', sourceid)
    window.localStorage.setItem('playerSourceNumber', sourceNumber)
    // 曲を再生
    playRequest ? dispatch(audioPlay()) : false
    // 再生フラグをリセット
    dispatch(setCountFlag(true))
  }
}

// 再生する曲情報を設定
const sourceSetPlayBase = (sourceid, sourceNumber) => {
  return ({
    type: prefix + 'SOURCE_SET_PLAY_BASE',
    payload: { playmode: 'source', sourceid, sourceNumber }
  })
}

const removeArchiveStorage = () => {
  return async () => {
    window.localStorage.removeItem('playerConcertid')
    window.localStorage.removeItem('playerNumber')
  }
}
const removePracticeStorage = () => {
  return async () => {
    window.localStorage.removeItem('playerPracticeid')
    window.localStorage.removeItem('playerPracticeFile')
  }
}
const removeSourceStorage = () => {
  return async () => {
    window.localStorage.removeItem('playerSourceid')
    window.localStorage.removeItem('playerSourceNumber')
  }
}

// オーディオタグの操作

// 再生・一時停止ボタン
export const audioPlay = (requestTime) => {
  return async (dispatch, getState) => {
    if (getState().audio.playmode === 'archive') {
      if (!getState().archive.concertList) return false
      if (!getState().audio.archivePlaylist) return false
      const album = libArchive.getAlbum(getState().audio.concertid, getState().audio.archivePlaylist)
      const track = album.list[getState().audio.number]
      // dispatch(archiveSetPlay(album, track, true))
      // タグに反映
      if (!getState().audio.audioRef.src || getState().audio.audioRef.src !== getState().audio.archiveBaseUrl + album.baseSrc + track.path) {
        getState().audio.audioRef.src = getState().audio.archiveBaseUrl + album.baseSrc + track.path
      }
      // 曲が指定されていないとき
      if (isNaN(getState().audio.number)) {
        if (getState().audio.displayPlaylist) {
          return // Actions.toastShow('曲を選択してください')
        } else {
          if (getState().audio.playlistLoad) {
            return dispatch(setDisplayPlaylist(true))
          } else {
            return
          }
        }
      }
    } else if (getState().audio.playmode === 'practice') {
      if (!getState().history.list) return false
      if (!getState().audio.practicePlaylist) return false
      const practiceAlbum = libPractice.getPracticeAlbum(getState().audio.practiceid, getState().audio.practicePlaylist)
      const file = practiceAlbum.file[getState().audio.fileNumber]
      // dispatch(practiceSetPlay(practiceAlbum, file, true))
      // タグに反映
      if (!getState().audio.audioRef.src || getState().audio.audioRef.src !== getState().audio.practiceBaseUrl + practiceAlbum.directory + file.path) {
        getState().audio.audioRef.src = getState().audio.practiceBaseUrl + practiceAlbum.directory + file.path
      }
      if (isFinite(requestTime)) getState().audio.audioRef.currentTime = requestTime
    } else if (getState().audio.playmode === 'source') {
      if (!getState().source.list) return false
      if (!getState().audio.sourcePlaylist) return false
      const album = libSource.getAlbum(getState().audio.sourceid, getState().audio.sourcePlaylist)
      const track = album.list[getState().audio.sourceNumber]
      // タグに反映
      if (!getState().audio.audioRef.src || getState().audio.audioRef.src !== getState().audio.sourceBaseUrl + album.baseSrc + track.path) {
        getState().audio.audioRef.src = getState().audio.sourceBaseUrl + album.baseSrc + track.path
      }
      // 曲が指定されていないとき
      if (isNaN(getState().audio.sourceNumber)) {
        if (getState().audio.displayPlaylist) {
          return // Actions.toastShow('曲を選択してください')
        } else {
          if (getState().audio.playlistLoad) {
            return dispatch(setDisplayPlaylist(true))
          } else {
            return
          }
        }
      }
    }
    dispatch(audioStart())
  }
}

const audioStart = () => {
  return async (dispatch, getState) => {
    if (getState().audio.audioRef) {
      if (getState().audio.audioRef.paused) {
        getState().audio.audioRef.play()
        dispatch(setPlayStatus(true))
      }
    }
  }
}

export const audioPause = () => {
  return async (dispatch, getState) => {
    if (getState().audio.audioRef) {
      if (!getState().audio.audioRef.paused) {
        getState().audio.audioRef.pause()
        dispatch(setPlayStatus(false))
      }
    }
  }
}

export const audioStop = (button) => {
  return async (dispatch, getState) => {
    if (!getState().audio.current) {
      dispatch(setDisplayPlaylist(false))
      dispatch(setDisplayPlayer(false))
      if (button) {
        dispatch(removeArchiveStorage())
        dispatch(removePracticeStorage())
        dispatch(removeSourceStorage())
        window.localStorage.removeItem('displayPlayer')
      }
    }
    getState().audio.audioRef.pause()
    getState().audio.audioRef.currentTime = 0
    dispatch(setPlayStatus(false))
  }
}

export const audioBackward = () => {
  return async (dispatch, getState) => {
    getState().audio.audioRef.currentTime = getState().audio.audioRef.currentTime - 10
  }
}

export const audioForward = () => {
  return async (dispatch, getState) => {
    getState().audio.audioRef.currentTime = getState().audio.audioRef.currentTime + 10
  }
}

export const closePlayer = () => {
  return async (dispatch, getState) => {
    dispatch(audioStop())
    dispatch(setDisplayPlayer(false))
    dispatch(removeArchiveStorage())
    dispatch(removePracticeStorage())
    dispatch(removeSourceStorage())
  }
}

export const countUp = () => {
  return async (dispatch, getState) => {
    const play = {
      session: lib.getSession(),
      play: getState().audio.audioRef.src + '(' + getState().audio.currentTime + ')',
    }
    request.countUp(play)
    dispatch(setCountFlag(false))
  }
}

export const countPlay = (time) => {
  return async (dispatch, getState) => {
    const seek = {
      session: lib.getSession(),
      seek: getState().audio.audioRef.src + '(' + lib.playTime(time) + ')',
    }
    request.sendSeek(seek)
  }
}

const setCountFlag = (countFlag) => ({
  type: prefix + 'SET_COUNT_FLAG',
  payload: { countFlag }
})