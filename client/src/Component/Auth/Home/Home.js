import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { connectSocket } from '../../../Actions/Socket'
import { logout } from '../../../Actions/Status'

function mapStateToProps(state) {
  return {
    socketid: state.socket.id
  }
}

function mapDispatchToProps(dispatch) {
  return {
    connectSocket () {
      dispatch(connectSocket())
    },
    logout () {
      dispatch(logout())
    }
  }
}

class Home extends Component {
  componentDidMount () {
    this.props.connectSocket()
  }

  render () {
    // State List
    const { socketid } = this.props
    // Dispatch List
    const { logout } = this.props
    return (
      <div>
        Auth
        <button onClick={() => logout()}>ログアウト</button>
        {socketid}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
