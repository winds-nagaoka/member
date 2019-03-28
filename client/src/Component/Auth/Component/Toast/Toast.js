import React, { Component } from 'react'

import { connect } from 'react-redux'

import './Toast.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    string: state.toast.string,
    status: state.toast.status,
    hide: state.toast.hide,
    end: state.toast.end
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // showToast (string) {
    //   dispatch(showToast(string))
    // }
  }
}

class Toast extends Component {
  render () {
    const { string, status, hide, end } = this.props
    if (status) {
      var className = 'toast'
      if (hide) {
        className += ' hide'
      }
      return (
        <div className={className}>
          <div>
            {string}
          </div>
        </div>
      )
    } else {
      return <div></div>
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toast)
