const initialState = {
  loading: false,
  boxList: undefined,
}

const prefix = 'SCOREBOX_'

export default function scoreBoxReducer (state = initialState, action) {
  switch (action.type) {
    case prefix + 'LOADING':
      return {
        ...state,
        loading: action.payload.loading
      }
    case prefix + 'SET_BOX_LIST':
      return {
        ...state,
        boxList: action.payload.boxList
      }
    default:
      return state
  }
}