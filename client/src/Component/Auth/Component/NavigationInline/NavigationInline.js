import React, { Component } from 'react'

import { connect } from 'react-redux'

import NavigationMenuContents from '../NavigationMenuContents/NavigationMenuContents'

import './NavigationInline.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

class NavigationInline extends Component {
  render () {
    const { pc } = this.props
    if (pc) {
      return (
        <div className='menu-contents-inline'>
          <NavigationMenuContents />
        </div>
      )
    } else {
      return <div></div>
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationInline)
