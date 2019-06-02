import * as request from '../Library/Request'
import * as lib from '../Library/Library'
import { playTime, version } from '../Library/Library'
import { escapeReg } from '../Component/Auth/Archive/Library/Library'

import { setDisplayPlayer, audioPause } from './Audio'

const prefix = 'ARCHIVE_'

const loading = (loading) => ({
  type: prefix + 'LOADING',
  payload: { loading }
})

export const getConcertList = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    if (getState().archive.concertList) return false
    if (getState().archive.loading) return false
    dispatch(loading(true))
    const path = lib.getAppPath() + '/api/concert'
    const send = {
      session: lib.getSession()
    }
    request.post(path, send, (err, res) => {
      if (err) {
        return false
      } else {
        dispatch(setConcertList(res.body.list.reverse()))
      }
      dispatch(loading(false))
    })
  }
}

const setConcertList = (concertList) => ({
  type: prefix + 'SET_CONCERT_LIST',
  payload: { concertList }
})

// const setConcertListLoad = (concertListLoad) => ({
//   type: prefix + 'SET_CONCERT_LIST_LOAD',
//   payload: { concertListLoad }
// })

export const toggleDisplayMain = (displayMain) => {
  return async (dispatch, getState) => {
    window.localStorage.displayMain = displayMain
    dispatch(setDisplayMain(displayMain))
  }
}

const setDisplayMain = (displayMain) => ({
  type: prefix + 'SET_DISPLAY_MAIN',
  payload: { displayMain }
})

export const toggleDisplayMini = (displayMini) => {
  return async (dispatch, getState) => {
    window.localStorage.displayMini = displayMini
    dispatch(setDisplayMini(displayMini))
  }
}

const setDisplayMini = (displayMini) => ({
  type: prefix + 'SET_DISPLAY_MINI',
  payload: { displayMini }
})

export const toggleDisplayOther = (displayOther) => {
  return async (dispatch, getState) => {
    window.localStorage.displayOther = displayOther
    dispatch(setDisplayOther(displayOther))
  }
}

const setDisplayOther = (displayOther) => ({
  type: prefix + 'SET_DISPLAY_OTHER',
  payload: { displayOther }
})

export const setConcertid = (concertid) => ({
  type: prefix + 'SET_OVERVIEW_ID',
  payload: { concertid }
})

// Search
const loadingSearch = (loadingSearch) => ({
  type: prefix + 'LOADING_SEARCH',
  payload: { loadingSearch }
})

export const setSearchRef = (searchRef) => ({
  type: prefix + 'SET_SEARCH_REF',
  payload: { searchRef }
})

export const search = (value) => {
  return async (dispatch, getState) => {
    dispatch(setSearchQuery(value))
    if (value === '' || !value) return dispatch(resetSearch())
    dispatch(loadingSearch(true))
    const searchResult = getState().archive.concertList.map((item) => {
      const concert = item.detail
      return concert.data.map((track) => {
        const s = new RegExp(escapeReg(value), 'i')
        // 演奏会名で一致
        if (concert.title.search(s) >= 0) return {concert, track}
        // タイトルで一致
        if (track.title.search(s) >= 0) return {concert, track}
        // サブタイトルで一致
        // if (track.addtitle.search(s) >= 0) return {concert: concert, track}
        // 作曲者名で一致
        if ((track.composer ? track.composer : '').search(s) >= 0) return {concert, track}
        // 編曲者名で一致
        if ((track.arranger ? track.arranger : '').search(s) >= 0) return {concert, track}
      })
    })
    dispatch(loadingSearch(false))
    dispatch(setSearchResult(searchResult))
  }
}

const setSearchQuery = (searchQuery) => ({
  type: prefix + 'SET_SEARCH_QUERY',
  payload: { searchQuery }
})

const setSearchResult = (searchResult) => ({
  type: prefix + 'SET_SEARCH_RESULT',
  payload: { searchResult }
})

export const resetSearch = () => {
  return async (dispatch, getState) => {
    dispatch(setSearchQuery(''))
    dispatch(setSearchResult(undefined))
    getState().archive.searchRef.focus()
  }
}

// Photo
const loadingPhoto = (loadingPhoto) => ({
  type: prefix + 'LOADING_PHOTO',
  payload: { loadingPhoto }
})

