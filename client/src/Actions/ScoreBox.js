import * as request from '../Library/Request'
import { version } from '../Library/Library'

const prefix = 'SCOREBOX_'

const loading = (loading) => ({
  type: prefix + 'LOADING',
  payload: { loading }
})

export const getBoxList = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    if (getState().scoreBox.acquired) return false
    // dispatch(loading(true))
    // URL
    // const path = 'https://score.winds-n.com/api/member/box'
    const path = 'http://192.168.1.22:3011/api/member/box'
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
          dispatch(setBoxList(res.body.list))
          dispatch(acquired(true))
        }
      }
      // dispatch(loading(false))
    })
  }
}

const setBoxList = (boxList) => ({
  type: prefix + 'SET_BOX_LIST',
  payload: { boxList }
})

export const setDisplayBoxModal = (displayBoxModal, modalContent) => {
  const inputBoxLocate = !modalContent.locate ? '' : modalContent.locate
  return {
    type: prefix + 'SET_DISPLAY_BOX_MODAL',
    payload: { displayBoxModal, modalContent, inputBoxLocate }
  }
}

const acquired = (acquired) => ({
  type: prefix + 'ACQUIRED',
  payload: { acquired }
})

export const changeInputBoxLocate = (inputBoxLocate) => ({
  type: prefix + 'CHANGE_INPUT_BOX_LOCATE',
  payload: { inputBoxLocate }
})

const loadingUpdateBoxLocate = (loadingUpdateBoxLocate) => ({
  type: prefix + 'LOADING_UPDATE_BOX_LOCATE',
  payload: { loadingUpdateBoxLocate }
})

export const updateBoxLocate = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    dispatch(loadingUpdateBoxLocate(true))
    // URL
    // const path = 'https://score.winds-n.com/api/member/box/modify'
    const path = 'http://192.168.1.22:3011/api/member/box/modify'
    const send = {
      userid: window.localStorage.windsid,
      token: window.localStorage.token,
      id: getState().scoreBox.modalContent._id,
      locate: getState().scoreBox.inputBoxLocate,
      version,
      member: true
    }
    request.post(path, send, (err, res) => {
      if (err) {
        return false
      } else {
        if (res.body.status) {
          const boxList = JSON.parse(JSON.stringify(getState().scoreBox.boxList))
          boxList[getState().scoreBox.boxList.findIndex(item => item === getState().scoreBox.modalContent)].locate = '読み込み中'
          dispatch(setBoxList(boxList))
          dispatch(acquired(false))
          dispatch(setDisplayBoxModal(false, getState().scoreBox.modalContent))
          dispatch(getBoxList())
        }
      }
      dispatch(loadingUpdateBoxLocate(false))
    })
  }
}

const loadingAddBox = (loadingAddBox) => ({
  type: prefix + 'LOADING_ADD_BOX',
  payload: { loadingAddBox }
})

export const addBox = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    dispatch(loadingAddBox(true))
    // URL
    // const path = 'https://score.winds-n.com/api/member/box/add'
    const path = 'http://192.168.1.22:3011/api/member/box/add'
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
          dispatch(acquired(false))
          dispatch(getBoxList())
        }
      }
      dispatch(loadingAddBox(false))
    })
  }
}