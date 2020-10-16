const initialState = {
  title: false,
  titleConcertid: false,
  backNavigation: false,
  backNavigationPath: undefined,
  menuOpen: false,
}

const prefix = 'NAVIGATION_'

export default function navigationReducer(state = initialState, action) {
  switch (action.type) {
    case prefix + 'MENU':
      return {
        ...state,
        menuOpen: action.payload.menuOpen,
      }
    case prefix + 'SET_NAVIGATION_TITLE':
      return {
        ...state,
        title: action.payload.title,
      }
    case prefix + 'SET_NAVIGATION_TITLE_ARCHIVE_CONCERT_ID':
      return {
        ...state,
        titleConcertid: action.payload.titleConcertid,
      }
    case prefix + 'SET_BACKLINK':
      return {
        ...state,
        backNavigation: action.payload.backNavigation,
        backNavigationPath: action.payload.backNavigationPath,
      }
    default:
      return state
  }
}
