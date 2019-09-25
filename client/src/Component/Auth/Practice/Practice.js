import React, { Component } from 'react'
import { Route, Switch, Redirect, Link } from 'react-router-dom'

import { connect } from 'react-redux'

import Schedule from './Schedule/Schedule'
import History from './History/History'

import Back from '../../../Library/Icons/Back'
import * as lib from '../../../Library/Library'

// import { goBack } from 'react-router-redux'

import './Practice.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

class Practice extends Component {
  render () {
    // State List
    const { pc } = this.props
    // Dispatch List
    // const { goBack } = this.props

    return (
      <div className={'practice' + lib.pcClass(pc)}>

        <Switch>
          <Route exact path='/practice' component={Schedule} />
          <Route exact path='/practice/history' component={History} />
        </Switch>

        <div className={'box back-to-home' + lib.pcClass(pc)}>
          <div className='back-link'>
            <ul>
              <li><Link to='/'><div className='inner'><Back /><span>ホーム</span></div></Link></li>
            </ul>
          </div>
        </div>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Practice)
