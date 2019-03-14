import React, { Component } from 'react'
import { Route, Switch, Redirect, Link } from 'react-router-dom'

import { connect } from 'react-redux'

import * as lib from '../../../Library/Library'

import Home from './Home/Home'
import Overview from './Overview/Overview'
import Photo from './Photo/Photo'
import Video from './Video/Video'

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
    return (
      <div className={'archive' + lib.pcClass(this.props.pc)}>

        <Switch>
          <Route exact path='/archive' component={Home} />
          <Route path='/archive/overview/:id' component={Overview} />
          <Route path='/archive/photo/:id' component={Photo} />
          <Route path='/archive/video/:id/:track' component={Video} />
          <Route path='/archive/video/:id' component={Video} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Archive)
