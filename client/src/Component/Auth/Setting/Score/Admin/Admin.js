import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'

import { connect } from 'react-redux'

import * as lib from '../../../../../Library/Library'

import { redirect, setNavigationTitle, setBackNavigation } from '../../../../../Actions/Navigation'
import { setScoreAdminRequestPass, sendScoreAdminRequest } from '../../../../../Actions/Setting'

import './Admin.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    loading: state.status.loading,
    user: state.status.user,

    scoreAdminRequestPass: state.setting.scoreAdminRequestPass,
    loadingScoreAdminRequest: state.setting.loadingScoreAdminRequest
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
    setScoreAdminRequestPass (scoreAdminRequestPass) {
      dispatch(setScoreAdminRequestPass(scoreAdminRequestPass))
    },
    sendScoreAdminRequest () {
      dispatch(sendScoreAdminRequest())
    }
  }
}

class Admin extends Component {
  componentDidMount () {
    this.props.setNavigationTitle('楽譜管理者')
    this.props.setBackNavigation(true, '/setting')
  }

  componentWillUnmount () {
  }

  requestQuitAdmin () {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='alert'>
            <h1>楽譜管理者を辞めますか？</h1>
            <p>改めて楽譜管理者になるにはパスワードの再入力が必要です</p>
            <div className='button-group'>
              <button onClick={onClose}>キャンセル</button>
              <button onClick={() => {
                this.props.sendScoreAdminRequest()
                onClose()
              }}>辞める</button>
            </div>
          </div>
        )
      }
    })
  }

  renderPasswordInput (admin) {
    if (admin) return false
    return (
      <div className={'box setting-text' + lib.pcClass(this.props.pc)}>
        <div>
          <label>管理者パスワード</label>
          <input type='password' value={this.props.scoreAdminRequestPass} onChange={(e) => this.props.setScoreAdminRequestPass(e.target.value)} placeholder='パスワード' />
        </div>
      </div>
    )
  }

  render () {
    const disabled = this.props.adminRequestPass
    const admin = 'scoreAdmin' in this.props.user ? this.props.user.scoreAdmin : false
    const showPasswordInput = this.renderPasswordInput(admin)
    const buttonText = admin ? '管理者を辞める' : '管理者登録'
    const buttonHandler = admin ? () => this.requestQuitAdmin() : () => this.props.sendScoreAdminRequest()
    return (
      <React.Fragment>

        <div className={'contents-header' + lib.pcClass(this.props.pc)}>
          <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/setting'>設定</Link><i className="fas fa-chevron-right"></i><Link to='/setting/score/admin'>楽譜管理者</Link></div>
          <h2>楽譜管理者</h2>
          <p>楽譜登録情報の追加/編集ができるようになります</p>
        </div>

        {showPasswordInput}

        <div className={'box setting-button' + lib.pcClass(this.props.pc)}>
          <div onClick={buttonHandler} className='button save' disabled={disabled}>{buttonText}</div>
        </div>

        {/* <div className={'box' + lib.pcClass(this.props.pc)}>
          <div className='back-link'>
            <ul>
              <li><Link to='/setting/score'><div className='inner'><i className="fas fa-angle-left"></i><span>戻る</span></div></Link></li>
            </ul>
          </div>
        </div> */}

      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
