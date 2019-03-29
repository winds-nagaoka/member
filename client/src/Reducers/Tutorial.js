const initialState = {
  userAgent: undefined,
  standalone: undefined,

  displayTutorial: false,
  tutorialMode: undefined
}

const prefix = 'TUTORIAL_'

export default function sourceReducer (state = initialState, action) {
  switch (action.type) {
    case prefix + 'SET_USER_AGENT':
      return {
        ...state,
        userAgent: action.payload.userAgent
      }
    case prefix + 'SET_STANDALONE':
      return {
        ...state,
        standalone: action.payload.standalone
      }
    case prefix + 'SET_DISPLAY_TUTORIAL':
      return {
        ...state,
        displayTutorial: action.payload.displayTutorial,
        tutorialMode: action.payload.tutorialMode
      }
    default:
      return state
  }
}
