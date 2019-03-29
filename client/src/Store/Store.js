import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware
} from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
// import authenticateReducer from '../Reducers/Authenticate'
import statusReducer from '../Reducers/Status'
import socketReducer from '../Reducers/Socket'

import audioReducer from '../Reducers/Audio'
import navigationReducer from '../Reducers/Navigation'
import toastReducer from '../Reducers/Toast'

import managerReducer from '../Reducers/Manager'
import scheduleReducer from '../Reducers/Schedule'
import historyReducer from '../Reducers/History'
import bbsReducer from '../Reducers/BBS'
import sourceReducer from '../Reducers/Source'

import castReducer from '../Reducers/Cast'

import archiveReducer from '../Reducers/Archive'
import scoreReducer from '../Reducers/Score'
import scoreBoxReducer from '../Reducers/ScoreBox'

import settingReducer from '../Reducers/Setting'

import tutorialReducer from '../Reducers/Tutorial'

import loginReducer from '../Reducers/Login'
import regReducer from '../Reducers/Reg'

// historyはsrc/App.jsから渡す
export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
      // authenticate: authenticateReducer,
      status: statusReducer,
      socket: socketReducer,

      audio: audioReducer,
      navigation: navigationReducer,
      toast: toastReducer,

      schedule: scheduleReducer,
      history: historyReducer,
      manager: managerReducer,
      bbs: bbsReducer,
      source: sourceReducer,

      cast: castReducer,

      archive: archiveReducer,
      score: scoreReducer,
      scoreBox: scoreBoxReducer,

      setting: settingReducer,

      tutorial: tutorialReducer,

      reg: regReducer,
      login: loginReducer,

      // react-router-reduxのReducer
      router: routerReducer,
      // history: historyReducer
    }),
    applyMiddleware(
      // logger,
      thunk,
      // react-router-reduxのRedux Middleware
      routerMiddleware(history)
    )
  )
}
