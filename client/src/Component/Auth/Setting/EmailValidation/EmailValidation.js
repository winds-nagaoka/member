import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { setKey, requestValid } from '../../../../Actions/EmailValidation'

import * as lib from '../../../../Library/Library'

import './EmailValidation.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    loading: state.emailValidation.loading,
    key: state.emailValidation.key,
    valid: state.emailValidation.valid,
    windsid: state.login.windsid,
    password: state.login.password,
    err: state.emailValidation.err,

    login: state.status.login
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setKey (key) {
      dispatch(setKey(key))
    },
    requestValid (key) {
      dispatch(requestValid(key))
    }
  }
}

class EmailValidation extends Component {
  constructor (props) {
    super(props)
    const { params } = this.props.match
    const key = params.key ? params.key : ''
    this.props.setKey(key)
    this.props.requestValid(key)
  }

  renderError () {
    if (this.props.err) {
      switch (this.props.err.type) {
        case 'DBError':
          return (
            <div>データベースエラーです</div>
          )
        case 'noDataError':
          return (
            <div>URLが無効です</div>
          )
        case 'expiredError':
          return (
            <div>リンクの期限が切れています</div>
          )
        case 'alreadyValid':
          return (
            <div>確認済み</div>
          )
        default:
          return (
            <div>エラーが発生しました</div>
          )
      }
    }
  }

  render () {
    if (this.props.loading) return <div>読み込み中</div>
    const validResult = this.props.valid ? <div>確認しました</div> : this.renderError()
    return (
      <div className={'contents email-validation' + lib.pcClass(this.props.pc)}>
        <div>メールアドレスの確認</div>
        <div>
          {validResult}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailValidation)
