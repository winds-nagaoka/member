import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import * as lib from '../../../../Library/Library'

import { redirect, setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'
import { deleteEmailRequest } from '../../../../Actions/Setting'

import Modify from '../Component/Modify/Modify'

import './Email.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    loading: state.status.loading,
    user: state.status.user,

    loadingDeleteEmailRequest: state.setting.loadingDeleteEmailRequest
  }
}

function mapDispatchToProps(dispatch) {
  return {
    redirect (location) {
      dispatch(redirect(location))
    },
    setNavigationTitle (title) {
      dispatch(setNavigationTitle(title))
    },
    setBackNavigation (backNavigation, backNavigationPath) {
      dispatch(setBackNavigation(backNavigation, backNavigationPath))
    },
    deleteEmailRequest () {
      dispatch(deleteEmailRequest())
    }
  }
}

class Email extends Component {
  componentDidMount () {
    this.props.setNavigationTitle('メールの設定')
    this.props.setBackNavigation(true, '/setting')
  }

  componentWillUnmount () {
  }

  emailChanged () {
    this.props.redirect('/setting')
  }

  canceled () {
    this.props.redirect('/setting')
  }

  renderDeleteEmail () {
    if (!this.props.user.email) return false
    const buttonHandler = this.props.loadingDeleteEmailRequest ? () => {} : () => this.props.deleteEmailRequest()
    const disabledClass = this.props.loadingDeleteEmailRequest ? ' disable' : ''
    const buttonText = this.props.loadingDeleteEmailRequest ? '読み込み中...' : 'メールを削除'
    return (
      <div className={'box setting-button' + lib.pcClass(this.props.pc)}>
        <div onClick={buttonHandler} className={'button save' + disabledClass}>{buttonText}</div>
      </div>
    )
  }

  render () {
    const email = this.props.user.email ? this.props.user.email : ''
    const showDeleteEmail = this.renderDeleteEmail()

    return (
      <React.Fragment>

        <div className={'contents-header' + lib.pcClass(this.props.pc)}>
          <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/setting'>設定</Link><i className="fas fa-chevron-right"></i><Link to='/setting/email'>メールの設定</Link></div>
          <h2>メールの設定</h2>
          <p>ウィンズスコアからデータを受け取るために使用します</p>
        </div>

        <Modify
          api={lib.getAuthPath() + '/api/setting/email'}
          text={email}
          title='メール'
          onComplete={() => this.emailChanged()}
          onCancel={() => this.canceled()}
        />

        {showDeleteEmail}

        <div className={'box' + lib.pcClass(this.props.pc)}>
          <div className='back-link'>
            <ul>
              <li><Link to='/setting'><div className='inner'><i className="fas fa-angle-left"></i><span>戻る</span></div></Link></li>
            </ul>
          </div>
        </div>

      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Email)
