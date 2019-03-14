import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { setNavigationTitle, setNavigationTitleArchiveConcertid, setBackNavigation } from '../../../../Actions/Navigation'
import { getConcertList, setConcertid, getPhotoList, getVideoList } from '../../../../Actions/Archive'
import { archivePlayRequest } from '../../../../Actions/Audio'

import * as libArchive from '../Library/Library'
import * as lib from '../../../../Library/Library'

import './Overview.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    loadingArchive: state.archive.loading,
    concertList: state.archive.concertList,
    concertid: state.archive.concertid,
    loadingPhoto: state.archive.loadingPhoto,
    photoList: state.archive.photoList,
    loadingVideo: state.archive.loadingVideo,
    videoList: state.archive.videoList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setNavigationTitle (title) {
      dispatch(setNavigationTitle(title))
    },
    setNavigationTitleArchiveConcertid (titleConcertid) {
      dispatch(setNavigationTitleArchiveConcertid(titleConcertid))
    },
    setBackNavigation (backNavigation, backNavigationPath) {
      dispatch(setBackNavigation(backNavigation, backNavigationPath))
    },
    getConcertList () {
      dispatch(getConcertList())
    },
    setConcertid (id) {
      dispatch(setConcertid(id))
    },
    getPhotoList () {
      dispatch(getPhotoList())
    },
    getVideoList () {
      dispatch(getVideoList())
    },
    archivePlayRequest (id, number, playRequest) {
      dispatch(archivePlayRequest(id, number, playRequest))
    }
  }
}

class Overview extends Component {
  constructor (props) {
    super(props)
    const { params } = this.props.match
    const id = params.id ? params.id : ''
    this.props.setConcertid(id)
    this.props.setNavigationTitleArchiveConcertid(id)
  }

  // 直接アクセスしたときに必要
  componentDidMount () {
    this.props.setNavigationTitle('詳細情報')
    this.props.setBackNavigation(true, '/archive')
    this.props.getConcertList()
    this.props.getPhotoList()
    this.props.getVideoList()
  }

  componentWillReceiveProps (nextProps, nextContext) {
    const { params } = nextProps.match
    if (params.id !== this.props.concertid) {
      this.props.setConcertid(params.id)
      this.props.setNavigationTitleArchiveConcertid(params.id)
      this.props.getPhotoList()
      this.props.getVideoList()
    }
  }

  componentWillUnmount () {
    this.props.setNavigationTitleArchiveConcertid(false)
  }

  showDate (item) {
    if (item.time['time'] && item.time['label']) {
      const time = <div><div>{item.time.date}</div><div>{item.time.time + item.time.label}</div></div>
      return libArchive.labeling('日時', time)
    }
    const date = <div>{item.time.date}</div>
    return libArchive.labeling('開催日', date)
  }

  showPlace (item) {
    if ('place' in item) {
      const place = item.place.map((each, i) => {
        return <div key={i}>{each}</div>
      })
      return libArchive.labeling('会場', place)
    }
  }

  showConductor (item) {
    if ('conductor' in item) {
      var name = ''
      for (var i in item.conductor) {
        name += item.conductor[i].name + '・'
      }
      return libArchive.labeling('指揮', name.slice(0, -1))
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
      return libArchive.labeling('客演', list)
    }
  }

