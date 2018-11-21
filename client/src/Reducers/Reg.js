const initialState = {
  windsid: '',
  password: '',
  approvalKey: '',
  error: false,
  loading: false
}

export default function regReducer(state = initialState, action) {
  switch (action.type) {
    case 'REG_INPUT_WINDSID':
      return {
        ...state,
        windsid: action.payload.windsid
      }
    case 'REG_INPUT_PASSWORD':
      return {
        ...state,
        password: action.payload.password
      }
    case 'REG_INPUT_KEY':
      return {
        ...state,
        approvalKey: action.payload.approvalKey
      }
    // case 'LOGIN_TOKEN':
    //   return {
    //     ...state,
    //     token: action.payload.token
    //   }
    case 'REG_ERROR':
      return {
        ...state,
        error: action.payload.error
      }
    case 'REG_LOADING':
      return {
        ...state,
        loading: action.payload.loading
      }
    default:
      return state
  }
}
