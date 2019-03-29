import React, { Component } from 'react'

import { connect } from 'react-redux'

import * as lib from '../../../../Library/Library'

import WindsLogo from '../../../../Asset/logo.svg'

import './Header.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

class Header extends Component {
  render () {
    const { pc } = this.props
    return (
      <div className='navigation-header'>
        <div className={'header' + lib.pcClass(pc)}>
          <div className='logo'><a href='https://winds-n.com'><WindsLogo /></a></div>
        </div>
      </div>
    )

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
