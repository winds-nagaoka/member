import React, { Component } from 'react'

import { connect } from 'react-redux'

import * as lib from '../../../../Library/Library'
import * as libArchive from '../../Archive/Library/Library'
import * as libPractice from '../../Practice/Library/Library'
import * as libSource from '../../Practice/Source/Library/Library'

import {
  loadArchivePlaylist,
  loadPracticePlaylist,
  loadSourcePlaylist,
  setAudioRef,
  setLoadingAudio,
  loadPercentUpdate,
  // setPlayStatus,
  playUpdate,
  setDisplayPlaylist,
  archivePlayRequest,
  practicePlayRequest,
  sourcePlayRequest,
  audioPlay,
  audioPause,
  audioStop,
  audioBackward,
  audioForward,
  countUp,
  countPlay,
} from '../../../../Actions/Audio'

import { getConcertList } from '../../../../Actions/Archive'
import { getHistory } from '../../../../Actions/History'
import { getSource } from '../../../../Actions/Source'

import './Audio.css'
// import lib from 'react-confirm-alert';

function mapStateToProps(state) {
  return {
    pc: state.status.pc,

    // アーカイブプレイリスト
    loadingArchivePlaylist: state.audio.loadingArchivePlaylist,
    archivePlaylist: state.audio.archivePlaylist,
    archiveBaseUrl: state.audio.archiveBaseUrl,
    archiveConcertList: state.archive.concertList,

    // 練習記録プレイリスト
    loadingPracticePlaylist: state.audio.loadingPracticePlaylist,
    practicePlaylist: state.audio.practicePlaylist,
    practiceBaseUrl: state.audio.practiceBaseUrl,
    practiceList: state.history.list,

    // 参考音源プレイリスト
    loadingSourcePlaylist: state.audio.loadingSourcePlaylist,
    sourcePlaylist: state.audio.sourcePlaylist,
    sourceBaseUrl: state.audio.sourceBaseUrl,
    sourceList: state.source.list,

    // オーディオタグ本体
    audioRef: state.audio.audioRef,

    // 要素の表示状態
    displayPlayer: state.audio.displayPlayer,
    displayPlaylist: state.audio.displayPlaylist,
    playlistLoad: state.audio.playlistLoad,

    // オーディオタグの情報
    loadingAudio: state.audio.loadingAudio,
    loadPercent: state.audio.loadPercent,
    playStatus: state.audio.playStatus,
    current: state.audio.current,
    currentTime: state.audio.currentTime,
    duration: state.audio.duration,
    durationTime: state.audio.durationTime,
    playPercent: state.audio.playPercent,

    // 曲情報

    // 再生中のモード
    playmode: state.audio.playmode,

    // アーカイブモード
    concertid: state.audio.concertid,
    number: state.audio.number,
    // album: state.audio.album,
    // track: state.audio.track,

    // 練習記録モード
    practiceid: state.audio.practiceid,
    fileNumber: state.audio.fileNumber,
    requestTime: state.audio.requestTime,
    // file: state.audio.file, // これ使ってる？

    // 参考音源モード
    sourceid: state.audio.sourceid,
    sourceNumber: state.audio.sourceNumber,

    countFlag: state.audio.countFlag,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadArchivePlaylist() {
      dispatch(loadArchivePlaylist())
    },
    loadPracticePlaylist() {
      dispatch(loadPracticePlaylist())
    },
    loadSourcePlaylist() {
      dispatch(loadSourcePlaylist())
    },
    setAudioRef(audioRef) {
      dispatch(setAudioRef(audioRef))
    },
    setLoadingAudio(status) {
      dispatch(setLoadingAudio(status))
    },
    loadPercentUpdate(percent) {
      dispatch(loadPercentUpdate(percent))
    },
    // setPlayStatus (status) {
    //   dispatch(setPlayStatus(status))
    // },
    playUpdate(current, duration) {
      dispatch(playUpdate(current, duration))
    },
    setDisplayPlaylist(displayPlaylist) {
      dispatch(setDisplayPlaylist(displayPlaylist))
    },

    archivePlayRequest(id, number, playRequest) {
      dispatch(archivePlayRequest(id, number, playRequest))
    },
    practicePlayRequest(practiceid, fileNumber, requestTimeString, playRequest) {
      dispatch(practicePlayRequest(practiceid, fileNumber, requestTimeString, playRequest))
    },
    sourcePlayRequest(sourceid, sourceNumber, playRequest) {
      dispatch(sourcePlayRequest(sourceid, sourceNumber, playRequest))
    },

    audioPlay() {
      dispatch(audioPlay())
    },
    audioPause() {
      dispatch(audioPause())
    },
    audioStop(button) {
      dispatch(audioStop(button))
    },
    audioBackward() {
      dispatch(audioBackward())
    },
    audioForward() {
      dispatch(audioForward())
    },

    getConcertList() {
      dispatch(getConcertList())
    },

    getHistory() {
      dispatch(getHistory())
    },

    getSource() {
      dispatch(getSource())
    },

    countUp() {
      dispatch(countUp())
    },
    countPlay(time) {
      dispatch(countPlay(time))
    },
  }
}

