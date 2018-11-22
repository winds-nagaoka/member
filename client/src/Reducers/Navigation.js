const initialState = {
  title: false,
  menuOpen: false
}

export default function navigationReducer (state = initialState, action) {
  switch (action.type) {
    case 'NAVIGATION_MENU':
      return {
        ...state,
        menuOpen: action.payload.menuOpen
      }
    case 'NAVIGATION_TITLE_UPDATE':
      return {
        ...state,
        title: action.payload.title
      }
    default:
      return state
  }
}