const initialState = {
  data: undefined,
  acquired: false,
  loading: false,

  loadingSelectionPhase: false,
  selectionPhase: false,

  loadingSelectionList: false,
  selectionList: [],

  loadingSelectionPostDetail: false,
  loadingSelectionPost: false,
  selectionPostid: false,
  selectionPost: {
    title: '',
    titleJa: '',
    titleEn: '',
    composer: [''],
    arranger: [''],
    duration: '',
    url: ['']
  },

  loadingSelectionDetail: false,
  selectionDetailid: false,
  selectionDetail: false
}

const prefix = 'MANAGER_'

export default function managerReducer (state = initialState, action) {
  switch (action.type) {
    case prefix + 'UPDATE':
      return {
        ...state,
        data: action.payload.data
      }
    case prefix + 'ACQUIRED':
      return {
        ...state,
        acquired: action.payload.acquired
      }
    case prefix + 'LOADING':
      return {
        ...state,
        loading: action.payload.loading
      }
    case prefix + 'LOADING_SELECTION_PHASE':
      return {
        ...state,
        loadingSelectionPhase: action.payload.loadingSelectionPhase
      }
    case prefix + 'SET_SELECTION_PHASE':
      return {
        ...state,
        selectionPhase: action.payload.selectionPhase
      }
    case prefix + 'LOADING_SELECTION_LIST':
      return {
        ...state,
        loadingSelectionList: action.payload.loadingSelectionList
      }
    case prefix + 'SET_SELECTION_LIST':
      return {
        ...state,
        selectionList: action.payload.selectionList
      }
    case prefix + 'LOADING_SELECTION_POST_DETAIL':
      return {
        ...state,
        loadingSelectionPostDetail: action.payload.loadingSelectionPostDetail
      }
    case prefix + 'LOADING_SELECTION_POST':
      return {
        ...state,
        loadingSelectionPost: action.payload.loadingSelectionPost
      }
    case prefix + 'SET_SELECTION_POSTID':
      return {
        ...state,
        selectionPostid: action.payload.selectionPostid
      }
    case prefix + 'SET_SELECTION_POST':
      return {
        ...state,
        selectionPost: action.payload.selectionPost
      }
    case prefix + 'LOADING_SELECTION_DETAIL':
      return {
        ...state,
        loadingSelectionDetail: action.payload.loadingSelectionDetail
      }
    case prefix + 'SET_SELECTION_DETAILID':
      return {
        ...state,
        selectionDetailid: action.payload.selectionDetailid
      }
    case prefix + 'SET_SELECTION_DETAIL':
      return {
        ...state,
        selectionDetail: action.payload.selectionDetail
      }
    default:
      return state
  }
}