class Audio extends Component {
  constructor(props) {
    super(props)
    this.audio = React.createRef()
    this.audioProgress = React.createRef()
    this.audioLoadProgress = React.createRef()
  }

  componentDidMount() {
    this.props.loadArchivePlaylist()
    this.props.loadPracticePlaylist()
    this.props.loadSourcePlaylist()

    if (
      window.localStorage.displayPlayer === 'true' &&
      window.localStorage.playerConcertid &&
      window.localStorage.playerNumber
    ) {
      this.props.getConcertList()
      this.props.archivePlayRequest(
        window.localStorage.playerConcertid,
        Number(window.localStorage.playerNumber),
        false
      )
    }
    if (
      window.localStorage.displayPlayer === 'true' &&
      window.localStorage.playerPracticeid &&
      window.localStorage.playerPracticeFile
    ) {
      this.props.getHistory()
      this.props.practicePlayRequest(
        window.localStorage.playerPracticeid,
        Number(window.localStorage.playerPracticeFile),
        0,
        false
      )
    }
    if (
      window.localStorage.displayPlayer === 'true' &&
      window.localStorage.playerSourceid &&
      window.localStorage.playerSourceNumber
    ) {
      this.props.getSource()
      this.props.sourcePlayRequest(
        window.localStorage.playerSourceid,
        Number(window.localStorage.playerSourceNumber),
        false
      )
    }
  }

  componentWillUnmount() {
    this.props.audioStop()
  }

  onLoadStart() {
    if (this.props.audioRef.src) {
      this.props.setLoadingAudio(true)
    }
  }

  onLoadedMetadata(e) {
    if (!isNaN(e.target.duration)) {
      // console.log('この曲の再生時間は ', audio.duration)
      this.props.playUpdate(this.props.current, e.target.duration)
    } else {
      // console.warn('この曲の再生時間は 不明です')
      this.props.playUpdate(this.props.current, undefined)
    }
  }

  onLoadedData(e) {
    if (!isNaN(e.target.duration)) {
      // console.log('この曲の再生時間は ', audio.duration)
      this.props.playUpdate(this.props.current, e.target.duration)
    } else {
      // console.warn('この曲の再生時間は 不明です')
      this.props.playUpdate(this.props.current, undefined)
    }
  }

  onDurationChange(e) {
    if (!isNaN(e.target.duration)) {
      // console.log('この曲の再生時間は ', audio.duration)
      this.props.playUpdate(this.props.current, e.target.duration)
    } else {
      // console.warn('この曲の再生時間は 不明です')
      this.props.playUpdate(this.props.current, undefined)
    }
  }

  onProgress(e) {
    if (e.target.buffered.length > 0) {
      this.props.loadPercentUpdate(
        Math.round((e.target.buffered.end(e.target.buffered.length - 1) / e.target.duration) * 1000) / 10
      )
    } else {
      this.props.loadPercentUpdate(undefined)
    }
  }

  onCanPlayThrough() {
    this.props.setLoadingAudio(false)
  }

  onError() {
    this.props.setLoadingAudio(true)
  }

