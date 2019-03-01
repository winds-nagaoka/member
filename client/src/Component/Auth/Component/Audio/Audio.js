import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import * as libArchive from '../../Archive/Library/Library'

import {
  loadArchivePlaylist,
  setAudioRef,
  loadingAudio,
  loadPercentUpdate,
  // setPlayStatus,
  playUpdate,
  setDisplayPlaylist,

  archivePlayRequest,

  audioPlay,
  audioPause,
  audioStop
} from '../../../../Actions/Audio'

import { getConcertList } from '../../../../Actions/Archive'

import './Audio.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,

    // アーカイブプレイリスト
    loadingArchivePlaylist: state.audio.loadingArchivePlaylist,
    archivePlaylist: state.audio.archivePlaylist,
    archiveBaseUrl: state.audio.archiveBaseUrl,
    archiveConcertList: state.archive.concertList,

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
    playmode: state.audio.playmode,
    concertid: state.audio.concertid,
    number: state.audio.number,
    album: state.audio.album,
    track: state.audio.track
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadArchivePlaylist () {
      dispatch(loadArchivePlaylist())
    },
    getConcertList () {
      dispatch(getConcertList())
    },
    setAudioRef (audioRef) {
      dispatch(setAudioRef(audioRef))
    },
    loadingAudio (status) {
      dispatch(loadingAudio(status))
    },
    loadPercentUpdate (percent) {
      dispatch(loadPercentUpdate(percent))
    },
    // setPlayStatus (status) {
    //   dispatch(setPlayStatus(status))
    // },
    playUpdate (current, duration) {
      dispatch(playUpdate(current, duration))
    },
    setDisplayPlaylist (displayPlaylist) {
      dispatch(setDisplayPlaylist(displayPlaylist))
    },

    archivePlayRequest (id, number, playRequest) {
      dispatch(archivePlayRequest(id, number, playRequest))
    },

    audioPlay (e) {
      dispatch(audioPlay(e))
    },
    audioPause (e) {
      dispatch(audioPause(e))
    },
    audioStop (e) {
      dispatch(audioStop(e))
    }
  }
}

class Audio extends Component {
  constructor (props) {
    super(props)
    this.audio = React.createRef()
    this.audioProgress = React.createRef()
    this.audioLoadProgress = React.createRef()
  }

  componentDidMount () {
    // this.props.loadArchivePlaylist()
    this.props.loadArchivePlaylist()
    // this.props.displayPlayer ? this.props.loadArchivePlaylist() : false
    // if (window.localStorage.displayPlayer) {
    //   if (window.localStorage.playerConcertid && window.localStorage.playerNumber) {
    //     this.props.archivePlayRequest(window.localStorage.playerConcertid, window.localStorage.playerNumber, false)
    //   }
    // }
  }

  componentWillUnmount () {
    this.props.audioStop()
  }

  // componentDidUpdate (prevProps) {
  //   console.warn('componentDidUpdate')
  //   if (this.props.playRequest && this.props.playRequest !== prevProps.playRequest) {
  //     this.playAudio()
  //   }
  //   if (!this.props.playRequest && this.props.playRequest !== prevProps.playRequest) {
  //     this.stopAudio()
  //   }
  // }

  // playAudio () {
  //   console.warn('playAudio - play')
  //   if (!this.audio) return
  //   this.audio.play()
  // }

  // stopAudio () {
  //   console.warn('playAudio - stop')
  //   if (!this.audio) return
  //   this.audio.pause()
  //   this.audio.currentTime = 0
  // }

  onLoadStart (e) {
    if (this.props.audioRef.src) {
      this.props.loadingAudio(true)
    }
  }

  onLoadedMetadata (e) {
    if(!isNaN(e.target.duration)){
      // console.log('この曲の再生時間は ', audio.duration)
      this.props.playUpdate(this.props.current, e.target.duration)
    } else {
      // console.warn('この曲の再生時間は 不明です')
      this.props.playUpdate(this.props.current, undefined)
    }
  }

  onLoadedData (e) {
    if(!isNaN(e.target.duration)){
      // console.log('この曲の再生時間は ', audio.duration)
      this.props.playUpdate(this.props.current, e.target.duration)
    } else {
      // console.warn('この曲の再生時間は 不明です')
      this.props.playUpdate(this.props.current, undefined)
    }
  }

  onDurationChange (e) {
    if(!isNaN(e.target.duration)){
      // console.log('この曲の再生時間は ', audio.duration)
      this.props.playUpdate(this.props.current, e.target.duration)
    } else {
      // console.warn('この曲の再生時間は 不明です')
      this.props.playUpdate(this.props.current, undefined)
    }
  }

