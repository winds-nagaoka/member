import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'

import { connect } from 'react-redux'

import Back from '../../../../Library/Icons/Back'
import * as lib from '../../../../Library/Library'

import { redirect, setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'
import { setAdminRequestPass, sendAdminRequest } from '../../../../Actions/Setting'

import './Admin.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    loading: state.status.loading,
    user: state.status.user,

    adminRequestPass: state.setting.adminRequestPass,
    loadingAdminRequest: state.setting.loadingAdminRequest,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    redirect(location) {
      dispatch(redirect(location))
    },
    setNavigationTitle(title) {
      dispatch(setNavigationTitle(title))
    },
    setBackNavigation(backNavigation, backNavigationPath) {
      dispatch(setBackNavigation(backNavigation, backNavigationPath))
    },
    setAdminRequestPass(adminRequestPass) {
      dispatch(setAdminRequestPass(adminRequestPass))
    },
    sendAdminRequest() {
      dispatch(sendAdminRequest())
    },
  }
}

class Admin extends Component {
  componentDidMount() {
    this.props.setNavigationTitle('管理者設定')
    this.props.setBackNavigation(true, '/setting')
  }

  componentWillUnmount() {}

  requestQuitAdmin() {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="alert">
            <h1>管理者を辞めますか？</h1>
            <p>改めて管理者になるにはパスワードの再入力が必要です</p>
            <div className="button-group">
              <button onClick={onClose}>キャンセル</button>
              <button
                onClick={() => {
                  this.props.sendAdminRequest()
                  onClose()
                }}
              >
                辞める
              </button>
            </div>
          </div>
        )
      },
    })
  }

  renderPasswordInput(admin) {
    if (admin) return false
    return (
      <div className={'box setting-text' + lib.pcClass(this.props.pc)}>
        <div>
          <label>管理者パスワード</label>
          <input
            type="password"
            value={this.props.adminRequestPass}
            onChange={(e) => this.props.setAdminRequestPass(e.target.value)}
            placeholder="パスワード"
          />
        </div>
      </div>
    )
  }

  render() {
    const disabled = this.props.adminRequestPass
    const admin = 'admin' in this.props.user ? this.props.user.admin : false
    const showPasswordInput = this.renderPasswordInput(admin)
    const buttonText = admin ? '管理者を辞める' : '管理者登録'
    const buttonHandler = admin ? () => this.requestQuitAdmin() : () => this.props.sendAdminRequest()
    return (
      <React.Fragment>
        <div className={'contents-header' + lib.pcClass(this.props.pc)}>
          <div className="bread-navigation">
            <Link to="/">ホーム</Link>
            <i className="fas fa-chevron-right"></i>
            <Link to="/setting">設定</Link>
            <i className="fas fa-chevron-right"></i>
            <Link to="/setting/admin">管理者設定</Link>
          </div>
          <h2>管理者</h2>
          <p>いろいろできるようになります</p>
        </div>

        {showPasswordInput}

        <div className={'box setting-button' + lib.pcClass(this.props.pc)}>
          <div onClick={buttonHandler} className="button save" disabled={disabled}>
            {buttonText}
          </div>
        </div>

        <div className={'box' + lib.pcClass(this.props.pc)}>
          <div className="back-link">
            <ul>
              <li>
                <Link to="/setting">
                  <div className="inner">
                    <Back />
                    <span>戻る</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
