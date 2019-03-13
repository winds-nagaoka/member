const initialState = {
    loading: false
  }
  
  const prefix = 'SETTING_'
  
  export default function statusReducer (state = initialState, action) {
    switch (action.type) {
      case prefix + 'LOADING':
        return {
          ...state,
          loading: action.payload.loading
        }
      default:
        return state
    }
  }