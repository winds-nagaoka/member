import React, { Component } from 'react'
import { Route, Switch, Redirect, Link } from 'react-router-dom'

import { connect } from 'react-redux'

import * as lib from '../../../Library/Library'

import Home from './Home/Home'
import Detail from './Detail/Detail'
import Box from './Box/Box'

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
      <div className={'score' + (lib.pcClass(this.props.pc))}>

        <Switch>
          <Route exact path='/score' component={Home} />
          <Route path='/score/detail/:id' component={Detail} />
          <Route exact path='/score/box' component={Box} />
        </Switch>

        <div className={'box back-to-home' + lib.pcClass(this.props.pc)}>
          <div className='back-link'>
            <ul>
              <li><Link to='/'><div className='inner'><i className="fas fa-angle-left"></i><span>ホーム</span></div></Link></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Score)
