import * as request from '../Library/Request'
import * as lib from '../Library/Library'
import { scrollToTop } from './Status'
import { showToast } from './Toast'

const prefix = 'SCORE_'

// 新しい楽譜を追加するときはこれをコピーする
const newScoreObject = Object.freeze({
  // const newScoreObject = {
  // 楽譜番号(初期値)
  number: 1,
  // タイトル(日本語)
  titleJa: '',
  // タイトル(英語)
  titleEn: '',
  // 作曲者
  composer: [''],
  // 編曲者
  arranger: [''],
  // 出版社
  publisher: '',
  // ジャンル
  genre: '',
  // 譜面の種類(0: 原譜, 1: コピー譜)
  scoreType: '0',
  // コピー元
  copyMemo: '',
  // 楽譜の状態(0: 保管中, 1: 使用中, 2: 貸出中)
  scoreStatus: '0',
  // 欠譜の状態(0: なし, 1: あり, 2: 未確認)
  scoreLack: '0',
  // 欠譜
  lackList: [''],
  // 貸出先
  lendLocate: '',
  // 原譜化の状態(0: 原譜化済[stable])
  scoreBased: '0',
  // 楽譜管理番号
  label: '000001',
  // 楽譜保管先
  boxLabel: '',
})
// }

const loading = (loading) => ({
  type: prefix + 'LOADING',
  payload: { loading },
})

const loadingSearch = (loadingSearch) => ({
  type: prefix + 'LOADING_SEARCH',
  payload: { loadingSearch },
})

// 検索と全体読み込みのエントリーは別
export const getScoreListAll = () => {
  return async (dispatch) => {
    dispatch(loading(true))
    dispatch(getScoreList(''))
  }
}

export const changeSearchText = (searchQuery) => {
  return async (dispatch) => {
    dispatch(loadingSearch(true))
    dispatch(getScoreList(searchQuery))
    dispatch(loadMoreLoading(false))
    dispatch(setSearchQuery(searchQuery))
  }
}

const setSearchQuery = (searchQuery) => ({
  type: prefix + 'SET_SEARCH_QUERY',
  payload: { searchQuery },
})

export const resetSearchQuery = () => {
  return async (dispatch, getState) => {
    dispatch(changeSearchText(''))
    getState().score.searchBoxRef.focus()
  }
}

export const getScoreList = (query) => {
  return async (dispatch) => {
    if (!window.localStorage.token) return false
    const requestTime = String(new Date().getTime())
    !window.localStorage.scoreLoadList ? window.localStorage.setItem('scoreLoadList', requestTime) : false
    if (requestTime > window.localStorage.scoreLoadList) window.localStorage.setItem('scoreLoadList', requestTime)
    const path = lib.getScorePath() + '/api/member/score'
    const send = {
      session: lib.getSession(),
      query: query === undefined ? '' : query,
    }
    request.post(path, send, (err, res) => {
      if (err) {
        return false
      } else {
        if (res.body.status && window.localStorage.scoreLoadList === requestTime) {
          const list = res.body.list.filter((s) => s.scoreStatus !== '-1')
          dispatch(setScoreList(list))
          dispatch(showListUpdate(list.slice(0, 10)))
        }
      }
      dispatch(loading(false))
      dispatch(loadingSearch(false))
    })
  }
}

const setScoreList = (scoreList) => ({
  type: prefix + 'SET_SCORE_LIST',
  payload: { scoreList },
})

export const loadMore = () => {
  return async (dispatch, getState) => {
    dispatch(loadMoreLoading(true))
    const showList = getState().score.showList.concat(getState().score.scoreList.slice(10))
    dispatch(showListUpdate(showList))
  }
}

export const resetShowList = () => {
  return async (dispatch) => {
    dispatch(loadMoreLoading(false))
    dispatch(showListUpdate([]))
  }
}

const loadMoreLoading = (loadMoreLoading) => ({
  type: prefix + 'LOAD_MORE_LOADING',
  payload: { loadMoreLoading },
})

const showListUpdate = (showList) => ({
  type: prefix + 'SHOW_LIST_UPDATE',
  payload: { showList },
})

export const setSearchBoxRef = (searchBoxRef) => ({
  type: prefix + 'SET_SEARCH_BOX_REF',
  payload: { searchBoxRef },
})

export const setDisplayScoreModal = (displayScoreModal, modalContent) => ({
  type: prefix + 'SET_DISPLAY_SCORE_MODAL',
  payload: { displayScoreModal, modalContent },
})

// detail, edit 共用
const detailLoading = (detailLoading) => ({
  type: prefix + 'DETAIL_LOADING',
  payload: { detailLoading },
})

export const getScoreDetail = (scoreid) => {
  return async (dispatch) => {
    if (!window.localStorage.token) return false
    dispatch(detailLoading(true))
    const path = lib.getScorePath() + '/api/member/detail'
    const send = {
      session: lib.getSession(),
      id: scoreid,
    }
    request.post(path, send, (err, res) => {
      if (err) {
        return false
      } else if (res.body.status) {
        // boxUseは使用中の箱情報が入る
        let boxList = [],
          boxUse
        for (let i = 0; i < res.body.boxList.length; i++) {
          if (res.body.boxList[i].status) boxList.push(res.body.boxList[i])
          if (res.body.data.boxLabel === res.body.boxList[i].label) boxUse = res.body.boxList[i]
        }
        dispatch(setScoreDetail(scoreid, res.body.data, boxUse))
        dispatch(setBoxList(boxList))
      }
      dispatch(detailLoading(false))
    })
  }
}

