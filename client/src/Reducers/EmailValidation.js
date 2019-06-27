const initialState = {
  loading: false,
  key: undefined,
  valid: false,
  windsid: '',
  password: '',
  err: undefined,
  errorMessage: false,
}

const prefix = 'EMAIL_VALIDATION_'

export default function emailValidationReducer (state = initialState, action) {
  switch (action.type) {
    case prefix + 'LOADING':
      return {
        ...state,
        loading: action.payload.loading
      }
    case prefix + 'SET_KEY':
      return {
        ...state,
        key: action.payload.key
      }
    case prefix + 'SET_VALID':
      return {
        ...state,
        valid: action.payload.valid
      }
    case 'LOGIN_INPUT_WINDSID':
      return {
        ...state,
        windsid: action.payload.windsid
      }
    case 'LOGIN_INPUT_PASSWORD':
      return {
        ...state,
        password: action.payload.password
      }
    case prefix + 'SET_ERROR':
      return {
        ...state,
        err: action.payload.err
      }
    case prefix + 'SET_ERROR_MESSAGE': 
      return {
        ...state,
        errorMessage: action.payload.errorMessage
      }
    default:
      return state
  }
}
