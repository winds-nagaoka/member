import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { loginAuth, windowWidthChange } from '../../Actions/Status'

import Login from './Login/Login'
import Reg from './Reg/Reg'

import Header from './Component/Header/Header'

import Loading from '../Loading/Loading'

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
    },
    windowWidthChange () {
      dispatch(windowWidthChange())
    }
  }
}

class Base extends Component {
  componentWillMount () {
    this.props.loginAuth()
  }

  componentDidMount () {
    this.props.windowWidthChange()
    window.addEventListener('resize', () => {
      this.props.windowWidthChange()
    })
  }

  componentWillUnmount () {
    window.removeEventListener('resize', () => {})
  }

  render () {
    const { login, loading } = this.props
    if (login) return <Redirect to='/' />
    // if (loading) return <div className='full-loading'><div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div></div>
    if (loading) return <Loading />
    return (
      <div className='base'>
        <Header />
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/reg' component={Reg} />
        </Switch>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Base)