const setScoreDetail = (scoreid, scoreDetail, boxUse) => ({
  type: prefix + 'SET_SCORE_DETAIL',
  payload: { scoreid, scoreDetail, boxUse },
})

const setBoxList = (boxList) => ({
  type: prefix + 'SET_BOX_LIST',
  payload: { boxList },
})

// score edit
export const setEditModalRef = (editModalRef) => ({
  type: prefix + 'SET_EDIT_MODAL_REF',
  payload: { editModalRef },
})

export const setDisplayEditScoreModal = (displayEditScoreModal, editMode, scoreEdit) => {
  return async (dispatch, getState) => {
    if (getState().score.editModalRef) getState().score.editModalRef.scrollTop = 0
    // 開くときは loadScoreEdit の最後に dispatch する
    displayEditScoreModal ? false : dispatch(updateDisplayEditScoreModal(displayEditScoreModal))
    displayEditScoreModal ? dispatch(loadScoreEdit(editMode)) : false
    dispatch(setEditMode(editMode))
    dispatch(setScoreEdit(scoreEdit))
  }
}

const editPreLoading = (editPreLoading) => ({
  type: prefix + 'EDIT_PRE_LOADING',
  payload: { editPreLoading },
})

const loadScoreEdit = (editMode) => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    dispatch(editPreLoading(true))
    // URL
    const path = lib.getScorePath() + '/api/member/edit/pre'
    const send = {
      session: lib.getSession(),
      mode: editMode,
      id: editMode !== 'new' ? getState().score.scoreid : false,
    }
    request.post(path, send, (err, res) => {
      if (err) {
        return false
      } else if (res.body.status) {
        // 箱が未作成のときはBoxManagementComponentへ
        if (res.body.boxList.length === 0) return // 確認 これはエラー処理する this.redirectBoxManagement()
        let boxList = []
        for (let i = 0; i < res.body.boxList.length; i++) {
          if (res.body.boxList[i].status) boxList.push(res.body.boxList[i])
        }
        // 使用可能な箱がない
        if (boxList.length === 0) return // 確認 これはエラー処理する this.redirectBoxManagement()
        if (editMode === 'new') {
          // 新規作成
          // Object.assign はシャローコピーなので使わない
          // let newScore = Object.assign({}, newScoreObject)
          let newScore = JSON.parse(JSON.stringify(newScoreObject))
          newScore['boxLabel'] = boxList[boxList.length - 1].label
          // 楽譜番号と楽譜管理番号
          if (!res.body.latest) {
            // 今まで楽譜登録なし
            dispatch(setScoreEdit(newScore))
            dispatch(setBoxList(boxList))
          } else {
            newScore['number'] = parseInt(res.body.latest.number) + 1
            newScore['label'] = ('000000' + newScore.number).slice(-6)
            // 新しい楽譜オブジェクトのプロパティで配列の値は
            dispatch(setScoreEdit(newScore))
            dispatch(setBoxList(boxList))
          }
        } else {
          // 編集
          // dispatch(setScoreEdit(res.body.data)) これはDetailと同じだと思うけど確認する
          dispatch(setBoxList(boxList))
        }
      }
      dispatch(updateDisplayEditScoreModal(true))
      // Modal が開くのを待つ
      setTimeout(() => {
        dispatch(editPreLoading(false))
      }, 100)
    })
  }
}

const updateDisplayEditScoreModal = (displayEditScoreModal) => ({
  type: prefix + 'UPDATE_DISPLAY_EDIT_SCORE_MODAL',
  payload: { displayEditScoreModal },
})

const setEditMode = (editMode) => ({
  type: prefix + 'SET_EDIT_MODE',
  payload: { editMode },
})

export const setScoreEdit = (scoreEdit) => ({
  type: prefix + 'SET_SCORE_EDIT',
  payload: { scoreEdit },
})

const editLoading = (editLoading) => ({
  type: prefix + 'EDIT_LOADING',
  payload: { editLoading },
})

export const updateScoreEdit = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    dispatch(editLoading(true))
    // URL
    const path = lib.getScorePath() + '/api/member/edit'
    const send = {
      session: lib.getSession(),
      mode: getState().score.editMode,
      id: getState().score.scoreid,
      data: getState().score.scoreEdit,
    }
    request.post(path, send, (err, res) => {
      if (err) {
        return false
      } else if (res.body.status) {
        if (getState().score.editMode !== 'new') {
          dispatch(getScoreDetail(getState().score.scoreid))
          dispatch(showToast('楽譜情報を修正しました'))
        } else {
          dispatch(getScoreListAll())
          // 新規追加前に検索文字列指定してたときは解除
          dispatch(setSearchQuery(''))
          dispatch(showToast('新しい楽譜を追加しました'))
        }
        dispatch(setDisplayEditScoreModal(false, undefined, undefined))
        // mobileの場合はスクロールする
        if (getState().status.mobile) dispatch(scrollToTop())
      }
      dispatch(editLoading(false))
    })
  }
}
