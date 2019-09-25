import React, { Component } from 'react'
import { Route, Switch, Redirect, Link } from 'react-router-dom'

import { connect } from 'react-redux'

import Back from '../../../../Library/Icons/Back'
import * as lib from '../../../../Library/Library'

// import Home from './Home/Home'
import Admin from './Admin/Admin'
import Mail from './Mail/Mail'

import './Score.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

class Score extends Component {
  render () {
    return (
      <div className={'setting-score' + (lib.pcClass(this.props.pc))}>

        <Switch>
          {/* <Route exact path='/setting/score' component={Home} /> */}
          <Route exact path='/setting/score/admin' component={Admin} />
          <Route exact path='/setting/score/mail' component={Mail} />
        </Switch>

        <div className={'box' + lib.pcClass(this.props.pc)}>
          <div className='back-link'>
            <ul>
              <li><Link to='/setting'><div className='inner'><Back /><span>戻る</span></div></Link></li>
            </ul>
          </div>
        </div>
        {/* <div className='box back-to-home'>
          <div className='back-link'>
            <ul>
              <li className={'border-top-mobile border-bottom-mobile' + lib.pcClass(this.props.pc)}><Link to='/'><div className='inner'><Back /><span>ホーム</span></div></Link></li>
            </ul>
          </div>
        </div> */}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Score)
