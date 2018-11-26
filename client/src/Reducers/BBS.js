const initialState = {
  data: undefined,
  acquired: false,
  loading: false
}

export default function bbsReducer (state = initialState, action) {
  switch (action.type) {
    case 'BBS_UPDATE':
      return {
        ...state,
        data: action.payload.data
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
