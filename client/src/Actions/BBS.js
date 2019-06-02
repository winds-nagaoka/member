import { replace } from 'react-router-redux'
import * as request from '../Library/Request'
import * as lib from '../Library/Library'

import { showToast } from './Toast'

const prefix = 'BBS_'
const api = 'Wct5RRmoRwL8mysm4yChUcfkXGcm0fwPJSTrJPqbLGJnFDe9kSQuvPMNKa0rgky9pKukd7mMmZVds3RtimrXZ48UcfiVlvKq699OK662f2uOjP1B99jqJjMCIRrE9QdF'

export const getBBSList = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    if (getState().bbs.acquired) return false
    dispatch(loading(true))
    // 既に読み込んでるデータをリセット
    dispatch(updateList(undefined))
    dispatch(showListUpdate([], 0, true))
    const path = lib.getApiPath() + '/bbs/' // スラッシュ必須
    const send = { api }
    request.post(path, send, (err, res) => {
      if (err) {
        return false
      } else if (res.body.status === 'true') {
        dispatch(updateList(res.body.list))
        dispatch(loadMore())
        dispatch(acquired(true))
      }
      dispatch(loading(false))
    })
  }
}

const updateList = (list) => ({
  type: prefix + 'UPDATE',
  payload: { list }
})

export const loadMore = () => {
  return async (dispatch, getState) => {
    const prevCount = getState().bbs.showCount
    const showCount = prevCount + 5
    const list = getState().bbs.list
    const showList = getState().bbs.showList.concat(list.slice(prevCount, showCount))
    const showMore = showCount > list.length ? false : true
    dispatch(showListUpdate(showList, showCount, showMore))
  }
}

const showListUpdate = (showList, showCount, showMore) => ({
  type: prefix + 'SHOW_LIST_UPDATE',
  payload: { showList, showCount, showMore }
})

const acquired = (acquired) => ({
  type: prefix + 'ACQUIRED',
  payload: { acquired }
})

const loading = (loading) => ({
  type: prefix + 'LOADING',
  payload: { loading }
})

// Post
const loadingPost = (loadingPost) => ({
  type: prefix + 'LOADING_POST',
  payload: { loadingPost }
})

export const setPostName = (postName) => ({
  type: prefix + 'SET_POST_NAME',
  payload: { postName }
})

export const setPostText = (postText) => ({
  type: prefix + 'SET_POST_TEXT',
  payload: { postText }
})

export const setPostPass = (postPass) => ({
  type: prefix + 'SET_POST_PASS',
  payload: { postPass }
})

export const sendPost = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    if (getState().bbs.postName === '' || getState().bbs.postText === '') {
      dispatch(showToast('入力内容を確認してください'))
      return false
    }
    dispatch(loadingPost(true))
    const path = lib.getApiPath() + '/bbs/' // スラッシュ必須
    const send = {
      api,
      write: true,
      name: getState().bbs.postName,
      text: getState().bbs.postText,
      delpass: getState().bbs.postPass
    }
    request.post(path, send, (err, res) => {
      if (err) {
        return false
      } else if (res.body.status === 'true') {
        dispatch(resetPost())
        dispatch(acquired(false))
        dispatch(replace('/bbs'))
      }
      dispatch(loadingPost(false))
    })
  }
}

export const resetPost = () => {
  return async (dispatch) => {
    dispatch(setPostName(''))
    dispatch(setPostText(''))
    dispatch(setPostPass(''))
  }
}