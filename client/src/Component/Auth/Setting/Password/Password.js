import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import Back from '../../../../Library/Icons/Back'
import * as lib from '../../../../Library/Library'

import { redirect, setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'
import { setOldPassword, setNewPassword, updatePassword } from '../../../../Actions/Setting'

import './Password.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    loading: state.status.loading,
    user: state.status.user,

    oldPassword: state.setting.oldPassword,
    newPassword: state.setting.newPassword,
    loadingUpdatePassword: state.setting.loadingUpdatePassword,
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
    setOldPassword(oldPassword) {
      dispatch(setOldPassword(oldPassword))
    },
    setNewPassword(newPassword) {
      dispatch(setNewPassword(newPassword))
    },
    updatePassword() {
      dispatch(updatePassword())
    },
  }
}

class Password extends Component {
  componentDidMount() {
    this.props.setNavigationTitle('パスワードの変更')
    this.props.setBackNavigation(true, '/setting')
  }

  componentWillUnmount() {}

  render() {
    const buttonText = this.props.loadingScoreMailRequest ? '読み込み中...' : '送信'
    const disabledClass =
      (!this.props.newPassword && !this.props.oldPassword) || this.props.loadingUpdatePassword ? ' disabled' : ''
    const buttonHandler =
      (!this.props.newPassword && !this.props.oldPassword) || this.props.loadingUpdatePassword
        ? () => {}
        : () => this.props.updatePassword()

    return (
      <React.Fragment>
        <div className={'contents-header' + lib.pcClass(this.props.pc)}>
          <div className="bread-navigation">
            <Link to="/">ホーム</Link>
            <i className="fas fa-chevron-right"></i>
            <Link to="/setting">設定</Link>
            <i className="fas fa-chevron-right"></i>
            <Link to="/setting/password">パスワードの変更</Link>
          </div>
          <h2>パスワードの変更</h2>
          <p>定期的に変えるよりは長くて強固なパスワードがよいとされています</p>
        </div>

        <div className={'box setting-text' + lib.pcClass(this.props.pc)}>
          <div>
            <label>古いパスワード</label>
            <input
              type="password"
              value={this.props.oldPassword}
              onChange={(e) => this.props.setOldPassword(e.target.value)}
            />
            <label>新しいパスワード</label>
            <input
              type="password"
              value={this.props.newPassword}
              onChange={(e) => this.props.setNewPassword(e.target.value)}
            />
          </div>
        </div>

        <div className={'box setting-button' + lib.pcClass(this.props.pc)}>
          <div onClick={buttonHandler} className={'button save' + disabledClass}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Password)
