import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { setBackNavigation } from '../../../../Actions/Navigation'
import { getConcertList, setConcertid } from '../../../../Actions/Archive'
import { archivePlayRequest } from '../../../../Actions/Audio'

import * as lib from '../Library/Library'

import './Overview.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    loadingArchive: state.archive.loading,
    concertList: state.archive.concertList,
    concertid: state.archive.concertid
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
    setConcertid (id) {
      dispatch(setConcertid(id))
    },
    archivePlayRequest (id, number) {
      dispatch(archivePlayRequest(id, number))
    }
  }
}

class Overview extends Component {
  constructor (props) {
    super(props)
    const { params } = this.props.match
    const id = params.id ? params.id : ''
    this.props.setConcertid(id)
  }

  // 直接アクセスしたときに必要
  componentDidMount () {
    this.props.getConcertList()
    this.props.setBackNavigation(true, '/archive')
  }

  componentWillReceiveProps (nextProps, nextContext) {
    const { params } = nextProps.match
    params.id ? this.props.setConcertid(params.id) : false
  }

  showDate (item) {
    if (item.time['time'] && item.time['label']) {
      const time = <div><div>{item.time.date}</div><div>{item.time.time + item.time.label}</div></div>
      return lib.labeling('日時', time)
    }
    const date = <div>{item.time.date}</div>
    return lib.labeling('開催日', date)
  }

  showPlace (item) {
    if ('place' in item) {
      const place = item.place.map((each, i) => {
        return <div key={i}>{each}</div>
      })
      return lib.labeling('会場', place)
    }
  }

  showConductor (item) {
    if ('conductor' in item) {
      var name = ''
      for (var i in item.conductor) {
        name += item.conductor[i].name + '・'
      }
      return lib.labeling('指揮', name.slice(0, -1))
    }
  }

  showGuest (item) {
    // ないときがある
    if (item['guest']) {
    // if ('guest' in item) {
      var list = ''
      for (var i in item.guest) {
        list = item.guest[i].name + '(' + item.guest[i].instrument + ')'
      }
      return lib.labeling('客演', list)
    }
  }

  setAudio (number) {
    this.props.archivePlayRequest(this.props.concertid, number)
  }

  showMusic (item) {
    var data = item.data
    return item.contents.map((list, i) => {
      var ml = list.music.map((ml, j) => {
        var composer = 'composer' in data[ml] ? 'arranger' in data[ml] ? <span className='composer'>{data[ml].composer}{data[ml].composer.match(/民謡/) ? '' : '作曲'}<span>/</span>{data[ml].arranger}編曲</span> : <span className='composer'>{data[ml].composer}</span> : 'arranger' in data[ml] ? <span className='composer'>{data[ml].arranger}編曲</span> : ''
        var additional = 'add' in data[ml] ? <ol>{data[ml].add.map((mv, k) => (<li key={'a' + item.id + k}>{mv}</li>))}</ol> : ''
        var movement = 'movement' in data[ml] ? <ol>{data[ml].movement.map((mv, k) => (<li key={'a' + item.id + k}>{mv}</li>))}</ol> : ''
        var clickHandler = 'audio' in data[ml] ? () => {this.setAudio(data[ml].audio)} : () => {}
        var hasAudio = 'audio' in data[ml] ? <i className="fas fa-play-circle"></i> : <i className="far fa-times-circle"></i>
        return (
          <li key={'m' + item.id + j} className={'track' + ('audio' in data[ml] ? ' has-audio' : '')} onClick={clickHandler}>
            <div>{hasAudio}</div>
            <div><span>{data[ml].title}</span>{composer}{additional}{movement}</div>
          </li>
        )
      })
      return <li key={'l' + item.id + i}><label className={'sticky-label' + (list.label.match(/第[0-9]部/) ? '' : ' other')}>{list.label}</label><ol>{ml}</ol></li>
    })
  }

  showPoster (item) {
    if (item['poster']) {
      return <img src={item.poster} />
    } else {
      return <div className='no-poster'><div><span>NO IMAGE</span></div></div>
    }
  }

  renderConcertNavigation (item) {
    const concertList = this.props.concertList
    const concertid = this.props.concertid
    const prevClass = 'prev ' + lib.getPrevConcert(concertid, concertList) + ' ' + lib.getConcertType(concertid, concertList)
    const prevLink = lib.getPrevConcert(concertid, concertList) ? <Link to={'/archive/overview/' + lib.getPrevConcert(concertid, concertList)} className={prevClass}><i className='fas fa-chevron-circle-right'></i></Link> : <span className={prevClass}><i className='fas fa-chevron-circle-right'></i></span>
    const nextClass = 'next ' + lib.getNextConcert(concertid, concertList) + ' ' + lib.getConcertType(concertid, concertList)
    const nextLink = lib.getNextConcert(concertid, concertList) ? <Link to={'/archive/overview/' + lib.getNextConcert(concertid, concertList)} className={nextClass}><i className='fas fa-chevron-circle-left'></i></Link> : <span className={nextClass}><i className='fas fa-chevron-circle-left'></i></span>
    return (
      <div className='title'>
        {nextLink}
        <h2>{item.title}</h2>
        {prevLink}
      </div>
    )
  }

  renderOverview (loadingArchive, concertList) {
    if (loadingArchive || !concertList || !this.props.concertid) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    const item = lib.getConcert(this.props.concertid, concertList).detail
    return (
      <div className='article'>
        {this.renderConcertNavigation(item)}
        {/* <ConcertNavigation id={this.state.id} /> */}
        <div className='concert-detail'>
          <div className='poster'>
            {this.showPoster(item)}
          </div>
          <div className='overview-detail'>
            <div>
              <label className='sticky-label'>概要</label>
              {this.showDate(item)}
              {this.showPlace(item)}
              {this.showConductor(item)}
              {this.showGuest(item)}
            </div>
            <ol className='music-list'>{this.showMusic(item)}</ol>
          </div>
        </div>
      </div>
    )
  }

  renderBreadNavigation (loadingArchive, concertList, concertid) {
    if (loadingArchive || !concertList || !concertid) return false
    return (
      <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/archive'>アーカイブ</Link><i className="fas fa-chevron-right"></i><Link to={'/archive/overview/' + concertid}>{lib.getConcertTitle(concertid, concertList)}</Link></div>
    )
  }

  render () {
    // State List
    const { pc, loadingArchive, concertList, concertid } = this.props

    const showOverview = this.renderOverview(loadingArchive, concertList)
    const showBreadNavigation = this.renderBreadNavigation(loadingArchive, concertList, concertid)

    return (
      <React.Fragment>
        <div className='contents-header'>
          {showBreadNavigation}
          <h2>アーカイブ</h2>
          <p>過去のウィンズの活動履歴を確認できます</p>
        </div>
        <div className='box archive-overview'>
          {showOverview}
        </div>
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
