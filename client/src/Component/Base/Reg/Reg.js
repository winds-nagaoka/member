import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { changeWindsid, changePassword, changeKey, register } from '../../../Actions/Reg'

function mapStateToProps(state) {
  return {
    windsid: state.reg.windsid,
    password: state.reg.password,
    approvalKey: state.reg.approvalKey,
    error: state.reg.error,
    loading: state.reg.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeWindsid (windsid) {
      dispatch(changeWindsid(windsid))
    },
    changePassword (password) {
      dispatch(changePassword(password))
    },
    changeKey (approvalKey) {
      dispatch(changeKey(approvalKey))
    },
    register () {
      dispatch(register())
    }
  }
}

class Reg extends Component {
  keyPress (e) {
    if (e.which === 13) this.props.register()
  }

  render () {
    const { windsid, password, approvalKey, error, loading } = this.props
    const { changeWindsid, changePassword, changeKey, register } = this.props
    const buttonLabel = loading ? '読み込み中' : '送信'
    const showError = error ? <div>{error}</div> : false
    return (
      <div>
        <div>新規登録</div>
        <div><Link to='/login'>ログイン</Link></div>
        <label>ユーザー名</label>
        <input type="text" value={windsid} onChange={(e) => changeWindsid(e.target.value)} onKeyPress={(e) => this.keyPress(e)} />
        <label>パスワード</label>
        <input type="pass" value={password} onChange={(e) => changePassword(e.target.value)} onKeyPress={(e) => this.keyPress(e)} />
        <label>承認キー</label>
        <input type="text" value={approvalKey} onChange={(e) => changeKey(e.target.value)} onKeyPress={(e) => this.keyPress(e)} />
        {showError}
        <button onClick={() => register()}>{buttonLabel}</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reg)