  onTimeUpdate(e) {
    if (!isNaN(e.target.duration)) {
      this.props.playUpdate(e.target.currentTime, e.target.duration)
      if (this.props.countFlag && e.target.currentTime > 0) {
        this.props.countUp()
      }
    } else {
      this.props.playUpdate(undefined, undefined)
    }
  }

  onEnded() {
    this.playNext()
  }

  playNext() {
    if (this.props.playmode === 'archive') {
      if (this.getAlbum().list.length > this.props.number + 1) {
        // 次のトラックへ
        this.props.archivePlayRequest(this.props.concertid, this.props.number + 1, true)
      } else {
        this.props.audioStop()
      }
    } else if (this.props.playmode === 'practice') {
      const practiceAlbum = libPractice.getPracticeAlbum(this.props.practiceid, this.props.practicePlaylist)
      if (practiceAlbum.file.length > this.props.fileNumber + 1) {
        this.props.practicePlayRequest(this.props.practiceid, this.props.fileNumber + 1, 0, true)
      } else {
        this.props.audioStop()
      }
    } else if (this.props.playmode === 'source') {
      if (this.getSourceAlbum().list.length > this.props.sourceNumber + 1) {
        // 次のトラックへ
        this.props.sourcePlayRequest(this.props.sourceid, this.props.sourceNumber + 1, true)
      } else {
        this.props.audioStop()
      }
    }
  }

  seekProgress(e) {
    if (this.props.displayPlaylist) {
      const total = Math.round(this.props.audioRef.duration)
      if (!isNaN(total)) {
        // console.log(e.pageX, this.audioProgress.clientWidth)
        this.props.audioRef.currentTime = Math.round(total * (e.pageX / this.audioProgress.clientWidth))
        this.props.countPlay(Math.round(total * (e.pageX / this.audioProgress.clientWidth)))
      }
    } else {
      // if (this.props.playlistLoad) this.props.setDisplayPlaylist(true)
      this.props.setDisplayPlaylist(true)
    }
  }

  renderArchiveTrackList() {
    const concert = libArchive.getConcert(this.props.concertid, this.props.archiveConcertList).detail
    // 初期値
    var trackCount = 0
    return concert.contents.map((item, i) => {
      const trackList = item.music.map((num, i) => {
        const trackData = this.getAlbum().list.filter((e) => {
          return e.data === num
        })
        return trackData.map((each, j) => {
          const trackNumber = trackCount
          trackCount += 1
          const title =
            each.data !== false
              ? libArchive.getAudioTitle(this.props.concertid, each.data, this.props.archiveConcertList)
              : each.title
          const addTitle = each.addtitle ? ' ' + each.addtitle : ''
          const composer =
            each.data !== false ? (
              <span className="composer">
                {libArchive.getAudioComposer(this.props.concertid, each.data, this.props.archiveConcertList)}
              </span>
            ) : each.composer ? (
              <span className="composer">{each.composer}</span>
            ) : (
              ''
            )
          const playing = this.props.number === trackNumber ? ' playing' : ''
          const playTypeClass = this.getAlbum().type ? ' ' + this.getAlbum().type : ''
          return (
            <div
              key={'track' + i + j}
              className={'track' + playing + playTypeClass}
              onClick={() => this.props.archivePlayRequest(this.props.concertid, trackNumber, true)}
            >
              <div className="icon">
                <i className="fas fa-play-circle"></i>
              </div>
              <div className="info">
                <span className="title">{title + addTitle}</span>
                {composer}
              </div>
            </div>
          )
        })
      })
      if (!trackList) return false
      if (trackList.reduce((accumulator, currentValue) => accumulator + currentValue.length, 0) === 0) return
      return (
        <div key={'part' + i}>
          <label>{item.label}</label>
          {trackList}
        </div>
      )
    })
  }

  selectPractice(e, id, i, time) {
    e.stopPropagation()
    this.props.practicePlayRequest(id, i, time, true)
  }

