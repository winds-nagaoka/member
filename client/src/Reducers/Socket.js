const initialState = {
  status: false,
  id: undefined,
}

export default function socketReducer(state = initialState, action) {
  switch (action.type) {
    case 'SOCKET_CONNECT':
      return {
        ...state,
        status: action.payload.status,
        id: action.payload.id,
      }
    default:
      return state
  }
}
