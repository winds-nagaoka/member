import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'
import { getConcertList, toggleDisplayMain, toggleDisplayMini, toggleDisplayOther, setSearchRef, search, resetSearch } from '../../../../Actions/Archive'
import { archivePlayRequest } from '../../../../Actions/Audio'

import * as lib from '../../../../Library/Library'

import './Home.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    loadingArchive: state.archive.loading,
    concertList: state.archive.concertList,
    displayMain: state.archive.displayMain,
    displayMini: state.archive.displayMini,
    displayOther: state.archive.displayOther,

    loadingSearch: state.archive.loadingSearch,
    searchRef: state.archive.searchRef,
    searchQuery: state.archive.searchQuery,
    searchResult: state.archive.searchResult
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setNavigationTitle (title) {
      dispatch(setNavigationTitle(title))
    },
    setBackNavigation (backNavigation, backNavigationPath) {
      dispatch(setBackNavigation(backNavigation, backNavigationPath))
    },
    getConcertList () {
      dispatch(getConcertList())
    },
    toggleDisplayMain (display) {
      dispatch(toggleDisplayMain(display))
    },
    toggleDisplayMini (display) {
      dispatch(toggleDisplayMini(display))
    },
    toggleDisplayOther (display) {
      dispatch(toggleDisplayOther(display))
    },
    setSearchRef (searchRef) {
      dispatch(setSearchRef(searchRef))
    },
    search (value) {
      dispatch(search(value))
    },
    resetSearch () {
      dispatch(resetSearch())
    },
    archivePlayRequest (id, number, playRequest) {
      dispatch(archivePlayRequest(id, number, playRequest))
    }
  }
}

class Home extends Component {
  componentDidMount () {
    this.props.setNavigationTitle('アーカイブ')
    this.props.setBackNavigation(true, '/')
    this.props.getConcertList()
  }

  componentWillUnmount () {
    this.props.resetSearch()
  }

  renderSearch () {
    const searchIcon = this.props.loadingSearch ? <i className='fas fa-spinner fa-pulse'></i> : <i className='fas fa-search'></i>
    const searchBarButtonClass = this.props.searchQuery ? 'search-bar-button' : 'search-bar-button hidden'
    const searchModeClass = this.props.searchQuery ? ' search-mode' : ''
    return (
      <div className={'search-bar' + searchModeClass}>
        <div className='search-frame'>
          <div className='search-box'>
            <div className='search-bar-icon'>{searchIcon}</div>
            <input type='text' value={this.props.searchQuery} onChange={(e) => this.props.search(e.target.value)} ref={(i) => {!this.props.searchRef ? this.props.setSearchRef(i) : false}} placeholder='検索' />
            <div onClick={() => this.props.resetSearch()} className={searchBarButtonClass}><i className='fas fa-times-circle'></i></div>
          </div>
        </div>
      </div>
    )
  }

  renderSearchResult () {
    if (!this.props.searchResult) return
    const searchResult = this.props.searchResult.map((item, i) => {
      if (!item) return // <div key={i}></div>
      return item.map((each, j) => {
        if (!each) return // <div key={i + j}></div>
        // const concertType = ' ' + each.concert.type
        // const composer = each.track.composer ? each.track.composer : ''
        const composer = each.track.composer ? each.track.arranger ? <span className='composer'>{each.track.composer}{each.track.composer.match(/民謡/) ? '' : '作曲'}<span>/</span>{each.track.arranger}編曲</span> : <span className='composer'>{each.track.composer}</span> : each.track.arranger ? <span className='composer'>{each.track.arranger}編曲</span> : ''
        const audioHandler = !isNaN(each.track.audio) ? () => {this.props.archivePlayRequest(each.concert.id, each.track.audio, true)} : () => {}
        // const videoHandler = !isNaN(each.track.video) ? () => {this.openVideo(each.concert.id, each.track.video)} : () => {}
        const videoLinkTo = !isNaN(each.track.video) ? '/archive/video/' + each.concert.id + '/' + each.track.video : false
        const audioIcon = !isNaN(each.track.audio) ? <i className="fas fa-play-circle fa-lg"></i> : <i className="far fa-times-circle fa-lg"></i>
        const videoIcon = !isNaN(each.track.video) ? <Link to={videoLinkTo}><i className="fas fa-video fa-lg"></i></Link> : <i className="fas fa-video-slash fa-lg"></i>
        return (
          <div key={i + j} className='search-result-item'>
            <div className={each.concert.type}>
              <span className='concert-title'>{each.concert.title}</span>
              <span className='title'>{each.track.title}</span>
              {composer}
            </div>
            <div>
              <span onClick={audioHandler} className={'audio' + (!isNaN(each.track.audio) ? ' on' : '') + ' ' + each.concert.type}>{audioIcon}</span>
              <span className={'video' + (!isNaN(each.track.video) ? ' on' : '') + ' ' + each.concert.type}>{videoIcon}</span>
            </div>
          </div>
        )
      })
    })
    return (
      <div className='search-result'>
        {searchResult}
      </div>
    )
  }

