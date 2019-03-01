import React, { Component } from 'react'

import { connect } from 'react-redux'

import * as lib from '../../../../Library/Library'

import './Footer.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

class Footer extends Component {
  render () {
    const { pc } = this.props
    return (
      <footer>
        <small>&copy;&nbsp;<a href='https://winds-n.com'>The Wind Ensemble</a></small>
      </footer>
    )

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
