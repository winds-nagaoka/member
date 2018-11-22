import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Dashboard extends Component {
  render () {
    const { logout } = this.props
    return (
      <div>
        Auth
        <button onClick={() => logout()}>ログアウト</button>
      </div>
    )
  }
}