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

import navigationReducer from '../Reducers/Navigation'

import toastReducer from '../Reducers/Toast'

import managerReducer from '../Reducers/Manager'
import scheduleReducer from '../Reducers/Schedule'
import bbsReducer from '../Reducers/BBS'

import castReducer from '../Reducers/Cast'

import loginReducer from '../Reducers/Login'
import regReducer from '../Reducers/Reg'

// historyはsrc/App.jsから渡す
export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
      // authenticate: authenticateReducer,
      status: statusReducer,
      socket: socketReducer,

      navigation: navigationReducer,
      toast: toastReducer,

      schedule: scheduleReducer,
      manager: managerReducer,
      bbs: bbsReducer,

      cast: castReducer,

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
