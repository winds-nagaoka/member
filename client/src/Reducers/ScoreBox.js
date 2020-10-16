const initialState = {
  loading: false,
  boxList: undefined,
  acquired: false,

  displayBoxModal: false,
  modalContent: undefined,

  inputBoxLocate: '',
  loadingUpdateBoxLocate: false,

  loadingAddBox: false,
}

const prefix = 'SCOREBOX_'

export default function scoreBoxReducer(state = initialState, action) {
  switch (action.type) {
    case prefix + 'LOADING':
      return {
        ...state,
        loading: action.payload.loading,
      }
    case prefix + 'SET_BOX_LIST':
      return {
        ...state,
        boxList: action.payload.boxList,
      }
    case prefix + 'ACQUIRED':
      return {
        ...state,
        acquired: action.payload.acquired,
      }
    case prefix + 'SET_DISPLAY_BOX_MODAL':
      return {
        ...state,
        displayBoxModal: action.payload.displayBoxModal,
        modalContent: action.payload.modalContent,
        inputBoxLocate: action.payload.inputBoxLocate,
      }
    case prefix + 'LOADING_UPDATE_BOX_LOCATE':
      return {
        ...state,
        loadingUpdateBoxLocate: action.payload.loadingUpdateBoxLocate,
      }
    case prefix + 'CHANGE_INPUT_BOX_LOCATE':
      return {
        ...state,
        inputBoxLocate: action.payload.inputBoxLocate,
      }
    case prefix + 'LOADING_ADD_BOX':
      return {
        ...state,
        loadingAddBox: action.payload.loadingAddBox,
      }
    default:
      return state
  }
}