  onProgress (e) {
    if (e.target.buffered.length > 0) {
      this.props.loadPercentUpdate(Math.round((e.target.buffered.end(e.target.buffered.length-1)/e.target.duration)*1000)/10)
    } else {
      this.props.loadPercentUpdate(undefined)
    }
  }

  onCanPlayThrough (e) {
    this.props.loadingAudio(false)
  }

  onError (e) {
    this.props.loadingAudio(true)
  }

  onTimeUpdate (e) {
    if(!isNaN(e.target.duration)){
      this.props.playUpdate(e.target.currentTime, e.target.duration)
      // if(this.state.audioCountFlag && e.target.currentTime > 10) {
      //   req.countUp('audio', this.state.playAlbum, this.state.playTrack, this.audio.src)
      //   this.setState({audioCountFlag: false})
      // }
    } else {
      this.props.playUpdate(undefined, undefined)
    }
  }

  onEnded (e) {
    console.log('再生終了')
    // this.setState({loadAudio: true})
    this.playNext()
  }

  playNext () {
    if (this.props.album.list.length > (this.props.number + 1)) {
      // 次のトラックへ
      this.props.archivePlayRequest(this.props.concertid, this.props.number + 1, true)
    } else {
      this.props.audioStop()
    }
  }

  seekProgress (e) {
    if (this.props.displayPlaylist) {
      const total = Math.round(this.props.audioRef.duration)
      if(!isNaN(total)){
        // console.log(e.pageX, this.audioProgress.clientWidth)
        this.props.audioRef.currentTime = Math.round(total * (e.pageX / this.audioProgress.clientWidth))
      }
    } else {
      if (this.props.playlistLoad) this.props.setDisplayPlaylist(true)
    }
  }

  selectPlay (number) {
    this.props.archivePlayRequest(this.props.concertid, number, true)
  }

