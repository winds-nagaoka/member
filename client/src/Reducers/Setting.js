const initialState = {
  loading: false,

  modifyText: '',
  loadingModify: false,

  loadingDeleteEmailRequest: false,

  // Password
  oldPassword: '',
  newPassword: '',
  loadingUpdatePassword: false,

  // Administrator
  loadingAdminRequest: false,
  adminRequestPass: '',

  // Delete Account
  deletePassword: '',
  loadingDeleteAccount: false,

  // Score Setting
  loadingScoreAdminRequest: false,
  scoreAdminRequestPass: '',

  loadingScoreCount: false,
  scoreCount: undefined,
  loadingScoreMailRequest: false,
}

const prefix = 'SETTING_'

export default function settingReducer (state = initialState, action) {
  switch (action.type) {
    case prefix + 'LOADING':
      return {
        ...state,
        loading: action.payload.loading
      }

    case prefix + 'SET_MODIFY_TEXT':
      return {
        ...state,
        modifyText: action.payload.modifyText
      }
    case prefix + 'LOADING_MODIFY':
      return {
        ...state,
        loadingModify: action.payload.loadingModify
      }

    case prefix + 'LOADING_DELETE_EMAIL_REQUEST':
      return {
        ...state,
        loadingDeleteEmailRequest: action.payload.loadingDeleteEmailRequest
      }

    // Password
    case prefix + 'SET_OLD_PASSWORD':
      return {
        ...state,
        oldPassword: action.payload.oldPassword
      }
    case prefix + 'SET_NEW_PASSWORD':
      return {
        ...state,
        newPassword: action.payload.newPassword
      }
    case prefix + 'LOADING_UPDATE_PASSWORD':
      return {
        ...state,
        loadingUpdatePassword: action.payload.loadingUpdatePassword
      }

    // Administrator
    case prefix + 'LOADING_ADMIN_REQUEST':
      return {
        ...state,
        loadingAdminRequest: action.payload.loadingAdminRequest
      }
    case prefix + 'SET_ADMIN_REQUEST_PASS':
      return {
        ...state,
        adminRequestPass: action.payload.adminRequestPass
      }

    // Delete Account
    case prefix + 'SET_DELETE_PASSWORD':
      return {
        ...state,
        deletePassword: action.payload.deletePassword
      }
    case prefix + 'LOADING_DELETE_ACCOUNT':
      return {
        ...state,
        loadingDeleteAccount: action.payload.loadingDeleteAccount
      }

    // Score Setting
    case prefix + 'LOADING_SCORE_ADMIN_REQUEST':
      return {
        ...state,
        loadingScoreAdminRequest: action.payload.loadingScoreAdminRequest
      }
    case prefix + 'SET_SCORE_ADMIN_REQUEST_PASS':
      return {
        ...state,
        scoreAdminRequestPass: action.payload.scoreAdminRequestPass
      }

    case prefix + 'LOADING_SCORE_COUNT':
      return {
        ...state,
        loadingScoreCount: action.payload.loadingScoreCount
      }
    case prefix + 'SET_SCORE_COUNT':
      return {
        ...state,
        scoreCount: action.payload.scoreCount
      }

    case prefix + 'LOADING_SCORE_MAIL_REQUEST':
      return {
        ...state,
        loadingScoreMailRequest: action.payload.loadingScoreMailRequest
      }
    default:
      return state
  }
}