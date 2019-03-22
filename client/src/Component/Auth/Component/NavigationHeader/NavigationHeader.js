import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { navigationMenuToggle } from '../../../../Actions/Navigation'
import { scrollToTopSmooth } from '../../../../Actions/Status'

import NavigationMenuContents from '../NavigationMenuContents/NavigationMenuContents'

import * as lib from '../../../../Library/Library'
import * as libArchive from '../../Archive/Library/Library'

import WindsLogo from './logo.svg'
import Back from './back.svg'

import './NavigationHeader.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    mobile: state.status.mobile,

    title: state.navigation.title,
    titleConcertid: state.navigation.titleConcertid,
    backNavigation: state.navigation.backNavigation,
    backNavigationPath: state.navigation.backNavigationPath,
    menuOpen: state.navigation.menuOpen,

    archiveConcertList: state.archive.concertList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    navigationMenuToggle () {
      dispatch(navigationMenuToggle())
    },
    scrollToTopSmooth () {
      dispatch(scrollToTopSmooth())
    }
    // navigationMenu (open) {
    //   dispatch(navigationMenu(open))
    // }
  }
}

class NavigationHeader extends Component {

  render () {
    const { pc, mobile, menuOpen, title, titleConcertid } = this.props
    const { navigationMenuToggle } = this.props

    const titleText = titleConcertid && this.props.archiveConcertList ? libArchive.getConcertTitle(titleConcertid, this.props.archiveConcertList) : (title ? title : false)
    const showTitle = title && !pc ? <div className='title-text' onClick={() => this.props.scrollToTopSmooth()}>{titleText}</div> : <div className='logo' onClick={() => this.props.scrollToTopSmooth()}><WindsLogo /></div>

    // const backNavAndMenuToggle = this.props.backNavigation ? <div className='label back'><Link to={this.state.backTo}><i className='fas fa-chevron-left'></i>戻る</Link></div> : <div className='label' onClick={() => this.menuToggle()}><i className='fas fa-bars fa-lg'></i></div>
    // const backNavAndMenuToggle = mobile ? (this.props.backNavigation ? <div className='label back'><Link to={this.props.backNavigationPath}><i className='fas fa-chevron-left'></i><span>戻る</span></Link></div> : <div className='label' onClick={() => navigationMenuToggle()}><i className='fas fa-bars fa-lg'></i></div>) : false
    const backNavAndMenuToggle = mobile ? (this.props.backNavigation ? <div className='label back'><Link to={this.props.backNavigationPath}><div className='back-icon'><Back /></div><span>戻る</span></Link></div> : <div className='label' onClick={() => navigationMenuToggle()}><i className='fas fa-bars fa-lg'></i></div>) : false
    // const backNavAndMenuToggle = mobile ? <div className='label' onClick={() => navigationMenuToggle()}><i className='fas fa-bars fa-lg'></i></div> : <div></div>

    // const headerClass = ((this.state.titleBar) || (this.state.titleSearchStatus) ? 'header no-border' : 'header') + (this.state.titleFont ? ' font' : '')
    // const titleHeaderClass = 'title'
    const homeIcon = title && !pc ? <div className='label home-navigation'><Link to={'/'}><i className='fas fa-home'></i></Link></div> : false
    
    return (
      <div className='navigation-header'>
        <div className={'header' + lib.pcClass(pc)}>
          {/* <div className={'title'}> */}
            {showTitle}
          {/* </div> */}
          {backNavAndMenuToggle}
          {homeIcon}
        </div>
        <div className={'menu-background' + (menuOpen ? ' open' : '')} onClick={() => navigationMenuToggle()}></div>
        <div className={'menu-content' + (menuOpen ? ' open' : '')}>
          <NavigationMenuContents />
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
          <Link to={to} onClick={() => onClick()} onTouchStart={() => {}}><div>{/* <i className={icon}></i> */}{label}</div></Link>
        </div>
      )}
    />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationHeader)
