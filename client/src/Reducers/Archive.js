const initialState = {
  loading: false,
  concertList: undefined,
  // concertListLoad: false,
  displayMain: 'displayMain' in window.localStorage ? (window.localStorage.displayMain === 'true' ? true : false) : true,
  displayMini: 'displayMini' in window.localStorage ? (window.localStorage.displayMini === 'true' ? true : false) : true,
  displayOther: 'displayOther' in window.localStorage ? (window.localStorage.displayOther === 'true' ? true : false) : true,
  concertid: undefined,

  // Search
  loadingSearch: false,
  searchRef: undefined,
  searchQuery: '',
  searchResult: undefined,

  // Photo
  loadingPhoto: false,
  photoConcertid: undefined,
  photoList: undefined,
  photoBaseSrcThumbnail: undefined,
  photoBaseSrcOriginal: undefined,
  photoUrl: undefined,
  displayPhotoSlideModal: false,
  photoNumber: undefined,

  // Video
  loadingVideo: false,
  videoConcertid: undefined,
  videoList: undefined,
  videoBaseSrc: undefined,
  videoUrl: undefined,
  videoPoster: undefined,

  // プレイヤー操作
  videoRef: undefined,
  displayVideoController: false,
  // オーディオプレイヤーが開いていたか記録
  audioPlayerDisplay: undefined,
  loadingVideoSource: false,
  videoLoadPercent: undefined,

  videoCurrent: undefined,
  videoCurrentTime: undefined,
  videoDuration: undefined,
  videoDurationTime: undefined,
  videoPlayPercent: undefined,

  videoPlayStatus: undefined,
  videoPlayTrack: undefined,

  countFlag: true
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

    // Search
    case prefix + 'LOADING_SEARCH':
      return {
        ...state,
        loadingSearch: action.payload.loadingSearch
      }
    case prefix + 'SET_SEARCH_REF':
      return {
        ...state,
        searchRef: action.payload.searchRef
      }
    case prefix + 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload.searchQuery
      }
    case prefix + 'SET_SEARCH_RESULT':
      return {
        ...state,
        searchResult: action.payload.searchResult
      }

    // Photo and PhotoSlide Component
    case prefix + 'LOADING_PHOTO':
      return {
        ...state,
        loadingPhoto: action.payload.loadingPhoto
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

    // Video and VideoController Component
    case prefix + 'LOADING_VIDEO':
      return {
        ...state,
        loadingVideo: action.payload.loadingVideo
      }
    case prefix + 'SET_VIDEO_LIST':
      return {
        ...state,
        videoConcertid: action.payload.videoConcertid,
        videoList: action.payload.videoList,
        videoBaseSrc: action.payload.videoBaseSrc,
        videoUrl: action.payload.videoUrl,
        videoPoster: action.payload.videoPoster
      }

      // プレイヤー操作
    case prefix + 'SET_VIDEO_REF':
      return {
        ...state,
        videoRef: action.payload.videoRef
      }
    case prefix + 'SET_DISPLAY_VIDEO_CONTROLLER':
      return {
        ...state,
        displayVideoController: action.payload.displayVideoController,
        audioPlayerDisplay: action.payload.audioPlayerDisplay
      }
    case prefix + 'SET_LOADING_VIDEO_SOURCE':
      return {
        ...state,
        loadingVideoSource: action.payload.loadingVideoSource
      }
    case prefix + 'VIDEO_LOAD_PERCENT_UPDATE':
      return {
        ...state,
        videoLoadPercent: action.payload.videoLoadPercent
      }
    case prefix + 'VIDEO_PLAY_UPDATE':
      return {
        ...state,
        videoCurrent: action.payload.videoCurrent,
        videoCurrentTime: action.payload.videoCurrentTime,
        videoDuration: action.payload.videoDuration,
        videoDurationTime: action.payload.videoDurationTime,
        videoPlayPercent: action.payload.videoPlayPercent
      }
    case prefix + 'SET_VIDEO_PLAY_STATUS':
      return {
        ...state,
        videoPlayStatus: action.payload.videoPlayStatus,
        videoPlayTrack: action.payload.videoPlayTrack
      }

    case prefix + 'SET_COUNT_FLAG':
      return {
        ...state,
        countFlag: action.payload.countFlag
      }

    default:
      return state
  }
}