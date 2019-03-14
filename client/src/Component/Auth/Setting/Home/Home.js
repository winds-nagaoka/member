import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import * as lib from '../../../../Library/Library'

import { getUser } from '../../../../Actions/Setting'
import { setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'
import { closePlayer } from '../../../../Actions/Audio'

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
      <div className={'box setting-list' + lib.pcClass(this.props.pc)}>
        <div className='link'>
          <ul>
            <li><div className='inner' onClick={(e) => this.props.closePlayer(e)}><span>プレイヤーを閉じる</span><i className="fas fa-angle-right"></i></div></li>          
          </ul>
        </div>
      </div>
    )
  }

  renderUserStatus () {
    if (this.props.loading || !this.props.user) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    console.warn(this.props.user)
    const secure = this.props.user.hash && this.props.user.token ? <span className='secure'><i className='fas fa-lock'></i></span> : <span className='non-secure'><i class="fas fa-ban"></i></span>
    const email = this.props.user.email ? this.props.user.email : '未設定'
    return (
      <div>
        <div><label>WindsID&nbsp;{secure}</label><span>{this.props.user.userid}</span></div>
        <div><label>名前</label><span>{this.props.user.name}</span></div>
        <div><label>メール</label><span>{email}</span></div>
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

        <div className={'box setting-list' + lib.pcClass(this.props.pc)}>
          <div className='link'>
            <ul>
              <li><Link to='/setting/name'><div className='inner'><span>名前</span><i className="fas fa-angle-right"></i></div></Link></li>
              <li className='border-top'><Link to='/setting/email'><div className='inner'><span>メール</span><i className="fas fa-angle-right"></i></div></Link></li>
            </ul>
          </div>
        </div>

      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
