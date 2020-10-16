import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'
import {
  getConcertList,
  setConcertid,
  getVideoList,
  resetVideo,
  setVideoRef,
  setLoadingVideoSource,
  videoLoadPercentUpdate,
  videoPlayUpdate,
  videoPlayRequest,
  videoPlay,
  videoPause,
  videoStop,
  // setDisplayVideoController,
  countUp,
} from '../../../../Actions/Archive'

import Back from '../../../../Library/Icons/Back'
import * as libArchive from '../Library/Library'
import * as lib from '../../../../Library/Library'

import './Video.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,

    loading: state.archive.loading,
    concertList: state.archive.concertList,
    concertid: state.archive.concertid,

    loadingVideo: state.archive.loadingVideo,

    videoList: state.archive.videoList,
    videoBaseSrc: state.archive.videoBaseSrc,
    videoUrl: state.archive.videoUrl,
    videoPoster: state.archive.videoPoster,

    videoRef: state.archive.videoRef,

    displayPhotoController: state.archive.displayPhotoController,

    videoPlayStatus: state.archive.videoPlayStatus,
    videoPlayTrack: state.archive.videoPlayTrack,

    countFlag: state.archive.countFlag,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setNavigationTitle(title) {
      dispatch(setNavigationTitle(title))
    },
    setBackNavigation(backNavigation, backNavigationPath) {
      dispatch(setBackNavigation(backNavigation, backNavigationPath))
    },
    getConcertList() {
      dispatch(getConcertList())
    },
    setConcertid(id) {
      dispatch(setConcertid(id))
    },
    getVideoList() {
      dispatch(getVideoList())
    },
    resetVideo() {
      dispatch(resetVideo())
    },
    setVideoRef(videoRef) {
      dispatch(setVideoRef(videoRef))
    },
    setLoadingVideoSource(status) {
      dispatch(setLoadingVideoSource(status))
    },
    videoLoadPercentUpdate(percent) {
      dispatch(videoLoadPercentUpdate(percent))
    },
    videoPlayUpdate(videoCurrent, videoDuration) {
      dispatch(videoPlayUpdate(videoCurrent, videoDuration))
    },
    videoPlayRequest(number, request) {
      dispatch(videoPlayRequest(number, request))
    },
    videoPlay(e) {
      dispatch(videoPlay(e))
    },
    videoPause(e) {
      dispatch(videoPause(e))
    },
    videoStop(e) {
      dispatch(videoStop(e))
    },
    // setDisplayVideoController (displayVideoSlideModal, videoNumber) {
    //   dispatch(setDisplayVideoController(displayVideoSlideModal, videoNumber))
    // },
    countUp() {
      dispatch(countUp())
    },
  }
}

class Video extends Component {
  constructor(props) {
    super(props)
    const { params } = this.props.match
    const id = params.id ? params.id : ''
    const track = !isNaN(params.track) ? parseInt(params.track) : undefined
    this.props.setConcertid(id)
    id !== ''
      ? this.props.setBackNavigation(true, '/archive/overview/' + id)
      : this.props.setBackNavigation(true, '/archive')
    track ? this.props.videoPlayRequest(track, false) : false
  }

  UNSAFE_componentWillMount() {
    this.props.getVideoList()
  }

  // 直接アクセスしたときに必要
  componentDidMount() {
    this.props.setNavigationTitle('映像')
    // パンくずリスト用
    this.props.getConcertList()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { params } = nextProps.match
    params.id ? this.props.setConcertid(params.id) : false
  }

  componentWillUnmount() {
    // this.props.videoStop()
    this.props.resetVideo()
    this.props.setVideoRef(undefined)
  }

  onLoadStart() {
    // console.log('読み込み開始', e)
    if (this.props.videoRef.src) {
      this.props.setLoadingVideoSource(true)
    }
  }

  onLoadedMetadata(e) {
    if (!isNaN(e.target.duration)) {
      this.props.videoPlayUpdate(this.props.current, e.target.duration)
    } else {
      this.props.videoPlayUpdate(this.props.current, undefined)
    }
  }

  onLoadedData(e) {
    if (!isNaN(e.target.duration)) {
      this.props.videoPlayUpdate(this.props.current, e.target.duration)
    } else {
      this.props.videoPlayUpdate(this.props.current, undefined)
    }
  }

  onDurationChange(e) {
    if (!isNaN(e.target.duration)) {
      this.props.videoPlayUpdate(this.props.current, e.target.duration)
    } else {
      this.props.videoPlayUpdate(this.props.current, undefined)
    }
  }

  onProgress(e) {
    if (e.target.buffered.length > 0) {
      this.props.videoLoadPercentUpdate(
        Math.round((e.target.buffered.end(e.target.buffered.length - 1) / e.target.duration) * 1000) / 10
      )
    } else {
      this.props.videoLoadPercentUpdate(undefined)
    }
  }

  onCanPlayThrough() {
    this.props.setLoadingVideoSource(false)
  }

  onError() {
    this.props.setLoadingVideoSource(true)
  }

  onTimeUpdate(e) {
    if (!isNaN(e.target.duration)) {
      this.props.videoPlayUpdate(e.target.currentTime, e.target.duration)
      if (this.props.countFlag && e.target.currentTime > 0) {
        this.props.countUp()
      }
    } else {
      this.props.videoPlayUpdate(undefined, undefined)
    }
  }

  onEnded() {
    this.playNext()
  }

