import * as request from '../Library/Request'
import { version } from '../Library/Library'

const prefix = 'SCORE_'

const loading = (loading) => ({
  type: prefix + 'LOADING',
  payload: { loading }
})

const searchLoading = (searchLoading) => ({
  type: prefix + 'SEARCH_LOADING',
  payload: { searchLoading }
})

// 検索と全体読み込みのエントリーは別
export const getScoreListAll = () => {
  return async (dispatch, getState) => {
    dispatch(loading(true))
    dispatch(getScoreList(''))
  }
}

export const changeSearchText = (searchQuery) => {
  return async (dispatch, getState) => {
    dispatch(searchLoading(true))
    dispatch(getScoreList(searchQuery))
    dispatch(loadMoreLoading(false))
    dispatch(setSearchQuery(searchQuery))
  }
}

const setSearchQuery = (searchQuery) => ({
  type: prefix + 'SET_SEARCH_QUERY',
  payload: { searchQuery }
})

export const resetSearchQuery = () => {
  return async (dispatch, getState) => {
    dispatch(changeSearchText(''))
    getState().score.searchBoxRef.focus()
  }
}

// たぶんこれexportじゃない
export const getScoreList = (query) => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    const requestTime = String((new Date()).getTime())
    !window.localStorage.scoreLoadList ? window.localStorage.setItem('scoreLoadList', requestTime) : false
    if (requestTime > window.localStorage.scoreLoadList) window.localStorage.setItem('scoreLoadList', requestTime)
    
    console.log('query', query)
    const path = 'https://score.winds-n.com/api/score'
    const send = {
      userid: window.localStorage.windsid,
      token: window.localStorage.token,
      query: query === undefined ? '' : query,
      version,
      member: true
    }
    request.post(path, send, (err, res) => {
      if (err) {
        return false
      } else {
        if (res.body.status && window.localStorage.scoreLoadList === requestTime) {
          console.log(res.body)
          dispatch(setScoreList(res.body.list))  
          dispatch(showListUpdate(res.body.list.slice(0, 10)))
        }
      }
      dispatch(loading(false))
      dispatch(searchLoading(false))
    })
  }
}

const setScoreList = (scoreList) => ({
  type: prefix + 'SET_SCORE_LIST',
  payload: { scoreList }
})

export const loadMore = () => {
  return async (dispatch, getState) => {
    dispatch(loadMoreLoading(true))
    const showList = getState().score.showList.concat(getState().score.scoreList.slice(10))
    dispatch(showListUpdate(showList))
  }
}

export const resetShowList = () => {
  return async (dispatch, getState) => {
    dispatch(loadMoreLoading(false))
    dispatch(showListUpdate([]))
  }
}

const loadMoreLoading = (loadMoreLoading) => ({
  type: prefix + 'LOAD_MORE_LOADING',
  payload: { loadMoreLoading }
})

const showListUpdate = (showList) => ({
  type: prefix + 'SHOW_LIST_UPDATE',
  payload: { showList }
})

export const setSearchBoxRef = (searchBoxRef) => ({
  type: prefix + 'SET_SEARCH_BOX_REF',
  payload: { searchBoxRef }
})

export const setDisplayScoreModal = (displayScoreModal, modalContent) => ({
  type: prefix + 'SET_DISPLAY_SCORE_MODAL',
  payload: { displayScoreModal, modalContent }
})

const detailLoading = (detailLoading) => ({
  type: prefix + 'DETAIL_LOADING',
  payload: { detailLoading }
})

export const getScoreDetail = (scoreid) => {
  return async (dispatch, getState) => {
    dispatch(detailLoading(true))
    if (!window.localStorage.token) return false 
    const path = 'https://score.winds-n.com/api/detail'
    const send = {
      userid: window.localStorage.windsid,
      token: window.localStorage.token,
      id: scoreid,
      version,
      member: true
    }
    request.post(path, send, (err, res) => {
      if (err) {
        return false
      } else if (res.body.status) {
        let boxList = [], box
        for (let i=0;i<res.body.boxList.length;i++) {
          let each = res.body.boxList[i]
          if (each.status) boxList.push(each)
          if (res.body.data.boxLabel === each.label) box = each
        }
        dispatch(setScoreDetail(scoreid, res.body.data, box, boxList))
      }
      dispatch(detailLoading(false))
    })
  }
}

const setScoreDetail = (scoreid, scoreDetail, boxUse, boxList) => ({
  type: prefix + 'SET_SCORE_DETAIL',
  payload: { scoreid, scoreDetail, boxUse, boxList }
})