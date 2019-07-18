import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { changeWindsid, changePassword, login, setErrorMessage } from '../../../Actions/Login'

import Footer from '../Component/Footer/Footer'

import * as lib from '../../../Library/Library'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    windsid: state.login.windsid,
    password: state.login.password,
    errorMessage: state.login.errorMessage,
    loading: state.login.loading
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
    login () {
      dispatch(login())
    },
    setErrorMessage (string) {
      dispatch(setErrorMessage(string))
    }
  }
}

class Login extends Component {
  constructor (props) {
    super(props)
    this.inputRef = React.createRef()
  }

  componentDidMount () {
    if (this.inputRef) this.inputRef.focus()
  }

  componentWillUnmount () {
    this.props.changeWindsid('')
    this.props.changePassword('')
    this.props.setErrorMessage(false)
  }

  keyPress (e) {
    if (e.which === 13) this.props.login()
  }

  render () {
    const { windsid, password, errorMessage, loading } = this.props
    const { changeWindsid, changePassword, login } = this.props
    const buttonLabel = loading ? '読み込み中' : '送信'
    const disabled = (windsid && password) ? (loading ? true : false) : true
    const showError = errorMessage ? <div className='error'>{errorMessage}</div> : false
    return (
      <div className={'contents' + lib.pcClass(this.props.pc)}>
        <div className={'form-base login' + lib.pcClass(this.props.pc)}>
          <div className={'form login' + lib.pcClass(this.props.pc)}>
            <h2 className={lib.pcClass(this.props.pc)}>ログイン</h2>
            <label>ユーザー名</label>
            <input type='text' tabIndex='1' onChange={(e) => changeWindsid(e.target.value)} onKeyPress={(e) => this.keyPress(e)} ref={(i) => this.inputRef = i} />
            <label>パスワード</label>
            <input type='password' tabIndex='2' onChange={(e) => changePassword(e.target.value)} onKeyPress={(e) => this.keyPress(e)} />
            {showError}
            <div className='links'>
              <div className='link'><Link to='/reg' tabIndex='-1'>新規登録はこちら</Link></div>
              <button tabIndex='3' onClick={() => this.props.login()} disabled={disabled}>{buttonLabel}</button>
            </div>
          </div>
        </div>
        <div className='old'><a href='https://winds-n.com/old'>旧団員専用ページはこちら</a></div>
        <Footer />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
