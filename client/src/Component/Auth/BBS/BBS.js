import React, { Component } from 'react'
import { Route, Switch, Redirect, Link } from 'react-router-dom'

import { connect } from 'react-redux'

import * as lib from '../../../Library/Library'

import Home from './Home/Home'
import Post from './Post/Post'

import './BBS.css'

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
      <div className={'bbs' + lib.pcClass(this.props.pc)}>

        <Switch>
          <Route exact path='/bbs' component={Home} />
          <Route path='/bbs/post' component={Post} />
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
