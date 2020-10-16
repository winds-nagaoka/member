const initialState = {
  mode: false,
  windsid: '',
  password: '',
  approvalKey: '',
  errorMessage: false,
  loading: false,
}

export default function regReducer(state = initialState, action) {
  switch (action.type) {
    case 'REG_SET_MODE':
      return {
        ...state,
        mode: action.payload.mode,
      }
    case 'REG_INPUT_WINDSID':
      return {
        ...state,
        windsid: action.payload.windsid,
      }
    case 'REG_INPUT_PASSWORD':
      return {
        ...state,
        password: action.payload.password,
      }
    case 'REG_INPUT_KEY':
      return {
        ...state,
        approvalKey: action.payload.approvalKey,
      }
    // case 'LOGIN_TOKEN':
    //   return {
    //     ...state,
    //     token: action.payload.token
    //   }
    case 'REG_ERROR':
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      }
    case 'REG_LOADING':
      return {
        ...state,
        loading: action.payload.loading,
      }
    default:
      return state
  }
}
