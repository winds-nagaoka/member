import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware
} from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import loginReducer from '../Reducers/Login'

// historyはsrc/index.jsから渡す
export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
      login: loginReducer,
      // react-router-reduxのReducer
      router: routerReducer,
    }),
    applyMiddleware(
      logger, thunk,
      // react-router-reduxのRedux Middleware
      routerMiddleware(history)
    )
  )
}