  renderPracticeTrackList() {
    const practiceAlbum = libPractice.getPracticeAlbum(this.props.practiceid, this.props.practicePlaylist)
    return practiceAlbum.contents.map((item, i) => {
      let headPlayClass = ''
      if (this.props.fileNumber === i && this.props.current) {
        if (item.list.length > 0) {
          if (Math.ceil(this.props.current) < libPractice.timeSecond(item.list[0].time) - 1) {
            headPlayClass = ' playing'
          }
        } else {
          headPlayClass = ' playing'
        }
      }

      const trackList = item.list.map((each, j) => {
        let playClass = ''
        if (this.props.fileNumber === i && this.props.current) {
          if (Math.ceil(this.props.current) >= libPractice.timeSecond(each.time) - 1) {
            if (item.list.length !== j + 1) {
              if (Math.ceil(this.props.current) < libPractice.timeSecond(item.list[j + 1].time) - 1) {
                playClass = ' playing'
              }
            } else {
              playClass = ' playing'
            }
          }
        }
        const moreLabel =
          'contents' in each ? (
            <div className="more">
              <i className="fas fa-list-ul"></i>
            </div>
          ) : (
            false
          )
        const addTrackList =
          'contents' in each && playClass === ' playing'
            ? each.contents.map((addEach, k) => {
                let addPlayClass = ''
                if (this.props.fileNumber === i && this.props.current && playClass !== '') {
                  if (Math.ceil(this.props.current) >= libPractice.timeSecond(addEach.time) - 1) {
                    if (each.contents.length !== k + 1) {
                      if (Math.ceil(this.props.current) < libPractice.timeSecond(each.contents[k + 1].time) - 1) {
                        addPlayClass = ' playing'
                      }
                    } else {
                      addPlayClass = ' playing'
                    }
                  }
                }
                return (
                  <div
                    key={'list' + i + j + k}
                    className={'list add' + addPlayClass}
                    onClick={(e) => this.selectPractice(e, practiceAlbum.id, i, addEach.time, true)}
                  >
                    <div className="icon">
                      <i className="far fa-play-circle"></i>
                    </div>
                    <div>{addEach.label}</div>
                    <div className="time">{addEach.time}</div>
                  </div>
                )
              })
            : false
        return (
          <div key={'list' + i + j}>
            <div className={'list' + playClass} onClick={(e) => this.selectPractice(e, practiceAlbum.id, i, each.time)}>
              <div className="icon">
                <i className="fas fa-play-circle"></i>
              </div>
              <div>{each.label}</div>
              {moreLabel}
              <div className="time">{each.time}</div>
            </div>
            {addTrackList}
          </div>
        )
      })
      return (
        <div key={'list' + i}>
          <div className={'list' + headPlayClass} onClick={(e) => this.selectPractice(e, practiceAlbum.id, i, '00:00')}>
            <div className="icon">
              <i className="fas fa-play-circle"></i>
            </div>
            <div>{practiceAlbum.file[i].label || '録音開始'}</div>
            <div className="time">00:00</div>
          </div>
          {trackList}
        </div>
      )
    })
  }

  renderSourceTrackList() {
    const source = libSource.getSource(this.props.sourceid, this.props.sourceList).detail
    // 初期値
    var trackCount = 0
    return source.contents.map((item, i) => {
      const trackList = item.music.map((num, i) => {
        const trackData = this.getSourceAlbum().list.filter((e) => {
          return e.data === num
        })
        return trackData.map((each, j) => {
          const trackNumber = trackCount
          trackCount += 1
          const title =
            each.data !== false
              ? libSource.getAudioTitle(this.props.sourceid, each.data, this.props.sourceList)
              : each.title
          const addTitle = each.addtitle ? ' ' + each.addtitle : ''
          const composer =
            each.data !== false ? (
              <span className="composer">
                {libSource.getAudioComposer(this.props.sourceid, each.data, this.props.sourceList)}
              </span>
            ) : each.composer ? (
              <span className="composer">{each.composer}</span>
            ) : (
              ''
            )
          const playing = this.props.sourceNumber === trackNumber ? ' playing' : ''
          const playTypeClass = this.getSourceAlbum().type ? ' ' + this.getSourceAlbum().type : ''
          return (
            <div
              key={'track' + i + j}
              className={'track' + playing + playTypeClass}
              onClick={() => this.props.sourcePlayRequest(this.props.sourceid, trackNumber, true)}
            >
              <div className="icon">
                <i className="fas fa-play-circle"></i>
              </div>
              <div className="info">
                <span className="title">{title + addTitle}</span>
                {composer}
              </div>
            </div>
          )
        })
      })
      if (!trackList) return false
      if (trackList.reduce((accumulator, currentValue) => accumulator + currentValue.length, 0) === 0) return
      return (
        <div key={'part' + i}>
          <label>{item.label}</label>
          {trackList}
        </div>
      )
    })
  }

