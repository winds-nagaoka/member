import React, { Component } from 'react'

import { connect } from 'react-redux'
// import { showToast } from '../../Actions/Toast'

import './Toast.css'

function mapStateToProps(state) {
  return {
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
    // const { showToast } = this.props
    console.log('Toast Render: Show: ' + status + ', Message: ' + string)
    if (status) {
      var className = 'toast'
      if (hide) {
        className += ' hide'
      }// else if (end) {
      //   className += 'end'
      // }
      console.warn(className)
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
