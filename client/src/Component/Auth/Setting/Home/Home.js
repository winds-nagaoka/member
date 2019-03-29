import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import * as lib from '../../../../Library/Library'

import { getUser } from '../../../../Actions/Setting'
import { setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'
import { closePlayer } from '../../../../Actions/Audio'
import { openFirstTutorial } from '../../../../Actions/Tutorial'

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
    openFirstTutorial () {
      dispatch(openFirstTutorial())
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

  renderPlayerClose () {
    if (!this.props.displayPlayer) return false
    return (    
      <div className={'box setting-button' + lib.pcClass(this.props.pc)}>
        <div onClick={(e) => this.props.closePlayer(e)} className='button'>プレイヤーを閉じる</div>
      </div>
    )
  }

  renderUserStatus () {
    if (this.props.loading || !this.props.user) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    const secure = this.props.user.hash && this.props.user.token ? <span className='secure'><i className='fas fa-lock'></i></span> : <span className='non-secure'><i class="fas fa-ban"></i></span>
    const email = this.props.user.email ? <span>{this.props.user.email}</span> : <span className='light'>未設定</span>
    const scoreAdmin = 'scoreAdmin' in this.props.user ? this.props.user.scoreAdmin : false
    const showScoreAdmin = scoreAdmin ? <div className='label'><span>楽譜管理者</span></div> : false
    return (
      <div>
        <div><label>WindsID&nbsp;{secure}</label><span className='light'>{this.props.user.userid}</span></div>
        {/* <div><label>登録日</label><span>{this.props.user.createdAt}</span></div> */}
        <div><label>名前</label><span>{this.props.user.name}</span>{showScoreAdmin}</div>
        <div><label>メール</label>{email}</div>
      </div>
    )
  }

  render () {
    const showUserStatus = this.renderUserStatus()
    const showPlayerClose = this.renderPlayerClose()

    return (
      <React.Fragment>

        <div className={'contents-header' + lib.pcClass(this.props.pc)}>
          <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/setting'>設定</Link></div>
          <h2>設定</h2>
          <p>各種設定はこちらから</p>
        </div>

        <div className={'box setting-status' + lib.pcClass(this.props.pc)}>
          <div className='text'>
            {showUserStatus} 
          </div>
        </div>

        {showPlayerClose}

        <div className={'box-label' + lib.pcClass(this.props.pc)}>登録情報の変更</div>
        <div className={'box setting-list' + lib.pcClass(this.props.pc)}>
          <div className='link'>
            <ul>
              <li><Link to='/setting/name'><div className='inner'><span>名前</span><i className="fas fa-angle-right"></i></div></Link></li>
              <li className='border-top'><Link to='/setting/email'><div className='inner'><span>メール</span><i className="fas fa-angle-right"></i></div></Link></li>
              <li className='border-top'><Link to='/setting/password'><div className='inner'><span>パスワード</span><i className="fas fa-angle-right"></i></div></Link></li>
              <li className='border-top'><Link to='/setting/delete'><div className='inner'><span>アカウントの削除</span><i className="fas fa-angle-right"></i></div></Link></li>
            </ul>
          </div>
        </div>

        <div className={'box-label' + lib.pcClass(this.props.pc)}>ウィンズスコア</div>
        <div className={'box setting-list' + lib.pcClass(this.props.pc)}>
          <div className='link'>
            <ul>
              <li><Link to='/setting/score/mail'><div className='inner'><span>CSV出力</span><i className="fas fa-angle-right"></i></div></Link></li>
              <li className='border-top'><Link to='/setting/score/admin'><div className='inner'><span>管理者設定</span><i className="fas fa-angle-right"></i></div></Link></li>
            </ul>
          </div>
        </div>

        <div className={'box-label' + lib.pcClass(this.props.pc)}>情報</div>
        <div className={'box setting-list' + lib.pcClass(this.props.pc)}>
          <div className='link'>
            <ul>
              <li><Link to='/setting/about'><div className='inner'><span>このアプリについて</span><i className="fas fa-angle-right"></i></div></Link></li>
              <li className='border-top'><div className='link-button' onClick={() => this.props.openFirstTutorial()}><span>チュートリアルを開く</span></div></li>
              <li className='border-top'><Link to='/setting/license'><div className='inner'><span>ライセンス情報</span><i className="fas fa-angle-right"></i></div></Link></li>
            </ul>
          </div>
        </div>

      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
