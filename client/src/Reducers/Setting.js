const initialState = {
  loading: false,

  modifyText: '',
  loadingModify: false  
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
    default:
      return state
  }
}