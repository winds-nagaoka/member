import React, { Component } from 'react'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

export default class App extends Component {
  render () {
    return (
      <Provider>
        <Router>
          <Switch>
            {/* <Route path='/login' component={Base} />
            <Route path='/reg' component={Base} />
            <Route path='/' component={Auth} /> */}
          </Switch>
        </Router>
      </Provider>
    )
  }
}