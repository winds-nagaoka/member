import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { loadingAudio, loadingAudioUpdate, playUpdate, audioStatusUpdate } from '../../../../Actions/Audio'

import { showToast } from '../../../../Actions/Toast'

import './Audio.css'

function mapStateToProps(state) {
  return {
    mobile: state.status.mobile,

    loadingAudio: state.audio.loadingAudio,
    src: state.audio.src,

    playRequest: state.audio.playRequest,
    playStatus: state.audio.playStatus,
    duration: state.audio.duration,
    current: state.audio.current,
    percent: state.audio.percent,

    loadingPlaylist: state.audio.loadingPlaylist,
    playlist: state.audio.playlist,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadingAudio (status) {
      dispatch(loadingAudio(status))
    },
    loadingAudioUpdate (percent) {
      dispatch(loadingAudioUpdate(percent))
    },
    playUpdate (current, duration) {
      dispatch(playUpdate(current, duration))
    },
    audioStatusUpdate (status) {
      dispatch(audioStatusUpdate(status))
    }
  }
}

class Audio extends Component {
  constructor (props) {
    super(props)
    this.audio = React.createRef()
  }
  componentDidMount () {
  }
  
  componentWillReceiveProps () {
  }
  
  componentWillUnmount () {
  }

  componentDidUpdate (prevProps) {
    console.warn('componentDidUpdate')
    if (this.props.playRequest && this.props.playRequest !== prevProps.playRequest) {
      this.playAudio()
    }
    if (!this.props.playRequest && this.props.playRequest !== prevProps.playRequest) {
      this.stopAudio()
    }
  }

  playAudio () {
    console.warn('playAudio - play')
    if (!this.audio) return
    this.audio.play()
  }

  stopAudio () {
    console.warn('playAudio - stop')
    if (!this.audio) return
    this.audio.pause()
    this.audio.currentTime = 0
  }

  onLoadStart (e) {
    if (this.props.src) {
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
      this.props.loadingAudioUpdate(Math.round((e.target.buffered.end(e.target.buffered.length-1)/e.target.duration)*1000)/10)
    } else {
      this.props.loadingAudioUpdate(undefined)
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
    this.setState({loadAudio: true})
    // this.playNext()
  }
  
  setSrc () {
    if (!this.audio) return
    if (this.props.src && this.props.src !== this.audio.src) {
      console.warn('setSrc')
      this.audio.src = this.props.src
    }
  }

  render () {
    // State List
    const {
      mobile,

      loadingAudio,
      src,
      playRequest,
      playing,
      duration,
      current,
      percent,
  
      loadingPlaylist,
      playlist,
     } = this.props
    // Dispatch List
    // const { logout } = this.props

    const mobileMode = mobile ? ' mobile' : ''

    this.setSrc(src)
    // this.playAudio(playing)

    return (
      <div className={'audio' + mobileMode}>
        <audio
          ref={this.audio}
          onLoadStart={(e) => this.onLoadStart(e)}
          onLoadedMetadata={(e) => this.onLoadedMetadata(e)}
          onLoadedData={(e) => this.onLoadedData(e)}
          onDurationChange={(e) => this.onDurationChange(e)}
          onProgress={(e) => this.onProgress(e)}
          onCanPlayThrough={(e) => this.onCanPlayThrough(e)}
          onError={(e) => this.onError(e)}
          onTimeUpdate={(e) => this.onTimeUpdate(e)}
          onEnded={(e) => this.onEnded(e)}
          controls='none'
        ></audio>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Audio)
