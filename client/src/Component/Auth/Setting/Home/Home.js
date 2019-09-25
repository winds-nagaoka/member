import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'

import { connect } from 'react-redux'

import { getUser } from '../../../../Actions/Setting'
import { setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'
import { closePlayer } from '../../../../Actions/Audio'
import { requestEmail } from '../../../../Actions/EmailValidation'
import { openFirstTutorial } from '../../../../Actions/Tutorial'
import { logout } from '../../../../Actions/Status'

import Forward from '../../../../Library/Icons/Forward'
import * as lib from '../../../../Library/Library'

import './Home.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    loading: state.status.loading,
    user: state.status.user,
    displayPlayer: state.audio.displayPlayer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getUser () {
      dispatch(getUser())
    },
    setNavigationTitle (title) {
      dispatch(setNavigationTitle(title))
    },
    setBackNavigation (backNavigation, backNavigationPath) {
      dispatch(setBackNavigation(backNavigation, backNavigationPath))
    },
    closePlayer (e) {
      dispatch(closePlayer(e))
    },
    requestEmail () {
      dispatch(requestEmail())
    },
    openFirstTutorial () {
      dispatch(openFirstTutorial())
    },
    logout () {
      dispatch(logout())
    }
  }
}

class Home extends Component {
  componentWillMount () {
    this.props.getUser()
  }

  componentDidMount () {
    this.props.setNavigationTitle('設定')
    this.props.setBackNavigation(true, '/')
  }

  componentWillUnmount () {
  }

  logout () {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='alert'>
            <h1>ログアウトしますか？</h1>
            <p>ユーザー情報は端末に残りません。</p>
            <div className='button-group'>
              <button onClick={onClose}>キャンセル</button>
              <button onClick={() => {
                this.props.logout()
                onClose()
              }}>ログアウト</button>
            </div>
          </div>
        )
      }
    })
  }

  renderPlayerClose () {
    if (!this.props.displayPlayer) return false
    return (
      <div className={'box setting-button' + lib.pcClass(this.props.pc)}>
        <div onClick={(e) => this.props.closePlayer(e)} className='button'>プレイヤーを閉じる</div>
      </div>
    )
  }

  renderRequestEmailValid () {
    if (this.props.user.email && !this.props.user.emailValid) {
      return (
        <div className={'box setting-button' + lib.pcClass(this.props.pc)}>
          <div onClick={() => this.props.requestEmail()} className='button'>確認メールの再送</div>
        </div>
      )
    }
  }

  renderUserStatus () {
    if (this.props.loading || !this.props.user) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    const secure = this.props.user.hash && lib.getToken(this.props.user) ? <span className='secure'><i className='fas fa-lock'></i></span> : <span className='non-secure'><i className="fas fa-ban"></i></span>
    const email = this.props.user.email ? <span>{this.props.user.email}</span> : <span className='light'>未設定</span>
    const emailValid = this.props.user.email ? (this.props.user.emailValid ? <div className='label ok'><span><i className="fas fa-check-circle"></i>確認済み</span></div> : <div className='label ng'><span><i className="fas fa-times-circle"></i>未確認</span></div>) : false

    const scoreAdmin = 'scoreAdmin' in this.props.user ? this.props.user.scoreAdmin : false
    const showScoreAdmin = scoreAdmin ? <div className='label'><span>楽譜管理者</span></div> : false
    return (
      <div>
        <div className='text'>
          <div><label>WindsID&nbsp;{secure}</label><span className='light'>{this.props.user.userid}</span></div>
          {/* <div><label>登録日</label><span>{this.props.user.createdAt}</span></div> */}
          <div><label>名前</label><span>{this.props.user.name}</span>{showScoreAdmin}</div>
          <div><label>メール</label><span>{email}</span>{emailValid}</div>
        </div>
      </div>
    )
  }

  render () {
    const showUserStatus = this.renderUserStatus()
    const showPlayerClose = this.renderPlayerClose()
    const showRequestEmailValid = this.renderRequestEmailValid()

    return (
      <React.Fragment>

        <div className={'contents-header' + lib.pcClass(this.props.pc)}>
          <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/setting'>設定</Link></div>
          <h2>設定</h2>
          <p>各種設定はこちらから</p>
        </div>

        <div className={'box setting-status' + lib.pcClass(this.props.pc)}>
          {showUserStatus}
        </div>

        {showRequestEmailValid}
        {showPlayerClose}

        <div className={'box-label' + lib.pcClass(this.props.pc)}>アカウントの設定</div>
        <div className={'box setting-list' + lib.pcClass(this.props.pc)}>
          <div className='link'>
            <ul>
              <li><Link to='/setting/name'><div className='inner'><span>名前</span><Forward /></div></Link></li>
              <li className='border-top'><Link to='/setting/email'><div className='inner'><span>メールアドレス</span><Forward /></div></Link></li>
              <li className='border-top'><Link to='/setting/password'><div className='inner'><span>パスワード</span><Forward /></div></Link></li>
              <li className='border-top'><Link to='/setting/session'><div className='inner'><span>セッションの管理</span><Forward /></div></Link></li>
              <li className='border-top'><Link to='/setting/delete'><div className='inner'><span>アカウントの削除</span><Forward /></div></Link></li>
            </ul>
          </div>
        </div>

        <div className={'box-label' + lib.pcClass(this.props.pc)}>ウィンズスコア</div>
        <div className={'box setting-list' + lib.pcClass(this.props.pc)}>
          <div className='link'>
            <ul>
              <li><Link to='/setting/score/mail'><div className='inner'><span>CSV出力</span><Forward /></div></Link></li>
              <li className='border-top'><Link to='/setting/score/admin'><div className='inner'><span>管理者設定</span><Forward /></div></Link></li>
            </ul>
          </div>
        </div>

        <div className={'box-label' + lib.pcClass(this.props.pc)}>情報</div>
        <div className={'box setting-list' + lib.pcClass(this.props.pc)}>
          <div className='link'>
            <ul>
              <li><Link to='/setting/terms'><div className='inner'><span>ウィンズ会員規約</span><Forward /></div></Link></li>
              <li className='border-top'><Link to='/setting/about'><div className='inner'><span>このアプリについて</span><Forward /></div></Link></li>
              <li className='border-top'><div className='link-button' onClick={() => this.props.openFirstTutorial()}><div className='inner'><span>チュートリアルを開く</span></div></div></li>
              <li className='border-top'><Link to='/setting/license'><div className='inner'><span>ライセンス情報</span><Forward /></div></Link></li>
            </ul>
          </div>
        </div>

        <div className={'box setting-button' + lib.pcClass(this.props.pc)}>
          <div onClick={() => this.logout()} className='button'>ログアウト</div>
        </div>

      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