export const getPhotoList = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    if (!getState().archive.concertid) return false
    if (getState().archive.photoConcertid === getState().archive.concertid) return false
    dispatch(loadingPhoto(true))
    const path = lib.getAppPath() + '/api/photo'
    const send = {
      session: lib.getSession(),
      id: getState().archive.concertid,
    }
    request.post(path, send, (err, res) => {
      if (err) {
        return false
      } else {
        dispatch(setPhotoList(getState().archive.concertid, res.body.list, res.body.baseSrcThumbnail, res.body.baseSrcOriginal, res.body.url))
      }
      dispatch(loadingPhoto(false))
    })
  }
}

export const resetPhotoList = () => {
  return async (dispatch, getState) => {
    dispatch(setPhotoList(undefined, undefined, undefined, undefined, undefined))
  }
}

const setPhotoList = (photoConcertid, photoList, photoBaseSrcThumbnail, photoBaseSrcOriginal, photoUrl) => ({
  type: prefix + 'SET_PHOTO_LIST',
  payload: { photoConcertid, photoList, photoBaseSrcThumbnail, photoBaseSrcOriginal, photoUrl }
})

export const setDisplayPhotoSlideModal = (displayPhotoSlideModal, photoNumber) => ({
  type: prefix + 'SET_DISPLAY_PHOTO_SLIDE_MODAL',
  payload: { displayPhotoSlideModal, photoNumber }
})

// Video
const loadingVideo = (loadingVideo) => ({
  type: prefix + 'LOADING_VIDEO',
  payload: { loadingVideo }
})

export const getVideoList = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    if (!getState().archive.concertid) return false
    if (getState().archive.videoConcertid === getState().archive.concertid) return false
    dispatch(loadingVideo(true))
    const path = lib.getAppPath() + '/api/video'
    const send = {
      session: lib.getSession(),
      id: getState().archive.concertid
    }
    request.post(path, send, (err, res) => {
      if (err) {
        return false
      } else {
        dispatch(setVideoList(getState().archive.concertid, res.body.list, res.body.baseSrc, res.body.url, res.body.poster))
        getState().archive.videoPlayTrack ? dispatch(videoPlayRequest(getState().archive.videoPlayTrack, true)) : false
      }
      dispatch(loadingVideo(false))
    })
  }
}

// export const resetVideo = () => {
//   return async (dispatch, getState) => {
//     dispatch(videoStop())
//     dispatch(setVideoPlayStatus(undefined, undefined))
//     dispatch(setVideoList(undefined, undefined, undefined, undefined, undefined))
//     getState().archive.audioPlayerDisplay ? dispatch(setDisplayPlayer(true)) : false
//     dispatch(setDisplayVideoController(false, undefined))
//   }
// }

const setVideoList = (videoConcertid, videoList, videoBaseSrc, videoUrl, videoPoster) => ({
  type: prefix + 'SET_VIDEO_LIST',
  payload: { videoConcertid, videoList, videoBaseSrc, videoUrl, videoPoster }
})

// プレイヤー操作
export const setVideoRef = (videoRef) => ({
  type: prefix + 'SET_VIDEO_REF',
  payload: { videoRef }
})

export const setDisplayVideoController = (displayVideoController, audioPlayerDisplay) => ({
  type: prefix + 'SET_DISPLAY_VIDEO_CONTROLLER',
  payload: { displayVideoController, audioPlayerDisplay }
})

export const setLoadingVideoSource = (status) => ({
  type: prefix + 'SET_LOADING_VIDEO_SOURCE',
  payload: { loadingVideoSource: status }
})

export const videoLoadPercentUpdate = (percent) => ({
  type: prefix + 'VIDEO_LOAD_PERCENT_UPDATE',
  payload: { videoLoadPercent: percent }
})

