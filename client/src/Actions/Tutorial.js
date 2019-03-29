import { audioPause } from './Audio'

const prefix = 'TUTORIAL_'

export const openFirstTutorial = () => {
  return async (dispatch) => {
    dispatch(setStandalone())
    dispatch(setUserAgent())
    dispatch(setDisplayTutorial(true, 'first'))
    // 音楽再生中の場合は一時停止する
    dispatch(audioPause())
  }
}

export const requestFirstTutorial = () => {
  return async (dispatch) => {
    dispatch(setStandalone())
    dispatch(setUserAgent())
    if (!window.matchMedia('(display-mode: standalone)').matches && getUserAgent() !== 'other') {
      dispatch(setDisplayTutorial(true, 'first'))
    }
    // 音楽再生中の場合は一時停止する
    dispatch(audioPause())
  }
}

const setUserAgent = () => ({
  type: prefix + 'SET_USER_AGENT',
  payload: { userAgent: getUserAgent() }
})

function getUserAgent () {
  let ua = ['iPod', 'iPad', 'iPhone', 'Android']
  let result = false
	for (let i = 0; i < ua.length; i++) {
		if (navigator.userAgent.indexOf(ua[i]) > 0) result = ua[i]
	}
	return result ? result : 'other'
}

const setStandalone = () => ({
  type: prefix + 'SET_STANDALONE',
  payload: { standalone: window.matchMedia('(display-mode: standalone)').matches ? true : false }
})

// 閉じるときに使う
export const setDisplayTutorial = (displayTutorial, tutorialMode) => ({
  type: prefix + 'SET_DISPLAY_TUTORIAL',
  payload: { displayTutorial, tutorialMode }
})