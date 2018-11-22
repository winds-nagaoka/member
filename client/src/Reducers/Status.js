const initialState = {
  login: false,
  windsid: '',
  token: '',
  loading: false
}

export default function statusReducer (state = initialState, action) {
  switch (action.type) {
    case 'STATUS_LOGIN':
      return {
        ...state,
        login: action.payload.login
      }
    case 'STATUS_WINDSID':
      return {
        ...state,
        windsid: action.payload.windsid
      }
    case 'STATUS_TOKEN':
      return {
        ...state,
        token: action.payload.token
      }
    case 'STATUS_LOADING':
      return {
        ...state,
        loading: action.payload.loading
      }
    default:
      return state
  }
}