  getArchiveTitle() {
    return this.getTrack() && this.props.archiveConcertList
      ? this.getTrack().data !== false
        ? libArchive.getAudioTitle(this.props.concertid, this.getTrack().data, this.props.archiveConcertList)
        : this.getTrack().title
      : false
  }

  getAlbum() {
    return this.props.concertid && this.props.archivePlaylist
      ? libArchive.getAlbum(this.props.concertid, this.props.archivePlaylist)
      : false
  }

  getTrack() {
    return this.props.concertid && this.props.archivePlaylist ? this.getAlbum().list[this.props.number] : false
  }

  getPracticeAlbum() {
    return this.props.practiceid && this.props.practicePlaylist
      ? libPractice.getPracticeAlbum(this.props.practiceid, this.props.practicePlaylist)
      : false
  }

  getSourceTrack() {
    return this.props.sourceid && this.props.sourcePlaylist
      ? this.getSourceAlbum().list[this.props.sourceNumber]
      : false
  }

  getSourceTitle() {
    return this.getSourceTrack() && this.props.sourceList
      ? this.getSourceTrack().data !== false
        ? libSource.getAudioTitle(this.props.sourceid, this.getSourceTrack().data, this.props.sourceList)
        : this.getSourceTrack().title
      : false
  }

  getSourceAlbum() {
    return this.props.sourceid && this.props.sourcePlaylist
      ? libSource.getAlbum(this.props.sourceid, this.props.sourcePlaylist)
      : false
  }

  renderTitle(playTypeClass) {
    if (this.props.playmode === 'archive') {
      return (
        <div>
          <span className={playTypeClass}>
            {isNaN(this.props.number)
              ? false
              : this.props.archiveConcertList
              ? libArchive.getConcertTitle(this.props.concertid, this.props.archiveConcertList)
              : false}
          </span>
          <span>
            <i className="fab fa-itunes-note"></i>
            {isNaN(this.props.number) || !this.props.archivePlaylist
              ? '読み込み中'
              : this.getArchiveTitle() +
                (this.getAlbum().list[this.props.number].addtitle
                  ? ' ' + this.getAlbum().list[this.props.number].addtitle
                  : '')}
          </span>
        </div>
      )
    } else if (this.props.playmode === 'practice') {
      if (!this.props.practiceList) return false
      return (
        <div>
          <span className="practice">
            {isNaN(this.props.fileNumber) || !this.props.practicePlaylist ? '読み込み中' : '練習の録音'}
          </span>
          <span>
            <i className="fab fa-itunes-note"></i>
            {isNaN(this.props.fileNumber) || !this.props.practicePlaylist || !this.props.practiceList
              ? '読み込み中'
              : libPractice.getPracticeTitle(this.props.practiceid, this.props.practiceList)}
          </span>
        </div>
      )
    } else if (this.props.playmode === 'source') {
      return (
        <div>
          <span className="source">
            {isNaN(this.props.sourceNumber)
              ? false
              : '参考音源 - ' +
                (this.props.sourceList ? libSource.getSourceTitle(this.props.sourceid, this.props.sourceList) : false)}
          </span>
          <span>
            <i className="fab fa-itunes-note"></i>
            {isNaN(this.props.sourceNumber) || !this.props.sourcePlaylist
              ? '読み込み中'
              : this.getSourceTitle() +
                (this.getSourceAlbum().list[this.props.sourceNumber].addtitle
                  ? ' ' + this.getSourceAlbum().list[this.props.sourceNumber].addtitle
                  : '')}
          </span>
        </div>
      )
    }
  }

