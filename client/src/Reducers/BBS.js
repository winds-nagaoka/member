const initialState = {
  list: undefined,
  showList: [],
  showCount: 0,
  showMore: true,
  acquired: false,
  loading: false
}

export default function bbsReducer (state = initialState, action) {
  switch (action.type) {
    case 'BBS_UPDATE':
      return {
        ...state,
        list: action.payload.list
      }
    case 'BBS_SHOW_LIST_UPDATE':
      return {
        ...state,
        showList: action.payload.showList,
        showCount: action.payload.showCount,
        showMore: action.payload.showMore
      }
    case 'BBS_ACQUIRED':
      return {
        ...state,
        acquired: action.payload.acquired
      }
    case 'BBS_LOADING':
      return {
        ...state,
        loading: action.payload.loading
      }
    default:
      return state
  }
}
