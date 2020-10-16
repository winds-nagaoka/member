import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { setKey, requestValid } from '../../../../Actions/EmailValidation'

import Back from '../../../../Library/Icons/Back'
import * as lib from '../../../../Library/Library'

import './EmailValidation.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    loading: state.emailValidation.loading,
    key: state.emailValidation.key,
    // valid: state.emailValidation.valid,
    windsid: state.login.windsid,
    password: state.login.password,
    err: state.emailValidation.err,

    user: state.status.user,
    login: state.status.login,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setKey(key) {
      dispatch(setKey(key))
    },
    requestValid(key) {
      dispatch(requestValid(key))
    },
  }
}

class EmailValidation extends Component {
  constructor(props) {
    super(props)
    const { params } = this.props.match
    const key = params.key ? params.key : ''
    this.props.setKey(key)
    this.props.requestValid(key)
  }

  renderResult() {
    if (this.props.err) {
      switch (this.props.err.type) {
        case 'DBError':
          return (
            <div className="label ng">
              <span>
                <i className="fas fa-times-circle"></i>データベースエラーです
              </span>
            </div>
          )
        case 'notMatchError':
          return (
            <div className="label ng">
              <span>
                <i className="fas fa-times-circle"></i>URLが無効です
              </span>
            </div>
          )
        case 'noDataError':
          return (
            <div className="label ng">
              <span>
                <i className="fas fa-times-circle"></i>URLが無効です
              </span>
            </div>
          )
        case 'expiredError':
          return (
            <div className="label ng">
              <span>
                <i className="fas fa-times-circle"></i>リンクの期限が切れています
              </span>
            </div>
          )
        case 'alreadyValid':
          return (
            <div className="label ok">
              <span>
                <i className="fas fa-check-circle"></i>確認しました
              </span>
            </div>
          )
        default:
          return (
            <div className="label ng">
              <span>
                <i className="fas fa-times-circle"></i>エラーが発生しました
              </span>
            </div>
          )
      }
    } else {
      return (
        <div className="label ok">
          <span>
            <i className="fas fa-check-circle"></i>確認済み
          </span>
        </div>
      )
    }
  }

  render() {
    const validResult =
      this.props.loading || !this.props.user ? (
        <div className="loading">
          <div className="loading1"></div>
          <div className="loading2"></div>
          <div className="loading3"></div>
        </div>
      ) : this.props.user.emailValid ? (
        <div className="label ok">
          <span>
            <i className="fas fa-check-circle"></i>確認済み
          </span>
        </div>
      ) : (
        this.renderResult()
      )
    const emailAddress = this.props.loading || !this.props.user ? false : this.props.user.email
    return (
      <React.Fragment>
        <div className={'contents-header' + lib.pcClass(this.props.pc)}>
          <div className="bread-navigation">
            <Link to="/">ホーム</Link>
            <i className="fas fa-chevron-right"></i>
            <Link to="/setting">設定</Link>
            <i className="fas fa-chevron-right"></i>
            <Link to="/setting/email">メールアドレスの確認</Link>
          </div>
          <h2>メールアドレスの確認</h2>
        </div>

        <div className={'box email-validation' + lib.pcClass(this.props.pc)}>
          <div className="text">
            {emailAddress}
            {validResult}
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

export default connect(mapStateToProps, mapDispatchToProps)(EmailValidation)
