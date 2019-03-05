const initialState = {
  loading: false,
  scoreList: undefined,
  showList: [],
  loadMoreLoading: false,
  searchQuery: '',
  searchLoading: false,
  searchBoxRef: undefined,
  displayScoreModal: false,
  modalContent: undefined,

  // score detail
  detailLoading: false,
  scoreid: undefined,
  scoreDetail: undefined,
  boxUse: undefined,
  boxList: undefined,

  // score edit
  editLoading: false,
  editRedirect: undefined,

  editMode: undefined,
  newScore: {
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
  }
}

const prefix = 'SCORE_'

export default function scoreReducer (state = initialState, action) {
  switch (action.type) {
    case prefix + 'LOADING':
      return {
        ...state,
        loading: action.payload.loading
      }
    case prefix + 'SET_SCORE_LIST':
      return {
        ...state,
        scoreList: action.payload.scoreList
      }
    case prefix + 'SHOW_LIST_UPDATE':
      return {
        ...state,
        showList: action.payload.showList
      }
    case prefix + 'LOAD_MORE_LOADING':
      return {
        ...state,
        loadMoreLoading: action.payload.loadMoreLoading
      }
      
    case prefix + 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload.searchQuery
      }
    case prefix + 'SEARCH_LOADING':
      return {
        ...state,
        searchLoading: action.payload.searchLoading
      }
    case prefix + 'SET_SEARCH_BOX_REF':
      return {
        ...state,
        searchBoxRef: action.payload.searchBoxRef
      }
    case prefix + 'SET_DISPLAY_SCORE_MODAL':
      return {
        ...state,
        displayScoreModal: action.payload.displayScoreModal,
        modalContent: action.payload.modalContent
      }
    case prefix + 'DETAIL_LOADING':
      return {
        ...state,
        detailLoading: action.payload.detailLoading
      }
    case prefix + 'SET_SCORE_DETAIL':
      return {
        ...state,
        scoreid: action.payload.scoreid,
        scoreDetail: action.payload.scoreDetail,
        boxUse: action.payload.boxUse,
        boxList: action.payload.boxList
      }
    
    // score edit
    case prefix + 'EDIT_LOADING':
      return {
        ...state,
        editLoading: action.payload.editLoading
      }
    case prefix + 'EDIT_REDIRECT':
      return {
        ...state,
        editRedirect: action.payload.editRedirect
      }
    case prefix + 'SET_EDIT_MODE':
      return {
        ...state,
        editMode: action.payload.editMode
      }
    case prefix + 'UPDATE_SOCRE_DETAIL':
      return {
        ...state,
        scoreDetail: action.payload.scoreDetail
      }

    default:
      return state
  }
}