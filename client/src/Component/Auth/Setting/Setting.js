import React, { Component } from 'react'
import { Route, Switch, Redirect, Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { scrollToTop } from '../../../Actions/Status'

import Back from '../../../Library/Icons/Back'
import * as lib from '../../../Library/Library'

import Home from './Home/Home'
import Name from './Name/Name'
import Email from './Email/Email'
import EmailValidation from './EmailValidation/EmailValidation'
import Password from './Password/Password'
import SessionList from './SessionList/SessionList'
import Admin from './Admin/Admin'
import AccountDelete from './AccountDelete/AccountDelete'
import Score from './Score/Score'
import Terms from './Terms/Terms'
import License from './License/License'
import About from './About/About'

import './Setting.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    scrollToTop () {
      dispatch(scrollToTop())
    }
  }
}

class Setting extends Component {

  componentWillReceiveProps () {
    this.props.scrollToTop()
  }

  render () {
    return (
      <div className={'setting' + (lib.pcClass(this.props.pc))}>

        <Switch>
          <Route exact path='/setting' component={Home} />
          <Route exact path='/setting/name' component={Name} />
          <Route exact path='/setting/email' component={Email} />
          <Route exact path='/setting/valid/:key' component={EmailValidation} />
          <Route exact path='/setting/password' component={Password} />
          <Route exact path='/setting/session' component={SessionList} />
          <Route exact path='/setting/admin' component={Admin} />
          <Route exact path='/setting/delete' component={AccountDelete} />
          <Route exact path='/setting/terms' component={Terms} />
          <Route exact path='/setting/about' component={About} />
          <Route exact path='/setting/license' component={License} />
          <Route path='/setting/score' component={Score} />
        </Switch>

        <div className='box back-to-home'>
          <div className='back-link'>
            <ul>
              <li className={'border-top-mobile border-bottom-mobile' + lib.pcClass(this.props.pc)}><Link to='/'><div className='inner'><Back /><span>ホーム</span></div></Link></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting)
