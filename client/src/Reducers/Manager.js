const initialState = {
  data: undefined,
  acquired: false,
  loading: false
}

export default function managerReducer (state = initialState, action) {
  switch (action.type) {
    case 'MANAGER_UPDATE':
      return {
        ...state,
        data: action.payload.data
      }
    case 'MANAGER_ACQUIRED':
      return {
        ...state,
        acquired: action.payload.acquired
      }
    case 'MANAGER_LOADING':
      return {
        ...state,
        loading: action.payload.loading
      }
    default:
      return state
  }
}
