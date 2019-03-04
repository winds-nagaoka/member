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
  boxList: undefined
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
    default:
      return state
  }
}