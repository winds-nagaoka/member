import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import createStore from './Store/Store'

import Base from './Component/Base/Base'
import Auth from './Component/Auth/Auth'

import Toast from './Component/Toast/Toast'

const history = createBrowserHistory()
const store = createStore(history)

// react-router-redux の Action をフック
// リンク移動先を保存
history.listen(location => {
  if (history.action === 'PUSH') {
    let list = window.localStorage.history ? JSON.parse(window.localStorage.history) : []
    list.push(location.pathname)
    window.localStorage.setItem('history', JSON.stringify(list))
  }
  window.localStorage.setItem('location', location.pathname)
})

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <React.Fragment>
            <Toast />
            <Switch>
              <Route path='/login' component={Base} />
              <Route path='/reg' component={Base} />
              <Route path='/' component={Auth} />
            </Switch>
          </React.Fragment>
        </ConnectedRouter>
      </Provider>
    )
  }
}