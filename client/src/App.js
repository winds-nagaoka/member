import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import createStore from './Store/Store'

import Base from './Component/Base/Base'
import Auth from './Component/Auth/Auth'

// import Toast from './Component/Component/Toast/Toast'

const history = createBrowserHistory()
const store = createStore(history)

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/login' component={Base} />
            <Route path='/reg' component={Base} />
            <Route path='/' component={Auth} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    )
  }
}