import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { loginAuth, windowWidthChange } from '../../Actions/Status'

// import { replace } from 'react-router-redux'

import Home from './Home/Home'
import Schedule from './Schedule/Schedule'
import Manager from './Manager/Manager'

import NavigationHeader from './Component/NavigationHeader/NavigationHeader'
import NavigationInline from './Component/NavigationInline/NavigationInline'

import Toast from './Component/Toast/Toast'

import './Auth.css'

function mapStateToProps(state) {
  return {
    login: state.status.login,
    loading: state.status.loading,
    pc: state.status.pc
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loginAuth (location) {
      dispatch(loginAuth(location))
    },
    windowWidthChange () {
      dispatch(windowWidthChange())
    },
    // replace (path) {
    //   dispatch(replace(path))
    // }
  }
}

class Auth extends Component {
  componentWillMount () {
    this.props.loginAuth(window.localStorage.location ? window.localStorage.location : false)
  }

  componentWillReceiveProps () {
    // this.contents.scrollTop = 0
  }

  componentDidUpdate () {

    // console.warn('update')
  }
  
  componentDidMount () {
    this.props.windowWidthChange()
    window.addEventListener('resize', () => {
      this.props.windowWidthChange()
    })

    // this.contents.scrollTop = 0
  }

  componentWillUnmount () {
    window.removeEventListener('resize', () => {})
  }

  render () {
    const { login, loading, pc } = this.props
    if (loading) return <div className='full-loading'><div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div></div>
    if (!login) return <Redirect to='/login' />
    return (
      <div className='auth'>
        <Toast />
        <NavigationHeader />
        <div className={'contents' + (pc ? ' pc' : ' mobile')} ref={(i) => this.contents = i}>
          <div className={pc ? 'flex-frame': ''}>
            <NavigationInline />
            <div className={pc ? 'inline-contents' : ''}>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/schedule' component={Schedule} />
                <Route path='/manager' component={Manager} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
