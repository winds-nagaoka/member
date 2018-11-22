import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { loginAuth } from '../../Actions/Status'

import Login from './Login/Login'
import Reg from './Reg/Reg'

import './Base.css'

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

class Base extends Component {
  componentWillMount () {
    this.props.loginAuth()
  }

  render () {
    const { login, loading } = this.props
    if (login) return <Redirect to='/' />
    if (loading) return <div className='full-loading'><div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div></div>
    return (
      <div className='base'>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/reg' component={Reg} />
        </Switch>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Base)
