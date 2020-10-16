const initialState = {
  list: undefined,
  acquired: false,
  loading: false,
}

const prefix = 'SOURCE_'

export default function sourceReducer(state = initialState, action) {
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
    case prefix + 'ACQUIRED':
      return {
        ...state,
        acquired: action.payload.acquired,
      }
    default:
      return state
  }
}
