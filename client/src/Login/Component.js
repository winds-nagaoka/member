import React, { Component } from 'react'

export default class Login extends Component {
  render () {
    const { windsid, password, loading } = this.props
    const { changeWindsid, changePassword, login } = this.props
    const buttonLabel = loading ? '読み込み中' : '送信'
    return (
      <div>
        <input type="text" onChange={(e) => changeWindsid(e.target.value)} />
        <input type="pass" onChange={(e) => changePassword(e.target.value)} />
        <button onClick={() => login(windsid, password)}>{buttonLabel}</button>
      </div>
    )
  }
}