export const videoPlayUpdate = (videoCurrent, videoDuration) => {
  return async (dispatch, getState) => {
    if (!getState().archive.displayVideoController && !getState().archive.videoRef.paused) {
      const audioPlayerDisplay = getState().audio.displayPlayer || getState().archive.audioPlayerDisplay ? true : false
      dispatch(setDisplayVideoController(true, audioPlayerDisplay))  
    }
    const videoPlayPercent = (videoDuration && videoCurrent) ? Math.round((videoCurrent / videoDuration) * 1000) / 10 : undefined
    const videoCurrentTime = videoCurrent ? playTime(Math.floor(videoCurrent)) : undefined
    const videoDurationTime = videoDuration ? playTime(Math.round(videoDuration)) : undefined
    dispatch(setVideoPlayUpdate(videoCurrent, videoCurrentTime, videoDuration, videoDurationTime, videoPlayPercent))
  }
}

const setVideoPlayUpdate = (videoCurrent, videoCurrentTime, videoDuration, videoDurationTime, videoPlayPercent) => ({
  type: prefix + 'VIDEO_PLAY_UPDATE',
  payload: {
    videoCurrent,
    videoCurrentTime,
    videoDuration,
    videoDurationTime,
    videoPlayPercent
  }
})

const setVideoPlayStatus = (videoPlayStatus, videoPlayTrack) => ({
  type: prefix + 'SET_VIDEO_PLAY_STATUS',
  payload: { videoPlayStatus, videoPlayTrack }
})

export const videoPlayRequest = (number, request) => {
  return async (dispatch, getState) => {
    // オーディオが再生中なら止める
    dispatch(audioPause())
    // トラック番号のみ先に反映(先に)
    dispatch(setVideoPlayStatus(false, number))
    // プレイヤーを表示(オーディオプレイヤーの状態を記録)
    const audioPlayerDisplay = getState().audio.displayPlayer || getState().archive.audioPlayerDisplay ? true : false
    dispatch(setDisplayVideoController(true, audioPlayerDisplay))
    // オーディオプレイヤーが表示されていたら隠す
    getState().audio.displayPlayer ? dispatch(setDisplayPlayer(false)) : false
    // ビデオを再生
    if (request && getState().archive.videoList && getState().archive.videoRef) {
      const track = getState().archive.videoList[number]
      getState().archive.videoRef.src = getState().archive.videoUrl + getState().archive.videoBaseSrc + track.path
      dispatch(videoPlay(number))
    }
    // 再生フラグをリセット
    dispatch(setCountFlag(true))
  }
}

export const videoPlay = (number) => {
  return async (dispatch, getState) => {
    getState().archive.videoRef.play()
    dispatch(setVideoPlayStatus(true, number))
  }
}

export const videoPause = (e) => {
  if (e) e.preventDefault()
  return async (dispatch, getState) => {
    if (!getState().archive.videoRef.paused) {
      getState().archive.videoRef.pause()
      dispatch(setVideoPlayStatus(false, getState().archive.videoPlayTrack))
    }  
  }
}

export const videoStop = (e) => {
  if (e) e.preventDefault()
  return async (dispatch, getState) => {
    getState().archive.videoRef.pause()
    getState().archive.videoRef.currentTime = 0
    dispatch(setVideoPlayStatus(false, getState().archive.videoPlayTrack))
    if (!getState().archive.videoCurrent) {
      // コントローラを隠す
      dispatch(setVideoPlayStatus(undefined, undefined))
      getState().archive.audioPlayerDisplay ? dispatch(setDisplayPlayer(true)) : false
      dispatch(setDisplayVideoController(false, undefined))
      getState().archive.videoRef.src = false
    }
  }
}

export const resetVideo = () => {
  return async (dispatch, getState) => {
    getState().archive.videoRef.pause()
    dispatch(setVideoPlayStatus(undefined, undefined))
    dispatch(setVideoList(undefined, undefined, undefined, undefined, undefined))
    getState().archive.audioPlayerDisplay ? dispatch(setDisplayPlayer(true)) : false
    dispatch(setDisplayVideoController(false, undefined))
  }
}

export const countUp = () => {
  return async (dispatch, getState) => {
    const play = {
      userid: window.localStorage.windsid,
      play: getState().archive.videoRef.src + '(' + getState().archive.videoCurrentTime + ')',
      version
    }
    request.countUp(play)
    dispatch(setCountFlag(false))
  }
}

const setCountFlag = (countFlag) => ({
  type: prefix + 'SET_COUNT_FLAG',
  payload: { countFlag }
})