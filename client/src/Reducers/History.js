const initialState = {
  list: undefined,
  showList: [],
  showMore: true,
  acquired: false,
  loading: false,
}

const prefix = 'HISTORY_'

export default function historyReducer(state = initialState, action) {
  switch (action.type) {
    case prefix + 'LOADING':
      return {
        ...state,
        loading: action.payload.loading,
      }
    case prefix + 'SET_LIST':
      return {
        ...state,
        list: action.payload.list,
      }
    case prefix + 'SHOW_LIST_UPDATE':
      return {
        ...state,
        showList: action.payload.showList,
      }
    case prefix + 'ACQUIRED':
      return {
        ...state,
        acquired: action.payload.acquired,
      }
    default:
      return state
  }
}
