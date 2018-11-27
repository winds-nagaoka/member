const initialState = {
  loadingList: false,
  list: undefined,
  loading: false,
  status: false,
}

export default function bbsReducer (state = initialState, action) {
  switch (action.type) {
    case 'CAST_LIST_LOADING':
      return {
        ...state,
        loadingList: action.payload.loadingList
      }
    case 'CAST_LIST_UPDATE':
      return {
        ...state,
        list: action.payload.list
      }
    case 'CAST_UPDATE':
      return {
        ...state,
        status: action.payload.status
      }
    case 'CAST_LOADING':
      return {
        ...state,
        loading: action.payload.loading
      }
    default:
      return state
  }
}
