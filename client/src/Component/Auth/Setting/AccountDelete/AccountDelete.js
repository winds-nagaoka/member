import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'

import { connect } from 'react-redux'

import Back from '../../../../Library/Icons/Back'
import * as lib from '../../../../Library/Library'

import { redirect, setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'
import { setDeletePassword, sendDeleteRequest } from '../../../../Actions/Setting'

import './AccountDelete.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    loading: state.status.loading,
    user: state.status.user,

    deletePassword: state.setting.deletePassword,
    loadingDeleteAccount: state.setting.loadingDeleteAccount
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
    setDeletePassword (deletePassword) {
      dispatch(setDeletePassword(deletePassword))
    },
    sendDeleteRequest () {
      dispatch(sendDeleteRequest())
    }
  }
}

class AccountDelete extends Component {
  componentDidMount () {
    this.props.setNavigationTitle('アカウントの削除')
    this.props.setBackNavigation(true, '/setting')
  }

  componentWillUnmount () {
  }

  deleteRequest () {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='alert'>
            <h1>アカウントを削除しますか？</h1>
            <p>ユーザー情報は完全に削除されます。</p>
            <div className='button-group'>
              <button onClick={onClose}>キャンセル</button>
              <button onClick={() => {
                this.props.sendDeleteRequest()
                onClose()
              }}>削除</button>
            </div>
          </div>
        )
      }
    })
  }

  render () {
    const buttonText = this.props.loadingDeleteAccount ? '読み込み中...' : '削除'
    const disabledClass = !this.props.deletePassword || this.props.loadingDeleteAccount ? ' disabled' : ''
    const buttonHandler = !this.props.deletePassword || this.props.loadingDeleteAccount ? () => {} : () => this.deleteRequest()

    return (
      <React.Fragment>

        <div className={'contents-header' + lib.pcClass(this.props.pc)}>
          <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/setting'>設定</Link><i className="fas fa-chevron-right"></i><Link to='/setting/delete'>アカウントの削除</Link></div>
          <h2>アカウントの削除</h2>
          <p>ウィンズサーバから関連する全ての情報が削除されます。</p>
        </div>

        <div className={'box setting-text' + lib.pcClass(this.props.pc)}>
          <div>
            <label>パスワード</label>
            <input type='password' value={this.props.deletePassword} onChange={(e) => this.props.setDeletePassword(e.target.value)} />
          </div>
        </div>

        <div className={'box setting-button' + lib.pcClass(this.props.pc)}>
          <div onClick={buttonHandler} className={'button save' + disabledClass}>{buttonText}</div>
        </div>

        <div className={'box' + lib.pcClass(this.props.pc)}>
          <div className='back-link'>
            <ul>
              <li><Link to='/setting'><div className='inner'><Back /><span>戻る</span></div></Link></li>
            </ul>
          </div>
        </div>

      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountDelete)
