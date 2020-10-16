const initialState = {
  list: undefined,
  showList: [],
  showCount: 0,
  showMore: true,
  acquired: false,
  loading: false,

  loadingPost: false,
  postName: '',
  postText: '',
  postPass: '',
}

const prefix = 'BBS_'

export default function bbsReducer(state = initialState, action) {
  switch (action.type) {
    case prefix + 'UPDATE':
      return {
        ...state,
        list: action.payload.list,
      }
    case prefix + 'SHOW_LIST_UPDATE':
      return {
        ...state,
        showList: action.payload.showList,
        showCount: action.payload.showCount,
        showMore: action.payload.showMore,
      }
    case prefix + 'ACQUIRED':
      return {
        ...state,
        acquired: action.payload.acquired,
      }
    case prefix + 'LOADING':
      return {
        ...state,
        loading: action.payload.loading,
      }

    case prefix + 'LOADING_POST':
      return {
        ...state,
        loadingPost: action.payload.loadingPost,
      }
    case prefix + 'SET_POST_NAME':
      return {
        ...state,
        postName: action.payload.postName,
      }
    case prefix + 'SET_POST_TEXT':
      return {
        ...state,
        postText: action.payload.postText,
      }
    case prefix + 'SET_POST_PASS':
      return {
        ...state,
        postPass: action.payload.postPass,
      }
    default:
      return state
  }
}