  renderTrackList () {
    if (!this.props.archiveConcertList) return
    const concert = libArchive.getConcert(this.props.concertid, this.props.archiveConcertList).detail
    // 初期値
    var trackCount = 0
    return concert.contents.map((item, i) => {
      const trackList = item.music.map((num, i) => {
        const trackData = this.props.album.list.filter((e) => {return e.data === num})
        return trackData.map((each, j) => {
          const trackNumber = trackCount
          trackCount += 1
          const title = each.data !== false ? libArchive.getAudioTitle(this.props.concertid, each.data, this.props.archiveConcertList) : each.title
          const addTitle = each.addtitle ? ' ' + each.addtitle : ''
          const composer = each.data !== false ? <span className='composer'>{libArchive.getAudioComposer(this.props.concertid, each.data, this.props.archiveConcertList)}</span> : (each.composer ? <span className='composer'>{each.composer}</span> : '')
          const playing = this.props.number === trackNumber ? ' playing' : ''
          const playTypeClass = this.props.album.type ? ' ' + this.props.album.type : ''
          return (
            <div key={'track' + i + j} className={'track' + playing + playTypeClass} onClick={() => this.selectPlay(trackNumber)}>
              <div className='icon'><i className="fas fa-play-circle"></i></div>
              <div className='info'>
                <span className='title'>{title + addTitle}</span>
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

  getTitle () {
    return this.props.track.data !== false ? libArchive.getAudioTitle(this.props.concertid, this.props.track.data, this.props.archiveConcertList) : this.props.track.title
  }

  renderPlaylist () {
    if (!this.props.displayPlayer) return
    if (!this.props.playlistLoad) return
    if (!this.props.concertid) return
    // if (!this.props.displayPlaylist) return
    const showTrackList = this.renderTrackList()
    const playStatusClass = this.props.playStatus ? ' playing' : ''
    // const playmodeClass = this.props.playmode ? ' ' + this.props.playmode : ''
    const playTypeClass = this.props.album.type ? ' ' + this.props.album.type : ''
    return (
      <div className={'music-list' + (this.props.displayPlaylist ? ' open' : '')}>
        <div className={'header' + playTypeClass + playStatusClass} onClick={() => this.props.setDisplayPlaylist(false)}>
          <div>
            <span className={playTypeClass}>{libArchive.getConcertTitle(this.props.concertid, this.props.archiveConcertList)}</span>
            <span><i className='fab fa-itunes-note'></i>{isNaN(this.props.number) ? '曲を選択してください' : (this.getTitle() + (this.props.album.list[this.props.number].addtitle ? ' ' + this.props.album.list[this.props.number].addtitle : ''))}</span>
          </div>
        </div>
        <div className={'label close' + playTypeClass} onClick={() => this.props.setDisplayPlaylist(false)}><i className="fas fa-chevron-down"></i></div>
        <div className='contents'>
          <div className='album'>
            {showTrackList}
          </div>
          <div className='gap'></div>
        </div>
      </div>
    )
  }

  renderPlayTime () {
    if (this.props.current && this.props.duration) {
      return <div className='time'><span>{this.props.currentTime}</span><span>{this.props.durationTime}</span></div>
    } else {
      return <div className='time'><span>00:00</span><span>00:00</span></div>
    }
  }

  render () {
    // State List
    const {
      pc,

      // アーカイブプレイリスト
      loadingArchivePlaylist,
      archivePlaylist,
      archiveBaseUrl,

      // オーディオタグ本体
      audioRef,

      // 要素の表示状態
      displayPlayer,
      displayPlaylist,
      playlistLoad,
      playStatus,
      current,
      currentTime,
      duration,
      durationTime,
      playPercent,

      // オーディオタグの情報
      loadingAudio,
      loadPercent,

      // 曲情報
      playmode,
      concertid,
      number,
      album,
      track
     } = this.props
    // Dispatch List
    // const { logout } = this.props

    // console.warn('playStatus', playStatus)

    const button = playStatus ? ((loadingAudio && (current && duration)) ? <i className='fas fa-pause'></i> : <i className='fas fa-spinner fa-pulse'></i>) : <i className='fas fa-play'></i>
    const playTime = this.renderPlayTime()
    const playProgress = playPercent ? {backgroundSize: playPercent + '% 100%'} : {backgroundSize: '0% 100%'}
    const loadProgress = loadPercent ? {backgroundSize: loadPercent + '% 100%'} : {backgroundSize: '0% 100%'}

    const playStatusClass = this.props.playStatus ? ' playing' : ''

    const playerClass = displayPlayer ? ' open' : ''
    const displayPlaylistClass = displayPlaylist ? ' list-open' : ''

    // const playmodeClass = playmode ? ' ' + playmode : ''
    const playTypeClass = album ? (album.type ? ' ' + album.type : '') : ''

    const openIcon = playlistLoad ? <i className='fas fa-chevron-up'></i> : ''

    const showPlaylist = this.renderPlaylist()

    return (
      <div className={'audio' + (pc ? ' pc' : ' mobile')}>
        <div className={'player' + playerClass}>
          <button className={'control play' + playStatusClass + playTypeClass + displayPlaylistClass} onClick={playStatus ? (e) => this.props.audioPause(e) : (e) => this.props.audioPlay(e)}>{button}</button>
          <button className={'control stop' + playStatusClass + playTypeClass + displayPlaylistClass} onClick={(e) => this.props.audioStop(e)}><i className='fas fa-stop'></i></button>
          <div className={'audio-progress' + playStatusClass + playTypeClass + displayPlaylistClass} style={playProgress} ref={(i) => this.audioProgress = i} onClick={(e) => this.seekProgress(e)}>{playTime}</div>
          <div className={'audio-load-progress' + playStatusClass + playTypeClass + displayPlaylistClass} style={loadProgress} ref={(i) => this.audioLoadProgress = i}></div>
          <div className={'music-info' + playStatusClass + playTypeClass + displayPlaylistClass} onClick={() => {this.props.playlistLoad ? this.props.setDisplayPlaylist(true) : false}}>
            <div>
              <span>{isNaN(this.props.number) ? '' : libArchive.getConcertTitle(this.props.concertid, this.props.archiveConcertList)}</span>
              <span><i className='fab fa-itunes-note'></i>{isNaN(this.props.number) || !this.props.playlistLoad ? '曲を選択してください' : (this.getTitle() + (this.props.album.list[this.props.number].addtitle ? ' ' + this.props.album.list[this.props.number].addtitle : ''))}</span>
            </div>
          </div>
          <div className={'label' + displayPlaylistClass + playTypeClass}>{openIcon}</div>
        </div>
        <audio
          ref={(i) => {!this.props.audioRef ? this.props.setAudioRef(i) : false}}
          onLoadStart={(e) => this.onLoadStart(e)}
          onLoadedMetadata={(e) => this.onLoadedMetadata(e)}
          onLoadedData={(e) => this.onLoadedData(e)}
          onDurationChange={(e) => this.onDurationChange(e)}
          onProgress={(e) => this.onProgress(e)}
          onCanPlayThrough={(e) => this.onCanPlayThrough(e)}
          onError={(e) => this.onError(e)}
          onTimeUpdate={(e) => this.onTimeUpdate(e)}
          onEnded={(e) => this.onEnded(e)}
          controls={false}
        ></audio>
        {showPlaylist}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Audio)
