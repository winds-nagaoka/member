const initialState = {
  string: '',
  status: false,
  hide: true,
  end: true,
}

export default function toastReducer (state = initialState, action) {
  switch (action.type) {
    case 'TOAST_DISPLAY':
      return {
        ...state,
        string: action.payload.string,
        status: action.payload.status,
        hide: action.payload.hide,
        end: action.payload.end
      }
    case 'TOAST_HIDE':
      return {
        ...state,
        status: action.payload.status,
        hide: action.payload.hide,
        end: action.payload.end
      }
    case 'TOAST_END':
      return {
        ...state,
        string: action.payload.string,
        status: action.payload.status,
        hide: action.payload.hide,
        end: action.payload.end
      }
    default:
      return state
  }
}
