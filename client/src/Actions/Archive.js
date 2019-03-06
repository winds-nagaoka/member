import * as request from '../Library/Request'
import { version } from '../Library/Library'

const prefix = 'ARCHIVE_'

const loading = (loading) => ({
  type: prefix + 'LOADING',
  payload: { loading }
})

export const getConcertList = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    if (getState().archive.concertList) return false
    dispatch(loading(true))
    const path = 'https://archive.winds-n.com/api/member/concert'
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
        dispatch(setConcertList(res.body.list.reverse()))
        // dispatch(setConcertListLoad(true))
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

// Photo Component
const loadingPhoto = (loadingPhoto) => ({
  type: prefix + 'LOADING_PHOTO',
  payload: { loadingPhoto }
})

export const getPhotoList = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    if (!getState().archive.concertid) return false
    dispatch(loadingPhoto(true))
    const path = 'https://archive.winds-n.com/api/member/photo'
    const send = {
      userid: window.localStorage.windsid,
      token: window.localStorage.token,
      version,
      id: getState().archive.concertid,
      member: true
    }
    request.post(path, send, (err, res) => {
      if (err) {
        return false
      } else {
        dispatch(setPhotoList(res.body.list, res.body.baseSrcThumbnail, res.body.baseSrcOriginal, res.body.url))
        // dispatch(setConcertListLoad(true))
      }
      dispatch(loadingPhoto(false))
    })
  }
}

export const resetPhotoList = () => {
  return async (dispatch, getState) => {
    dispatch(setPhotoList(undefined, undefined, undefined, undefined))
  }
}

const setPhotoList = (photoList, photoBaseSrcThumbnail, photoBaseSrcOriginal, photoUrl) => ({
  type: prefix + 'SET_PHOTO_LIST',
  payload: { photoList, photoBaseSrcThumbnail, photoBaseSrcOriginal, photoUrl }
})

export const setDisplayPhotoSlideModal = (displayPhotoSlideModal, photoNumber) => ({
  type: prefix + 'SET_DISPLAY_PHOTO_SLIDE_MODAL',
  payload: { displayPhotoSlideModal, photoNumber }
})