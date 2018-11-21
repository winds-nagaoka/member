import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import createBrowserHistory from 'history/createBrowserHistory'

import Login from './Login/Container'
import createStore from './Store/Store'

const history = createBrowserHistory()
const store = createStore(history)

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path='/' component={Login} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    )
  }
}