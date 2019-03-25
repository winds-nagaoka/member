import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import * as lib from '../../../../../Library/Library'

import { getUser } from '../../../../../Actions/Setting'
import { setNavigationTitle, setBackNavigation } from '../../../../../Actions/Navigation'

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
    }
  }
}

class Home extends Component {
  componentWillMount () {
    this.props.getUser()
  }

  componentDidMount () {
    this.props.setNavigationTitle('ウィンズスコア設定')
    this.props.setBackNavigation(true, '/setting')
  }

  componentWillUnmount () {
  }

  renderUserStatus () {
    if (this.props.loading || !this.props.user) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    console.warn(this.props.user)
    const secure = this.props.user.hash && this.props.user.token ? <span className='secure'><i className='fas fa-lock'></i></span> : <span className='non-secure'><i class="fas fa-ban"></i></span>
    const email = this.props.user.email ? this.props.user.email : '未設定'
    return (
      <div>
        <div><label>WindsID&nbsp;{secure}</label><span>{this.props.user.userid}</span></div>
        {/* <div><label>登録日</label><span>{this.props.user.createdAt}</span></div> */}
        <div><label>名前</label><span>{this.props.user.name}</span></div>
        <div><label>メール</label><span>{email}</span></div>
      </div>
    )
  }

  render () {
    const showUserStatus = this.renderUserStatus()

    return (
      <React.Fragment>

        <div className={'contents-header' + lib.pcClass(this.props.pc)}>
          <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/setting'>設定</Link><i className="fas fa-chevron-right"></i><Link to='/setting/score'>ウィンズスコア設定</Link></div>
          <h2>ウィンズスコア設定</h2>
          <p>各種設定はこちらから</p>
        </div>

        {/* <div className={'box setting-status' + lib.pcClass(this.props.pc)}>
          <div className='text'>
            {showUserStatus} 
          </div>
        </div> */}

        <div className={'box setting-list' + lib.pcClass(this.props.pc)}>
          <div className='link'>
            <ul>
              <li><Link to='/setting/score/admin'><div className='inner'><span>管理者設定</span><i className="fas fa-angle-right"></i></div></Link></li>
              <li className='border-top'><Link to='/setting/score/mail'><div className='inner'><span>CSV出力</span><i className="fas fa-angle-right"></i></div></Link></li>
            </ul>
          </div>
        </div>

      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