  setAudio (number) {
    this.props.archivePlayRequest(this.props.concertid, number, true)
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

  renderConcertNavigation () {
    if (this.props.loadingArchive || !this.props.concertList || !this.props.concertid) return
    const item = libArchive.getConcert(this.props.concertid, this.props.concertList).detail
    const concertList = this.props.concertList
    const concertid = this.props.concertid
    // reverse()していないので逆になってる
    const prevClass = 'prev ' + libArchive.getPrevConcert(concertid, concertList) + ' ' + libArchive.getConcertType(concertid, concertList)
    const prevLink = libArchive.getPrevConcert(concertid, concertList) ? <Link to={'/archive/overview/' + libArchive.getPrevConcert(concertid, concertList)} className={prevClass}>次<i className='fas fa-chevron-circle-right'></i></Link> : <span className={prevClass}>次<i className='fas fa-chevron-circle-right'></i></span>
    const nextClass = 'next ' + libArchive.getNextConcert(concertid, concertList) + ' ' + libArchive.getConcertType(concertid, concertList)
    const nextLink = libArchive.getNextConcert(concertid, concertList) ? <Link to={'/archive/overview/' + libArchive.getNextConcert(concertid, concertList)} className={nextClass}><i className='fas fa-chevron-circle-left'></i>前</Link> : <span className={nextClass}><i className='fas fa-chevron-circle-left'></i>前</span>
    return (
      <div className={'title' + lib.pcClass(this.props.pc)}>
        {nextLink}
        <h2>{item.title}</h2>
        {prevLink}
      </div>
    )
  }

  renderNavigationLink () {
    if (this.props.loadingArchive || !this.props.concertList || !this.props.concertid) return
    const photoLink = !this.props.photoList ? <li><div className='disabled-link'><div className='inner'><span>写真</span><i className="fas fa-angle-right"></i></div></div></li> : (this.props.photoList.length === 0 || this.props.loadingPhoto ? <li><div className='disabled-link'><div className='inner'><span>写真</span><i className="fas fa-angle-right"></i></div></div></li> : <li><Link to={'/archive/photo/' + this.props.concertid}><div className='inner'><span>写真</span><i className="fas fa-angle-right"></i></div></Link></li>)
    const videoLink = !this.props.videoList ? <li><div className='disabled-link'><div className='inner'><span>映像</span><i className="fas fa-angle-right"></i></div></div></li> : (this.props.videoList.length === 0 || this.props.loadingVideo ? <li><div className='disabled-link'><div className='inner'><span>映像</span><i className="fas fa-angle-right"></i></div></div></li> : <li><Link to={'/archive/video/' + this.props.concertid}><div className='inner'><span>映像</span><i className="fas fa-angle-right"></i></div></Link></li>)
    return (
      <div className={'box' + lib.pcClass(this.props.pc)}>
        <div className='link'>
          <ul className='navigation-link'>
            {photoLink}
            {videoLink}
          </ul>
        </div>
      </div>
    )
  }

  renderConcertDetail () {
    if (this.props.loadingArchive || !this.props.concertList || !this.props.concertid) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    const item = libArchive.getConcert(this.props.concertid, this.props.concertList).detail
    return (
      <div className='concert-detail'>
        <div className='poster'>
          {this.showPoster(item)}
        </div>
        <div className='overview-detail'>
          <div>
            <label className={'sticky-label' + lib.pcClass(this.props.pc)}>概要</label>
            {this.showDate(item)}
            {this.showPlace(item)}
            {this.showConductor(item)}
            {this.showGuest(item)}
          </div>
          <ol className='music-list'>{this.showMusic(item)}</ol>
        </div>
      </div>
    )
  }

  renderBreadNavigation (loadingArchive, concertList, concertid) {
    if (loadingArchive || !concertList || !concertid) return <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/archive'>アーカイブ</Link><i className="fas fa-chevron-right"></i><i className='fas fa-spinner fa-pulse'></i></div>
    return <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/archive'>アーカイブ</Link><i className="fas fa-chevron-right"></i><Link to={'/archive/overview/' + concertid}>{libArchive.getConcertTitle(concertid, concertList)}</Link></div>
  }

  render () {
    // State List
    const { loadingArchive, concertList, concertid } = this.props

    const showBreadNavigation = this.renderBreadNavigation(loadingArchive, concertList, concertid)

    return (
      <React.Fragment>
        <div className={'contents-header' + lib.pcClass(this.props.pc)}>
          {showBreadNavigation}
          <h2>アーカイブ</h2>
          <p>過去のウィンズの活動履歴を確認できます</p>
        </div>

        <div className={'archive-overview' + lib.pcClass(this.props.pc)}>
          <div className='article'>
            {this.renderConcertNavigation()}
            {this.renderNavigationLink()}
            <div className={'box' + lib.pcClass(this.props.pc)}>
              {this.renderConcertDetail()}
            </div>
          </div>
        </div>

        <div className={'box' + lib.pcClass(this.props.pc)}>
          <div className='back-link'>
            <ul>
              <li><Link to='/archive'><div className='inner'><i className="fas fa-angle-left"></i><span>一覧へ</span></div></Link></li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
