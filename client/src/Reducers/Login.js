const initialState = {
  windsid: '',
  password: '',
  errorMessage: false,
  loading: false,
}

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_INPUT_WINDSID':
      return {
        ...state,
        windsid: action.payload.windsid,
      }
    case 'LOGIN_INPUT_PASSWORD':
      return {
        ...state,
        password: action.payload.password,
      }
    case 'LOGIN_TOKEN':
      return {
        ...state,
        token: action.payload.token,
      }
    case 'LOGIN_ERROR':
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      }
    case 'LOGIN_LOADING':
      return {
        ...state,
        loading: action.payload.loading,
      }
    default:
      return state
  }
}
