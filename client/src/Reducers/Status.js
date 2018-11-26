const initialState = {
  login: false,
  windsid: '',
  token: '',
  loading: false,
  width: 0,
  pc: true,
  mobile: false,
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
    
    case 'STATUS_WINDOW_WIDTH':
      return {
        ...state,
        width: action.payload.width,
        pc: action.payload.pc,
        mobile: action.payload.mobile
      }
    // react-router-redux の Action をフック
    // リンク移動先を保存
    case '@@router/LOCATION_CHANGE':
      window.localStorage.setItem('location', action.payload.pathname)
      return {
        ...state,
      }
    default:
      return state
  }
}