  playNext() {
    // 確認
    if (this.props.videoList.length > this.props.videoPlayTrack + 1) {
      // 次のトラックへ
      this.props.videoPlayRequest(this.props.videoPlayTrack + 1, true)
    } else {
      this.props.videoPause()
    }
  }

  onClick(e) {
    e.preventDefault()
    this.props.videoPlayStatus ? this.props.videoPause() : this.props.videoPlay()
  }

  renderVideoList() {
    if (this.props.loading || this.props.loadingVideo || !this.props.videoList)
      return (
        <div className="loading">
          <div className="loading1"></div>
          <div className="loading2"></div>
          <div className="loading3"></div>
        </div>
      )
    const concert = libArchive.getConcert(this.props.concertid, this.props.concertList).detail
    // 初期値
    var trackCount = 0
    return concert.contents.map((item, i) => {
      // console.log(item)
      const trackList = item.music.map((num, i) => {
        // return this.renderTrack(num)
        const trackData = this.props.videoList.filter((e) => {
          return e.data === num
        })
        // console.log(trackData)
        return trackData.map((each, j) => {
          const trackNumber = trackCount
          trackCount += 1
          const title =
            each.data !== false
              ? libArchive.getAudioTitle(this.props.concertid, each.data, this.props.concertList)
              : each.title
          const addTitle = each.addtitle ? ' ' + each.addtitle : ''
          const composer =
            each.data !== false ? (
              <span className="composer">
                {libArchive.getAudioComposer(this.props.concertid, each.data, this.props.concertList)}
              </span>
            ) : each.composer ? (
              <span className="composer">{each.composer}</span>
            ) : (
              ''
            )
          const type = libArchive.getConcertType(this.props.concertid, this.props.concertList)
          return (
            <div
              key={'track' + i + j}
              className={'track' + (this.props.videoPlayTrack === trackNumber ? ' playing ' : ' ') + type}
              onClick={() => this.props.videoPlayRequest(trackNumber, true)}
            >
              {/* <div key={'track' + i + j} className={'track' + (this.state.playVideo === trackNumber ? ' playing' : '') + ' ' + type} onClick={() => this.selectPlay(trackNumber)}> */}
              <div className="icon">
                <i className="fas fa-video"></i>
              </div>
              <div className="info">
                <span className="title">{title + addTitle}</span>
                {composer}
              </div>
            </div>
          )
        })
      })
      return (
        <div key={'part' + i}>
          <label>{item.label}</label>
          {trackList}
        </div>
      )
    })
  }

  renderBreadNavigation() {
    if (!this.props.concertList || !this.props.concertid) {
      return (
        <div className="bread-navigation">
          <Link to="/">ホーム</Link>
          <i className="fas fa-chevron-right"></i>
          <Link to="/archive">アーカイブ</Link>
          <i className="fas fa-chevron-right"></i>
          <i className="fas fa-spinner fa-pulse"></i>
          <i className="fas fa-chevron-right"></i>
          <i className="fas fa-spinner fa-pulse"></i>
        </div>
      )
    }
    return (
      <div className="bread-navigation">
        <Link to="/">ホーム</Link>
        <i className="fas fa-chevron-right"></i>
        <Link to="/archive">アーカイブ</Link>
        <i className="fas fa-chevron-right"></i>
        <Link to={'/archive/overview/' + this.props.concertid}>
          {libArchive.getConcertTitle(this.props.concertid, this.props.concertList)}
        </Link>
        <i className="fas fa-chevron-right"></i>
        <Link to={'/archive/video/' + this.props.concertid}>映像</Link>
      </div>
    )
  }

  render() {
    const showBreadNavigation = this.renderBreadNavigation()
    const showVideoList = this.renderVideoList()
    const poster = this.props.videoPoster ? this.props.videoPoster : 'false'
    const aspectClass =
      this.props.videoPoster === 'https://video.winds-n.com/poster_800_586.png' ? ' aspect-4-3' : ' aspect-16-9'
    return (
      <React.Fragment>
        <div className={'contents-header' + lib.pcClass(this.props.pc)}>
          {showBreadNavigation}
          <h2>映像</h2>
        </div>

        <div className={'box archive-video-list' + lib.pcClass(this.props.pc)}>
          <div className="video-player">
            <div className={'video-frame' + aspectClass}>
              <video
                ref={(i) => {
                  !this.props.videoRef ? this.props.setVideoRef(i) : false
                }}
                onLoadStart={() => this.onLoadStart()}
                onLoadedMetadata={(e) => this.onLoadedMetadata(e)}
                onLoadedData={(e) => this.onLoadedData(e)}
                onDurationChange={(e) => this.onDurationChange(e)}
                onProgress={(e) => this.onProgress(e)}
                onCanPlayThrough={() => this.onCanPlayThrough()}
                onError={() => this.onError()}
                onTimeUpdate={(e) => this.onTimeUpdate(e)}
                onEnded={() => this.onEnded()}
                onClick={(e) => this.onClick(e)}
                poster={poster}
                playsInline
                // playsInline={!this.state.fullScreen}
                // これは再生中のときtrueにする
                controls={true}
                // controls={this.getFullScreenElment()}
                controlsList="nodownload"
              ></video>
            </div>
          </div>
          <div className="video-list">{showVideoList}</div>
        </div>

        <div className={'box' + lib.pcClass(this.props.pc)}>
          <div className="back-link">
            <ul>
              <li>
                <Link to="/archive">
                  <div className="inner">
                    <Back />
                    <span>一覧へ</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Video)
