import React, { Component } from 'react'
import { Route, Link, NavLink } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'

import { connect } from 'react-redux'

import { navigationMenu } from '../../../../Actions/Navigation'
import { logout } from '../../../../Actions/Status'

import './NavigationMenuContents.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    mobile: state.status.mobile,
    path: state.router.location.pathname
  }
}

function mapDispatchToProps(dispatch) {
  return {
    navigationMenu (open) {
      dispatch(navigationMenu(open))
    },
    logout () {
      dispatch(logout())
    }
  }
}

class NavigationMenuContents extends Component {

  logout () {
    this.props.navigationMenu(false)
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
                // Actions.toastShow('ログアウトしました')
                onClose()
              }}>ログアウト</button>
            </div>
          </div>
        )
      }
    })
  }

  render () {
    const { pc, mobile, path } = this.props
    const { navigationMenu } = this.props
    return (
      <div className={'navigation-menu-contents' + (pc ? ' pc' : '')}>
        <div className='app-info'>
          <img src='https://winds-n.com/img/apple-icon-archive.png' alt='logo' />
          <span>団員専用ページ</span>
        </div>
        <ol>
          <li><CustomLink path={path} activeOnlyWhenExact={true} to='/' label='ホーム' icon='fas fa-home' onClick={() => {navigationMenu(false)}} /></li>
          <li><CustomLink path={path} to='/schedule' label='練習日程' icon='far fa-calendar-check' onClick={() => navigationMenu(false)} /></li>
          <li><CustomLink path={path} to='/record' label='練習の録音' icon='fas fa-microphone-alt' onClick={() => navigationMenu(false)} /></li>
          <li><CustomLink path={path} to='/manager' label='お知らせ' icon='fas fa-bullhorn' onClick={() => navigationMenu(false)} /></li>
          <li><CustomLink path={path} to='/bbs' label='掲示板' icon='fas fa-comments' onClick={() => navigationMenu(false)} /></li>
          <li><CustomLink path={path} to='/archive' label='アーカイブ' icon='fas fa-archive' onClick={() => navigationMenu(false)} /></li>
          <li><CustomLink path={path} to='/score' label='楽譜' icon='far fa-sticky-note' onClick={() => navigationMenu(false)} /></li>
          <li><CustomLink path={path} to='/setting' label='設定' icon='fas fa-cog' onClick={() => navigationMenu(false)} /></li>
        </ol>
        <ol>
          <li><div className='link' onClick={() => this.logout()}><div><i className='fas fa-sign-out-alt'></i>ログアウト</div></div></li>
          {/* <CustomLink to='/score/logout' label='ログアウト' icon='fas fa-sign-out-alt' onClick={() => this.logout()} /> */}
        </ol>
      </div>
    )
  }
}

const CustomLink = ({ label, icon, to, path, activeOnlyWhenExact, onClick }) => {
  const match = activeOnlyWhenExact ? (to === path ? ' active' : '') : (path.indexOf(to) === 0 ? ' active' : '')
  return (
    <div className={'link' + match}>
      <Link to={to} onClick={() => onClick()} onTouchStart={() => {}}><div><i className={icon}></i>{label}</div></Link>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationMenuContents)
