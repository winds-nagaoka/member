import React, { Component } from 'react'
import { Route, Switch, Redirect, Link } from 'react-router-dom'

import { connect } from 'react-redux'

import * as lib from '../../../Library/Library'

import Home from './Home/Home'
import Name from './Name/Name'
import Email from './Email/Email'

import './Setting.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

class Setting extends Component {
  render () {
    return (
      <div className={'setting' + (lib.pcClass(this.props.pc))}>

        <Switch>
          <Route exact path='/setting' component={Home} />
          <Route exact path='/setting/name' component={Name} />
          <Route exact path='/setting/email' component={Email} />
        </Switch>

        <div className='box back-to-home'>
          <div className='back-link'>
            <ul>
              <li className={'border-top-mobile border-bottom-mobile' + lib.pcClass(this.props.pc)}><Link to='/'><div className='inner'><i className="fas fa-angle-left"></i><span>ホーム</span></div></Link></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting)
