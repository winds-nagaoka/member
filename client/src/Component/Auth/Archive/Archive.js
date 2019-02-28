import React, { Component } from 'react'
import { Route, Switch, Redirect, Link } from 'react-router-dom'

import { connect } from 'react-redux'

import Home from './Home/Home'
import Overview from './Overview/Overview'

import './Archive.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

class Archive extends Component {
  render () {
    // State List
    const { pc } = this.props
    // Dispatch List
    // const { goBack } = this.props

    return (
      <div className={'archive' + (pc ? ' pc' : ' mobile')}>

        <Switch>
          <Route exact path='/archive' component={Home} />
          <Route path='/archive/overview/:id' component={Overview} />
        </Switch>

        <div className='box back-to-home'>
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

export default connect(mapStateToProps, mapDispatchToProps)(Archive)
