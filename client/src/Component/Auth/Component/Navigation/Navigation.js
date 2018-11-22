import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { navigationMenuToggle, navigationMenu } from '../../../../Actions/Navigation'

import WindsLogo from './logo.svg'

import './Navigation.css'

function mapStateToProps(state) {
  return {
    width: state.status.width,

    menuOpen: state.navigation.menuOpen,
    title: state.navigation.title
  }
}

function mapDispatchToProps(dispatch) {
  return {
    navigationMenuToggle () {
      dispatch(navigationMenuToggle())
    },
    navigationMenu (open) {
      dispatch(navigationMenu(open))
    }
  }
}

class Navigation extends Component {

  render () {
    const { width, menuOpen, title } = this.props
    const { navigationMenuToggle, navigationMenu } = this.props

    console.warn(menuOpen)

    // if (this.state.redirect) return <Redirect to={this.state.redirect} />
    const menuContentClass = menuOpen ? 'menu-content open' : 'menu-content'
    const menuBackgroundClass = menuOpen ? 'menu-background open' : 'menu-background'
    const showTitle = title ? <div className='title' onClick={() => this.titleClick()}>{title}</div> : <div className='logo'><WindsLogo onClick={() => this.titleClick()} /></div>
    // const headerClass = ((this.state.titleBar) || (this.state.titleSearchStatus) ? 'header no-border' : 'header') + (this.state.titleFont ? ' font' : '')
    const headerClass = 'header'
    // const searchIcon = this.state.titleSearch ? <div className={'label search' + (this.state.titleSearchStatus ? '' : ' close')} onClick={() => this.toggleSearch()}><i className="fas fa-search"></i></div> : ''
    const searchIcon = ''
    // const backNavAndMenuToggle = this.state.backNavigation ? <div className='label back'><Link to={this.state.backTo}><i className='fas fa-chevron-left'></i>戻る</Link></div> : <div className='label' onClick={() => this.menuToggle()}><i className='fas fa-bars fa-lg'></i></div>
    const backNavAndMenuToggle = <div className='label' onClick={() => navigationMenuToggle()}><i className='fas fa-bars fa-lg'></i></div>
    return (
      <div className='navigation'>
        <div className={headerClass}>
          {showTitle}
        </div>
        {backNavAndMenuToggle}
        {searchIcon}
        <div className={menuBackgroundClass} onClick={() => navigationMenuToggle()}></div>
        <div className={menuContentClass}>
          <div className='account-info'>
            <a href='https://winds-n.com/' className='link' onClick={() => navigationMenu(false)}><img src='https://winds-n.com/img/apple-icon-archive.png' alt='logo' /></a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
