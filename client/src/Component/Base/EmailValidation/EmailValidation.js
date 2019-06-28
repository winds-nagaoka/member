import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { setKey, checkAuth, requestLogin, changeWindsid, changePassword } from '../../../Actions/EmailValidation'

import Footer from '../Component/Footer/Footer'

import * as lib from '../../../Library/Library'

import './EmailValidation.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    loading: state.emailValidation.loading,
    key: state.emailValidation.key,
    windsid: state.emailValidation.windsid,
    password: state.emailValidation.password,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setKey (key) {
      dispatch(setKey(key))
    },
    checkAuth (key) {
      dispatch(checkAuth(key))
    },
    requestLogin () {
      dispatch(requestLogin())
    },
    changeWindsid (windsid) {
      dispatch(changeWindsid(windsid))
    },
    changePassword (password) {
      dispatch(changePassword(password))
    }
  }
}

class EmailValidation extends Component {
  constructor (props) {
    super(props)
    const { params } = this.props.match
    const key = params.key ? params.key : ''
    this.props.setKey(key)
    this.props.checkAuth(key)
    this.inputRef = React.createRef()
  }

  componentDidMount () {
    if (this.inputRef) this.inputRef.focus()
  }

  keyPress (e) {
    if (e.which === 13) this.props.requestLogin()
  }

  render () {
    // if (this.props.loading) return <div>読み込み中</div>
    const { windsid, password, errorMessage, loading } = this.props
    const { changeWindsid, changePassword } = this.props
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
              <button tabIndex='3' onClick={() => this.props.requestLogin()} disabled={disabled}>{buttonLabel}</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailValidation)
