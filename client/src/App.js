import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import createStore from './Store/Store'

import Login from './Component/Login/Container'
import Reg from './Component/Reg/Container'

const history = createBrowserHistory()
const store = createStore(history)

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/reg' component={Reg} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    )
  }
}