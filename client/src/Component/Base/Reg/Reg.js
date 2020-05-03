import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { updateMode, resetMode, changeWindsid, changePassword, changeKey, register, setErrorMessage } from '../../../Actions/Reg'

import Footer from '../Component/Footer/Footer'

import * as lib from '../../../Library/Library'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    mode: state.reg.mode,
    windsid: state.reg.windsid,
    password: state.reg.password,
    approvalKey: state.reg.approvalKey,
    errorMessage: state.reg.errorMessage,
    loading: state.reg.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateMode () {
      dispatch(updateMode())
    },
    resetMode () {
      dispatch(resetMode())
    },
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
    },
    setErrorMessage (string) {
      dispatch(setErrorMessage(string))
    }
  }
}

class Reg extends Component {
  constructor (props) {
    super(props)
    this.inputKeyRef = React.createRef()
    this.inputWindsidRef = React.createRef()
    // ちょっとトリッキー(mode: true のときのfocus()用)
    this.inputWindsidRefFlag = true
  }

  componentDidMount () {
    if (this.inputKeyRef) {
      this.inputKeyRef.focus()
    }
  }

  componentDidUpdate() {
    if (this.inputWindsidRef && this.inputWindsidRefFlag && this.props.mode) {
      this.inputWindsidRef.focus()
      this.inputWindsidRefFlag = false
    }
  }

  componentWillUnmount () {
    this.props.changeWindsid('')
    this.props.changePassword('')
    this.props.changeKey('')
    this.props.resetMode()
    this.props.setErrorMessage(false)
  }

  keyPress (e) {
    if (e.which === 13) {
      this.props.mode ? this.props.register() : this.props.updateMode()
    }
  }

  render () {
    const { mode, windsid, password, approvalKey, errorMessage, loading } = this.props
    const { updateMode, changeWindsid, changePassword, changeKey, register } = this.props
    if (!mode) {
      const buttonLabel = loading ? '読み込み中' : '次へ'
      const disabled = approvalKey ? (loading ? true : false) : true
      const showError = errorMessage ? <div className='error'>{errorMessage}</div> : false
      return (
        <div className={'contents' + lib.pcClass(this.props.pc)}>
          <div className={'form-base reg' + lib.pcClass(this.props.pc)}>
            <div className={'form login' + lib.pcClass(this.props.pc)}>
              <h2 className={lib.pcClass(this.props.pc)}>新規登録</h2>
              {/* <div className='text'>
                <p>認証サーバアップデートに伴い、</p>
                <p>2019年6月4日に<span className='red'>全ての登録情報を削除</span>しました</p>
                <p>既に登録していた方はお手数ですが改めて登録をお願いします</p>
              </div> */}
              <div className='text'>
                <p>共通パスワードを入力してください</p>
              </div>
              <label>会員専用パスワード</label>
              <input type='text' tabIndex='1' value={approvalKey} onChange={(e) => changeKey(e.target.value)} onKeyPress={(e) => this.keyPress(e)}  ref={(i) => this.inputKeyRef = i} />
              {showError}
              <div className='links'>
                <div className='link'><Link to='/login' tabIndex='-1'>ログインはこちら</Link></div>
                <button tabIndex='2' onClick={() => updateMode()} disabled={disabled}>{buttonLabel}</button>
              </div>
            </div>
          </div>
          <div className='old'><a href='https://winds-n.com/member'>旧会員専用ページはこちら</a></div>
          <Footer />
        </div>
      )
    } else {
      const buttonLabel = loading ? '読み込み中...' : '送信'
      const disabled = (windsid && password) ? (loading ? true : false) : true
      const showError = errorMessage ? <div className='error'>{errorMessage}</div> : false
      return (
        <div className={'contents' + lib.pcClass(this.props.pc)}>
          <div className={'form-base reg' + lib.pcClass(this.props.pc)}>
            <div className={'form login' + lib.pcClass(this.props.pc)}>
              <h2 className={lib.pcClass(this.props.pc)}>新規登録</h2>
              <p>ユーザー名とパスワードは自由に指定できます</p>
              <label>ユーザー名</label>
              <input type='text' tabIndex='1' value={windsid} onChange={(e) => changeWindsid(e.target.value)} onKeyPress={(e) => this.keyPress(e)} ref={(i) => this.inputWindsidRef = i} />
              <label>パスワード</label>
              <input type='password' tabIndex='2' value={password} onChange={(e) => changePassword(e.target.value)} onKeyPress={(e) => this.keyPress(e)} />
              {/* <label>会員専用パスワード</label> */}
              {/* <input type='text' value={approvalKey} onChange={(e) => changeKey(e.target.value)} onKeyPress={(e) => this.keyPress(e)} /> */}
              {showError}
              <div className='links'>
                <div className='link'><Link to='/login' tabIndex='-1'>ログインはこちら</Link></div>
                <button tabIndex='3' onClick={() => register()} disabled={disabled}>{buttonLabel}</button>
              </div>
            </div>
          </div>
          <div className='old'><a href='https://winds-n.com/member'>旧会員専用ページはこちら</a></div>
          <Footer />
        </div>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reg)
