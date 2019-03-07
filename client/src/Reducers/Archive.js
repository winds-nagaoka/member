const initialState = {
  loading: false,
  concertList: undefined,
  // concertListLoad: false,
  displayMain: 'displayMain' in window.localStorage ? (window.localStorage.displayMain === 'true' ? true : false) : true,
  displayMini: 'displayMini' in window.localStorage ? (window.localStorage.displayMini === 'true' ? true : false) : true,
  displayOther: 'displayOther' in window.localStorage ? (window.localStorage.displayOther === 'true' ? true : false) : true,
  concertid: undefined,

  loadingPhoto: false,
  photoConcertid: undefined,
  photoList: undefined,
  photoBaseSrcThumbnail: undefined,
  photoBaseSrcOriginal: undefined,
  photoUrl: undefined,
  displayPhotoSlideModal: false,
  photoNumber: undefined,
}

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
    case prefix + 'SET_OVERVIEW_ID':
      return {
        ...state,
        concertid: action.payload.concertid
      }

    // Photo and PhotoSlide Component
    case prefix + 'LOADING_PHOTO':
      return {
        ...state,
        loading: action.payload.loading
      }
    case prefix + 'SET_PHOTO_LIST':
      return {
        ...state,
        photoConcertid: action.payload.photoConcertid,
        photoList: action.payload.photoList,
        photoBaseSrcThumbnail: action.payload.photoBaseSrcThumbnail,
        photoBaseSrcOriginal: action.payload.photoBaseSrcOriginal,
        photoUrl: action.payload.photoUrl
      }
    case prefix + 'SET_DISPLAY_PHOTO_SLIDE_MODAL':
      return {
        ...state,
        displayPhotoSlideModal: action.payload.displayPhotoSlideModal,
        photoNumber: action.payload.photoNumber
      }
    default:
      return state
  }
}