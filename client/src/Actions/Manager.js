import { replace } from 'react-router-redux'
import * as request from '../Library/Request'
import * as lib from '../Library/Library'
import { showToast } from './Toast'

const prefix = 'MANAGER_'

export const getManager = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    if (getState().manager.acquired) return false
    dispatch(loading(true))
    const path = lib.getApiPath() + '/manager/'
    request.post(path, {}, (err, res) => {
      if (err) {
        return false
      } else {
        dispatch(update(res.body))
        dispatch(acquired(true))
      }
      dispatch(loading(false))
    })
  }
}

export const update = (data) => ({
  type: prefix + 'UPDATE',
  payload: { data }
})

export const acquired = (acquired) => ({
  type: prefix + 'ACQUIRED',
  payload: { acquired }
})

export const loading = (loading) => ({
  type: prefix + 'LOADING',
  payload: { loading }
})

// Selection Components
export const getSelectionPhase = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    dispatch(loadingSelectionPhase(true))
    const path = lib.getSurveyPath() + '/api/selection/phase'
    const send = {
      session: lib.getSession()
    }
    request.post(path, send, (err, res) => {
      if (err) {
        dispatch(setSelectionPhase(false))
      } else {
        dispatch(setSelectionPhase(res.body.phase))
      }
      dispatch(loadingSelectionPhase(false))
    })
  }
}

const loadingSelectionPhase = (loadingSelectionPhase) => ({
  type: prefix + 'LOADING_SELECTION_PHASE',
  payload: { loadingSelectionPhase }
})

const setSelectionPhase = (selectionPhase) => ({
  type: prefix + 'SET_SELECTION_PHASE',
  payload: { selectionPhase }
})

// Selection List
export const getSelectionList = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    dispatch(loadingSelectionList(true))
    const path = lib.getSurveyPath() + '/api/selection/list'
    const send = {
      session: lib.getSession()
    }
    request.post(path, send, (err, res) => {
      dispatch(loadingSelectionList(false))
      if (err) {
        dispatch(setSelectionList(false))
      } else {
        dispatch(setSelectionList(res.body.list))
      }
    })
  }
}

const loadingSelectionList = (loadingSelectionList) => ({
  type: prefix + 'LOADING_SELECTION_LIST',
  payload: { loadingSelectionList }
})

const setSelectionList = (selectionList) => ({
  type: prefix + 'SET_SELECTION_LIST',
  payload: { selectionList }
})

// Selection Post
export const setSelectionPost = (selectionPost) => ({
  type: prefix + 'SET_SELECTION_POST',
  payload: { selectionPost }
})

export const sendPost = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    if (!getState().manager.selectionPost.titleJa && !getState().manager.selectionPost.titleEn) {
      return dispatch(showToast('入力内容を確認してください'))
    }
    dispatch(loadingSelectionPost(true))
    const path = lib.getSurveyPath() + '/api/selection/post'
    const send = {
      session: lib.getSession(),
      selection: getState().manager.selectionPost
    }
    request.post(path, send, (err, res) => {
      dispatch(loadingSelectionPost(false))
      if (err) {
        dispatch(showToast('サーバーエラー'))
      } else {
        dispatch(showToast('投稿しました'))
        dispatch(replace('/manager/selection'))
      }
    })
  }
}

const loadingSelectionPost = (loadingSelectionPost) => ({
  type: prefix + 'LOADING_SELECTION_POST',
  payload: { loadingSelectionPost }
})

// Selection Detail
export const getSelectionDetail = (id) => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    dispatch(loadingSelectionDetail(true))
    dispatch(setSelectionDetailid(id))
    const path = lib.getSurveyPath() + '/api/selection/detail'
    const send = {
      session: lib.getSession(),
      id
    }
    request.post(path, send, (err, res) => {
      dispatch(loadingSelectionDetail(false))
      if (err) {
        dispatch(setSelectionDetail(false))
      } else {
        console.log(res.body.selection)
        dispatch(setSelectionDetail(res.body.selection))
      }
    })
  }
}

const loadingSelectionDetail = (loadingSelectionDetail) => ({
  type: prefix + 'LOADING_SELECTION_DETAIL',
  payload: { loadingSelectionDetail }
})

const setSelectionDetailid = (selectionDetailid) => ({
  type: prefix + 'SET_SELECTION_DETAILID',
  payload: { selectionDetailid }
})

const setSelectionDetail = (selectionDetail) => ({
  type: prefix + 'SET_SELECTION_DETAIL',
  payload: { selectionDetail }
})