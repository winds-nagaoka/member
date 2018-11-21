import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Login extends Component {
  render () {
    const { windsid, password, error, loading } = this.props
    const { changeWindsid, changePassword, login } = this.props
    const buttonLabel = loading ? '読み込み中' : '送信'
    const showError = error ? <div>{error}</div> : false
    return (
      <div>
        <div>ログイン</div>
        <div><Link to='/reg'>新規登録</Link></div>
        <label>ユーザー名</label>
        <input type="text" onChange={(e) => changeWindsid(e.target.value)} />
        <label>パスワード</label>
        <input type="pass" onChange={(e) => changePassword(e.target.value)} />
        {showError}
        <button onClick={() => login(windsid, password)}>{buttonLabel}</button>
      </div>
    )
  }
}