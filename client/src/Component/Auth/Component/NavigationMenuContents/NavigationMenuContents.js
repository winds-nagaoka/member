import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { navigationMenu } from '../../../../Actions/Navigation'

import './NavigationMenuContents.css'

function mapStateToProps(state) {
  return {
    width: state.status.width,
    pc: state.status.pc,
    mobile: state.status.mobile,

    menuOpen: state.navigation.menuOpen,
    title: state.navigation.title,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    navigationMenu (open) {
      dispatch(navigationMenu(open))
    }
  }
}

class NavigationMenuContents extends Component {

  render () {
    const { width, pc, mobile, menuOpen, title } = this.props
    const { navigationMenu } = this.props
    return (
      <div className='navigation-menu-contents'>
        <div className='app-info'>
          <img src='https://winds-n.com/img/apple-icon-archive.png' alt='logo' />
          <span>団員専用ページ</span>
        </div>
        <ol>
          <li><CustomLink activeOnlyWhenExact={true} to='/' label='ホーム' icon='fas fa-home' onClick={() => {navigationMenu(false)}} /></li>
          <li><CustomLink to='/schedule' label='練習日程' icon='far fa-thumbs-up' onClick={() => navigationMenu(false)} /></li>
          <li><CustomLink to='/manager' label='お知らせ' icon='fas fa-cog' onClick={() => navigationMenu(false)} /></li>
        </ol>
        <ol>
          <li><div className='link' onClick={() => this.logout()}><div><i className='fas fa-sign-out-alt'></i>ログアウト</div></div></li>
          {/* <CustomLink to='/score/logout' label='ログアウト' icon='fas fa-sign-out-alt' onClick={() => this.logout()} /> */}
        </ol>
      </div>
    )
  }
}

const CustomLink = ({ label, icon, to, activeOnlyWhenExact, onClick }) => {
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => (
        <div className={'link ' + (match ? 'active' : '')}>
          <Link to={to} onClick={() => onClick()} onTouchStart={() => {}}><div><i className={icon}></i>{label}</div></Link>
        </div>
      )}
    />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationMenuContents)
