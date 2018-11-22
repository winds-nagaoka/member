const initialState = {
  data: undefined,
  acquired: false,
  loading: false
}

export default function scheduleReducer (state = initialState, action) {
  switch (action.type) {
    case 'SCHEDULE_UPDATE':
      return {
        ...state,
        data: action.payload.data
      }
    case 'SCHEDULE_ACQUIRED':
      return {
        ...state,
        acquired: action.payload.acquired
      }
    case 'SCHEDULE_LOADING':
      return {
        ...state,
        loading: action.payload.loading
      }
    default:
      return state
  }
}