  renderArchivePlaylist() {
    if (!this.props.displayPlayer) return
    // if (!this.props.playlistLoad) return
    if (!this.props.archivePlaylist) return
    if (!this.props.archiveConcertList) return
    if (!this.props.concertid) return
    if (this.props.number === undefined) return
    // if (!this.props.displayPlaylist) return
    const showTrackList = this.renderArchiveTrackList()
    const playStatusClass = this.props.playStatus ? ' playing' : ''
    // const playmodeClass = this.props.playmode ? ' ' + this.props.playmode : ''
    const playTypeClass = this.getAlbum() ? ' ' + this.getAlbum().type : ''
    return (
      <div className={'music-list' + (this.props.displayPlaylist ? ' open' : '') + lib.pcClass(this.props.pc)}>
        <div
          className={'header' + playTypeClass + playStatusClass + lib.pcClass(this.props.pc)}
          onClick={() => this.props.setDisplayPlaylist(false)}
        >
          {this.renderTitle(playTypeClass)}
        </div>
        <div className={'label close' + playTypeClass} onClick={() => this.props.setDisplayPlaylist(false)}>
          <i className="fas fa-chevron-down"></i>
        </div>
        <div className="contents">
          <div className="contents-inner">
            <div className="album archive">{showTrackList}</div>
            <div className="gap"></div>
          </div>
        </div>
      </div>
    )
  }

  renderPracticePlaylist() {
    if (!this.props.displayPlayer) return
    if (!this.props.practicePlaylist) return
    if (!this.props.practiceList) return
    if (!this.props.practiceid) return
    // if (!this.props.practiceAlbum) return
    // 確認 これはpracticeだと何にあたるのかわからない
    // if (this.props.number === undefined) return
    const showTrackList = this.renderPracticeTrackList()
    const playStatusClass = this.props.playStatus ? ' playing' : ''
    // const playmodeClass = this.props.playmode ? ' ' + this.props.playmode : ''
    const playTypeClass = ''
    return (
      <div className={'music-list' + (this.props.displayPlaylist ? ' open' : '') + lib.pcClass(this.props.pc)}>
        <div
          className={'header' + playTypeClass + playStatusClass + lib.pcClass(this.props.pc)}
          onClick={() => this.props.setDisplayPlaylist(false)}
        >
          {this.renderTitle(playTypeClass)}
        </div>
        <div className={'label close' + playTypeClass} onClick={() => this.props.setDisplayPlaylist(false)}>
          <i className="fas fa-chevron-down"></i>
        </div>
        <div className="contents">
          <div className="contents-inner">
            <div className="album practice">{showTrackList}</div>
            <div className="gap"></div>
          </div>
        </div>
      </div>
    )
  }

  renderSourcePlaylist() {
    if (!this.props.displayPlayer) return
    // if (!this.props.playlistLoad) return
    if (!this.props.sourcePlaylist) return
    if (!this.props.sourceList) return
    if (!this.props.sourceid) return
    if (this.props.sourceNumber === undefined) return
    // if (!this.props.displayPlaylist) return
    const showTrackList = this.renderSourceTrackList()
    const playStatusClass = this.props.playStatus ? ' playing' : ''
    // const playmodeClass = this.props.playmode ? ' ' + this.props.playmode : ''
    const playTypeClass = this.getSourceAlbum().type ? ' ' + this.getSourceAlbum().type : ''
    return (
      <div className={'music-list' + (this.props.displayPlaylist ? ' open' : '') + lib.pcClass(this.props.pc)}>
        <div
          className={'header' + playTypeClass + playStatusClass + lib.pcClass(this.props.pc)}
          onClick={() => this.props.setDisplayPlaylist(false)}
        >
          {this.renderTitle(playTypeClass)}
        </div>
        <div className={'label close' + playTypeClass} onClick={() => this.props.setDisplayPlaylist(false)}>
          <i className="fas fa-chevron-down"></i>
        </div>
        <div className="contents">
          <div className="contents-inner">
            <div className="album source">{showTrackList}</div>
            <div className="gap"></div>
          </div>
        </div>
      </div>
    )
  }

  renderPlayTime() {
    if (this.props.current && this.props.duration) {
      return (
        <div className="time">
          <span>{this.props.currentTime}</span>
          <span>{this.props.durationTime}</span>
        </div>
      )
    } else {
      return (
        <div className="time">
          <span>00:00</span>
          <span>00:00</span>
        </div>
      )
    }
  }

