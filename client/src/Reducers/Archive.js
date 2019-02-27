const initialState = {
  loading: false,
  concertList: undefined,
  // concertListLoad: false,
  displayMain: 'displayMain' in window.localStorage ? (window.localStorage.displayMain === 'true' ? true : false) : true,
  displayMini: 'displayMini' in window.localStorage ? (window.localStorage.displayMini === 'true' ? true : false) : true,
  displayOther: 'displayOther' in window.localStorage ? (window.localStorage.displayOther === 'true' ? true : false) : true
}

console.warn('reducer', 'displayMain' in window.localStorage, window.localStorage.displayMain)

const prefix = 'ARCHIVE_'

export default function archiveReducer (state = initialState, action) {
  switch (action.type) {
    case prefix + 'LOADING':
      return {
        ...state,
        loading: action.payload.loading
      }
    case prefix + 'SET_CONCERT_LIST':
      return {
        ...state,
        concertList: action.payload.concertList
      }
    // case prefix + 'SET_CONCERT_LIST_LOAD':
    //   return {
    //     ...state,
    //     concertListLoad: action.payload.concertListLoad
    //   }
    case prefix + 'SET_DISPLAY_MAIN':
      return {
        ...state,
        displayMain: action.payload.displayMain
      }
    case prefix + 'SET_DISPLAY_MINI':
      return {
        ...state,
        displayMini: action.payload.displayMini
      }
    case prefix + 'SET_DISPLAY_OTHER':
      return {
        ...state,
        displayOther: action.payload.displayOther
      }
    default:
      return state
  }
}