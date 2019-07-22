import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import * as lib from '../../../../../Library/Library'

import { redirect, setNavigationTitle, setBackNavigation } from '../../../../../Actions/Navigation'
import { getScoreCount, scoreMailRequest } from '../../../../../Actions/Setting'

import './Mail.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    loading: state.status.loading,
    user: state.status.user,

    loadingScoreCount: state.setting.loadingScoreCount,
    scoreCount: state.setting.scoreCount,
    loadingScoreMailRequest: state.setting.loadingScoreMailRequest
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
    getScoreCount () {
      dispatch(getScoreCount())
    },
    scoreMailRequest () {
      dispatch(scoreMailRequest())
    }
  }
}

class Mail extends Component {
  componentDidMount () {
    this.props.setNavigationTitle('CSV出力')
    this.props.setBackNavigation(true, '/setting')
    this.props.getScoreCount()
  }

  componentWillUnmount () {
  }

  renderScoreStatus() {
    // if (this.props.loadingScoreCount) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    const showScoreCount = this.props.loadingScoreCount ? <span className='light'>読み込み中...</span> : <span>{this.props.scoreCount}</span>
    const email = this.props.user.email ? <span>{this.props.user.email}</span> : <span className='light'>未設定</span>
    return (
      <div>
        <div><label>楽譜登録数</label>{showScoreCount}</div>
        <div><label>メールアドレス</label>{email}</div>
      </div>
    )
  }

  render () {
    const showScoreStatus = this.renderScoreStatus()

    const email = 'email' in this.props.user ? this.props.user.email : false
    const buttonText = this.props.loadingScoreMailRequest ? '送信中...' : '送信'
    const disabledClass = !email || email === '' || !this.props.user.emailValid || this.props.loadingScoreMailRequest ? ' disabled' : ''
    const buttonHandler = !email || email === '' || !this.props.user.emailValid || this.props.loadingScoreMailRequest ? () => {} : () => this.props.scoreMailRequest()
    return (
      <React.Fragment>

        <div className={'contents-header' + lib.pcClass(this.props.pc)}>
          <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/setting'>設定</Link><i className="fas fa-chevron-right"></i><Link to='/setting/score/mail'>CSV出力</Link></div>
          <h2>CSV出力</h2>
          <p>ウィンズスコア一覧をCSVにて登録されたメールアドレスへ送信します。</p>
        </div>

        <div className={'box setting-status' + lib.pcClass(this.props.pc)}>
          <div className='text'>
            {showScoreStatus}
          </div>
        </div>

        <div className={'box setting-button' + lib.pcClass(this.props.pc)}>
          <div onClick={buttonHandler} className={'button save' + disabledClass}>{buttonText}</div>
        </div>

      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Mail)
