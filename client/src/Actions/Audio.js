import * as request from '../Library/Request'
import { playTime, version } from '../Library/Library'

import * as libArchive from '../Component/Auth/Archive/Library/Library'

const prefix = 'AUDIO_'

// 曲リストの読み込み
export const loadArchivePlaylist = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    if (getState().audio.archivePlaylist) return false
    dispatch(loadingArchivePlaylist(true))
    const path = 'https://archive.winds-n.com/api/audio'
    const send = {
      userid: window.localStorage.windsid,
      token: window.localStorage.token,
      version,
      member: true
    }
    request.post(path, send, (err, res) => {
      if (err) {
        return false
      } else {
        if (res.body.status) {
          console.log('archive', res.body)
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

// オーディオタグ本体
export const setAudioRef = (audioRef) => ({
  type: prefix + 'SET_AUDIO_REF',
  payload: { audioRef }
})

// 要素の表示状態

// プレイヤーの表示設定
const setDisplayPlayer = (displayPlayer) => {
  window.localStorage.setItem('displayPlayer', displayPlayer)
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
export const loadingAudio = (status) => ({
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
    // 曲を再生
    dispatch(archivePlay(concertid, number, playRequest))
  }
}

// 曲を再生
const archivePlay = (concertid, number, playRequest) => {
  return async (dispatch, getState) => {
    if (!getState().archive.concertList) return false
    if (!getState().audio.archivePlaylist) return false
    console.log(libArchive.getMediaData(concertid, number, getState().archive.concertList))
    const album = libArchive.getAlbum(concertid, getState().audio.archivePlaylist)
    const track = album.list[number]
    console.log('album, track', album, track)
    // audioへ設定
    dispatch(archiveSetPlay(concertid, number, album, track, true))
    // タグに反映
    getState().audio.audioRef.src = getState().audio.archiveBaseUrl + album.baseSrc + track.path
    // getState().audio.audioRef.play()
    playRequest ? dispatch(audioPlay()) : false
  }
}

// 再生する曲情報を設定
const archiveSetPlay = (concertid, number, album, track, playlistLoad) => {
  window.localStorage.setItem('playerConcertid', concertid)
  window.localStorage.setItem('playerNumber', number)
  return ({
    type: prefix + 'ARCHIVE_SET_PLAY',
    payload: { 
      playmode: 'archive', concertid, number, album, track, playlistLoad
    }
  })
}

// オーディオタグの操作

// 再生・一時停止ボタン
export const audioPlay = (e) => {
  if (e) e.preventDefault(e)
  return async (dispatch, getState) => {
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
    dispatch(audioStart())
  }
}

const audioStart = () => {
  return async (dispatch, getState) => {
    if (getState().audio.audioRef.paused) {
      getState().audio.audioRef.play()
      dispatch(setPlayStatus(true))
    }
  }
}

export const audioPause = (e) => {
  if (e) e.preventDefault()
  return async (dispatch, getState) => {
    if (!getState().audio.audioRef.paused) {
      getState().audio.audioRef.pause()
      dispatch(setPlayStatus(false))
    }  
  }
}

export const audioStop = (e) => {
  if (e) e.preventDefault()
  return async (dispatch, getState) => {
    if (getState().audio.current) {
      getState().audio.audioRef.pause()
      getState().audio.audioRef.currentTime = 0
      dispatch(setPlayStatus(false))
      // this.setState({
      //   loadAudio: true,
      //   playStatus: false,
      //   currentTime: 0,
      // })
    } else {
      // リセット処理がここに追加されるはず
      // if (this.state.closeCount) {
      //   this.listClose()
      //   this.setState({closeCount: false, playlist: [], playlistLoad: undefined})
      //   Actions.playerDisplay(false)
      //   // Actions.toastShow('プレイヤーを終了しました')
      //   return
      // }
      // this.setState({closeCount: true})
      // this.audio.pause()
      // this.audio.currentTime = 0
      // // window.localStorage.removeItem('album')
      // window.localStorage.removeItem('track')
      // this.setState({
      //   loadAudio: true,
      //   playStatus: false,
      //   // playAlbum: undefined,
      //   playTrack: undefined,
      //   // playType: undefined,
      //   playPercent: undefined,
      //   loadPercent: undefined,
      //   currentTime: undefined,
      //   duration: undefined,
      //   stopStatus: true,
      // })
    }  
  }
}
