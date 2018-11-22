import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { loginAuth } from '../../Actions/Status'

// import Login from './Login/Container'
// import Reg from './Reg/Container'

import Home from './Home/Home'

// import './Base.css'

function mapStateToProps(state) {
  return {
    login: state.status.login,
    loading: state.status.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loginAuth () {
      dispatch(loginAuth())
    }
  }
}

class Auth extends Component {
  componentWillMount () {
    this.props.loginAuth()
  }

  render () {
    const { login, loading } = this.props
    if (loading) return <div>読み込み中...</div>
    if (!login) return <Redirect to='/login' />
    return (
      <div className='auth'>
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
