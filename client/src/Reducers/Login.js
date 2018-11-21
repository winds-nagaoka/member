const initialState = {
  windsid: '',
  password: '',
  loading: false
}

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case 'INPUT_WINDSID':
      return {
        ...state,
        windsid: action.payload.windsid
      }
    case 'INPUT_PASSWORD':
      return {
        ...state,
        password: action.payload.password
      }
    case 'LOGIN_TOKEN':
      return {
        ...state,
        token: action.payload.token
      }
    case 'LOGIN_LOADING':
      return {
        ...state,
        loading: action.payload.loading
      }
    default:
      return state
  }
}