  render() {
    // State List
    const {
      pc,

      // アーカイブプレイリスト
      // loadingArchivePlaylist,
      archivePlaylist,
      // archiveBaseUrl,

      // オーディオタグ本体
      // audioRef,

      // 要素の表示状態
      displayPlayer,
      displayPlaylist,
      // playlistLoad,
      playStatus,
      current,
      // currentTime,
      duration,
      // durationTime,
      playPercent,

      // オーディオタグの情報
      loadingAudio,
      loadPercent,

      // 曲情報
      playmode,
      // concertid,
      // number,
      // album,
      // track
    } = this.props
    // Dispatch List
    // const { logout } = this.props

    const button = playStatus ? (
      !loadingAudio || current || duration ? (
        <i className="fas fa-pause"></i>
      ) : (
        <i className="fas fa-spinner fa-pulse"></i>
      )
    ) : (
      <i className="fas fa-play"></i>
    )
    const playStatusClass = this.props.playStatus ? ' playing' : ''
    const playTime = this.renderPlayTime()
    const playProgress = playPercent ? { backgroundSize: playPercent + '% 100%' } : { backgroundSize: '0% 100%' }
    const loadProgress = loadPercent ? { backgroundSize: loadPercent + '% 100%' } : { backgroundSize: '0% 100%' }
    const playerClass = displayPlayer ? ' open' : ''
    const displayPlaylistClass = displayPlaylist ? ' list-open' : ''
    const playTypeClass = this.getAlbum() ? ' ' + this.getAlbum().type : ''
    const openIcon = archivePlaylist ? <i className="fas fa-chevron-up"></i> : ''
    const showPlaylist =
      playmode === 'archive'
        ? this.renderArchivePlaylist()
        : playmode === 'practice'
        ? this.renderPracticePlaylist()
        : this.renderSourcePlaylist()

    const prevButton =
      this.props.playmode === 'practice' ? (
        <div
          className={'control prev' + playStatusClass + playTypeClass + displayPlaylistClass}
          onClick={() => this.props.audioBackward()}
        >
          <i className="fas fa-backward"></i>
        </div>
      ) : (
        false
      )
    const nextButton =
      this.props.playmode === 'practice' ? (
        <div
          className={'control next' + playStatusClass + playTypeClass + displayPlaylistClass}
          onClick={() => this.props.audioForward()}
        >
          <i className="fas fa-forward"></i>
        </div>
      ) : (
        false
      )

    return (
      <div className={'audio' + (pc ? ' pc' : ' mobile')}>
        <div className={'player' + playerClass}>
          {prevButton}
          <div
            className={'control play' + playStatusClass + playTypeClass + displayPlaylistClass}
            onClick={playStatus ? () => this.props.audioPause() : () => this.props.audioPlay()}
          >
            {button}
          </div>
          <div
            className={'control stop' + playStatusClass + playTypeClass + displayPlaylistClass}
            onClick={() => this.props.audioStop(true)}
          >
            <i className="fas fa-stop"></i>
          </div>
          {nextButton}
          <div
            className={'audio-progress' + playStatusClass + playTypeClass + displayPlaylistClass}
            style={playProgress}
            ref={(i) => (this.audioProgress = i)}
            onClick={(e) => this.seekProgress(e)}
          >
            {playTime}
          </div>
          <div
            className={'audio-load-progress' + playStatusClass + playTypeClass + displayPlaylistClass}
            style={loadProgress}
            ref={(i) => (this.audioLoadProgress = i)}
          ></div>
          <div
            className={'music-info' + playStatusClass + playTypeClass + displayPlaylistClass}
            onClick={() => {
              this.props.archivePlaylist ? this.props.setDisplayPlaylist(true) : false
            }}
          >
            {this.renderTitle(playTypeClass)}
          </div>
          <div className={'label' + displayPlaylistClass + playTypeClass}>{openIcon}</div>
        </div>
        <audio
          ref={(i) => {
            !this.props.audioRef ? this.props.setAudioRef(i) : false
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
          controls={false}
        ></audio>
        {showPlaylist}
        <div
          className={'music-list-background' + displayPlaylistClass}
          onClick={() => this.props.setDisplayPlaylist(false)}
        ></div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Audio)
