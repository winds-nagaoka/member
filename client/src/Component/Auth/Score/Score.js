import React, { Component } from 'react'
import { Route, Switch, Redirect, Link } from 'react-router-dom'

import { connect } from 'react-redux'

import * as lib from '../../../Library/Library'

import Home from './Home/Home'
import Detail from './Detail/Detail'
import Edit from './Edit/Edit'

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
          <Route path='/score/edit/:id' component={Edit} />
        </Switch>
        
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Score)
