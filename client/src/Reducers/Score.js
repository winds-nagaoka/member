const initialState = {
  loading: false,
  scoreList: undefined,
  showList: [],
  loadMoreLoading: false,
  searchQuery: '',
  loadingSearch: false,
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
  editPreLoading: false,
  scoreEdit: undefined,
  editLoading: false,
  editModalRef: undefined,

  // editMode: undefined,
  editMode: undefined,

  displayEditScoreModal: false,
}

const prefix = 'SCORE_'

export default function scoreReducer(state = initialState, action) {
  switch (action.type) {
    case prefix + 'LOADING':
      return {
        ...state,
        loading: action.payload.loading,
      }
    case prefix + 'SET_SCORE_LIST':
      return {
        ...state,
        scoreList: action.payload.scoreList,
      }
    case prefix + 'SHOW_LIST_UPDATE':
      return {
        ...state,
        showList: action.payload.showList,
      }
    case prefix + 'LOAD_MORE_LOADING':
      return {
        ...state,
        loadMoreLoading: action.payload.loadMoreLoading,
      }

    case prefix + 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload.searchQuery,
      }
    case prefix + 'LOADING_SEARCH':
      return {
        ...state,
        loadingSearch: action.payload.loadingSearch,
      }
    case prefix + 'SET_SEARCH_BOX_REF':
      return {
        ...state,
        searchBoxRef: action.payload.searchBoxRef,
      }
    case prefix + 'SET_DISPLAY_SCORE_MODAL':
      return {
        ...state,
        displayScoreModal: action.payload.displayScoreModal,
        modalContent: action.payload.modalContent,
      }
    case prefix + 'DETAIL_LOADING':
      return {
        ...state,
        detailLoading: action.payload.detailLoading,
      }
    case prefix + 'SET_SCORE_DETAIL':
      return {
        ...state,
        scoreid: action.payload.scoreid,
        scoreDetail: action.payload.scoreDetail,
        boxUse: action.payload.boxUse,
      }
    case prefix + 'SET_BOX_LIST':
      return {
        ...state,
        boxList: action.payload.boxList,
      }

    // score edit
    case prefix + 'SET_EDIT_MODAL_REF':
      return {
        ...state,
        editModalRef: action.payload.editModalRef,
      }
    case prefix + 'EDIT_PRE_LOADING':
      return {
        ...state,
        editPreLoading: action.payload.editPreLoading,
      }
    case prefix + 'EDIT_LOADING':
      return {
        ...state,
        editLoading: action.payload.editLoading,
      }
    case prefix + 'SET_EDIT_MODE':
      return {
        ...state,
        editMode: action.payload.editMode,
      }
    case prefix + 'SET_SCORE_EDIT':
      return {
        ...state,
        scoreEdit: action.payload.scoreEdit,
      }
    case prefix + 'UPDATE_DISPLAY_EDIT_SCORE_MODAL':
      return {
        ...state,
        displayEditScoreModal: action.payload.displayEditScoreModal,
      }
    default:
      return state
  }
}
