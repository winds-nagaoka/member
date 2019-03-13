const initialState = {
  login: false,
  user: undefined,
  windsid: '',
  token: '',
  loading: false,
  width: 0,
  pc: true,
  mobile: false,
  contentsRef: undefined
}

const prefix = 'STATUS_'

export default function statusReducer (state = initialState, action) {
  switch (action.type) {
    case prefix + 'LOGIN':
      return {
        ...state,
        login: action.payload.login
      }
    case prefix + 'SET_USER':
      return {
        ...state,
        user: action.payload.user
      }
    case prefix + 'WINDSID':
      return {
        ...state,
        windsid: action.payload.windsid
      }
    case prefix + 'TOKEN':
      return {
        ...state,
        token: action.payload.token
      }
    case prefix + 'LOADING':
      return {
        ...state,
        loading: action.payload.loading
      }
    case prefix + 'WINDOW_WIDTH':
      return {
        ...state,
        width: action.payload.width,
        pc: action.payload.pc,
        mobile: action.payload.mobile
      }
    case prefix + 'SET_CONTENTS_REF':
      return {
        ...state,
        contentsRef: action.payload.contentsRef
      }
    // react-router-redux の Action をフック
    // リンク移動先を保存
    // case '@@router/LOCATION_CHANGE':
    //   window.localStorage.setItem('location', action.payload.pathname)
    //   return {
    //     ...state,
    //   }
    default:
      return state
  }
}