  renderConcertSwitch (loadingArchive, concertList) {
    if (loadingArchive || !concertList) return false
    if (this.props.searchQuery) return false
    return (
      <div className='concert-switch'>
        <div className={'switch main' + (this.props.displayMain ? ' on' : '')} onClick={() => this.props.toggleDisplayMain(!this.props.displayMain)}>定期演奏会</div>
        <div className={'switch mini' + (this.props.displayMini ? ' on' : '')} onClick={() => this.props.toggleDisplayMini(!this.props.displayMini)}>ミニコンサート</div>
        <div className={'switch other' + (this.props.displayOther ? ' on' : '')} onClick={() => this.props.toggleDisplayOther(!this.props.displayOther)}>その他</div>
      </div>
    )
  }

  renderConcertList (loadingArchive, concertList) {
    if (loadingArchive || !concertList) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    if (this.props.searchResult) return
    return concertList.map((each, i) => {
      if (each.type === 'main' && !this.props.displayMain) return
      if (each.type === 'mini' && !this.props.displayMini) return
      if (each.type === 'other' && !this.props.displayOther) return
      return (
        <Link key={each.id + i} to={'/archive/overview/' + each.id} className='concert-item'>
          <div className={'info ' + each.type}>
            <span>{each.detail.title}</span>
            <span className='date'>{each.detail.time.date}</span>
          </div>
          <div className='icon'>
            <i className="fas fa-chevron-right"></i>
          </div>
        </Link>
      )
    })
  }

  renderSearchNotice () {
    if (!this.state.queryText && this.state.searchResult.length === 0) {
      return (
        <div className='notice'>
          <i className="fas fa-arrow-up"></i>
          <span>曲名、作編曲者</span>
          <span>演奏会名で</span>
          <span>検索できます</span>
        </div>
      )
    } else {
      if (this.state.queryText) {

      }
    }
  }

  renderNotice () {
    if (this.props.searchQuery) {
      var flag = false
      this.props.searchResult.map((i) => {i.map((e) => {if (e) flag = true})})
      if (flag) {
        return <div className='notice'><span>これ以上はありません</span></div>
      } else {
        return <div className='notice'><span>みつかりませんでした</span></div>
      }
    }
    if (!this.props.displayMain && !this.props.displayMini && !this.props.displayOther) {
      return (
        <div className='notice'>
          <i className="fas fa-arrow-up"></i>
          <span>どれか選んでください</span>
        </div>
      )
    } else {
      return false
    }
  }

  render () {
    // State List
    const { loadingArchive, concertList } = this.props

    const showSearch = this.renderSearch()
    const showSearchResult = this.renderSearchResult()
    const showConcertSwitch = this.renderConcertSwitch(loadingArchive, concertList)
    const showConcertList = this.renderConcertList(loadingArchive, concertList)
    const showNotice = this.renderNotice()

    return (
      <React.Fragment>
        <div className={'contents-header' + lib.pcClass(this.props.pc)}>
          <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/archive'>アーカイブ</Link></div>
          <h2>アーカイブ</h2>
          <p>過去のウィンズの活動履歴を確認できます</p>
        </div>
        <div className={'box archive-list' + lib.pcClass(this.props.pc)}>
          {showSearch}
          {showSearchResult}
          {showConcertSwitch}
          {showConcertList}
          {showNotice}
        </div>
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
