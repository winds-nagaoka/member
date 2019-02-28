import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { setBackNavigation } from '../../../../Actions/Navigation'
import { getConcertList, toggleDisplayMain, toggleDisplayMini, toggleDisplayOther } from '../../../../Actions/Archive'

import './Home.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    loadingArchive: state.archive.loading,
    concertList: state.archive.concertList,
    displayMain: state.archive.displayMain,
    displayMini: state.archive.displayMini,
    displayOther: state.archive.displayOther,
  }
}

function mapDispatchToProps(dispatch) {
  return {
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
  }
}

class Home extends Component {
  componentDidMount () {
    this.props.setBackNavigation(true, '/')
    this.props.getConcertList()
  }

  renderConcertSwitch (loadingArchive, concertList) {
    if (loadingArchive || !concertList) return false
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

  renderNotice () {
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
    const { pc, loadingArchive, concertList } = this.props

    const showConcertSwitch = this.renderConcertSwitch(loadingArchive, concertList)
    const showConcertList = this.renderConcertList(loadingArchive, concertList)
    const showNotice = this.renderNotice()

    return (
      <React.Fragment>
        <div className='contents-header'>
          <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/archive'>アーカイブ</Link></div>
          <h2>アーカイブ</h2>
          <p>過去のウィンズの活動履歴を確認できます</p>
        </div>
        <div className='box archive-list'>
          {showConcertSwitch}
          {showConcertList}
          {showNotice}
        </div>
      </React.Fragment>
    )

    // return (
    //   <div className={'archive' + (pc ? ' pc' : ' mobile')}>
    //     <div className='contents-header'>
    //       <h2>アーカイブ</h2>
    //       <p>過去のウィンズの活動履歴を確認できます</p>
    //     </div>

    //     <div className='box archive-list'>
    //       {showConcertSwitch}
    //       {showConcertList}
    //       {showNotice}
    //     </div>

    //     <div className='box back-to-home'>
    //       <div className='back-link'>
    //         <ul>
    //           <li><Link to='/'><div className='inner'><i className="fas fa-angle-left"></i><span>ホーム</span></div></Link></li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    // )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
