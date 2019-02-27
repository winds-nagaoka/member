import * as request from '../Library/Request'

export const getBBSList = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    if (getState().bbs.acquired) return false
    dispatch(loading(true))
    request.post('https://api.winds-n.com/bbs/', {}, (err, res) => {
      if (err) {
        return false
      } else {
        dispatch(update(res.body.list))
        dispatch(loadMore())
        dispatch(acquired(true))
      }
      dispatch(loading(false))
    })
  }
}

const update = (list) => ({
  type: 'BBS_UPDATE',
  payload: {
    list
  }
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
  type: 'BBS_SHOW_LIST_UPDATE',
  payload: {
    showList, showCount, showMore
  }
})

const acquired = (acquired) => ({
  type: 'BBS_ACQUIRED',
  payload: {
    acquired
  }
})

const loading = (loading) => ({
  type: 'BBS_LOADING',
  payload: {
    loading: loading
  }
})
