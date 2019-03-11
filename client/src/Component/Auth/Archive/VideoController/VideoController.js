import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import * as lib from '../../../../Library/Library'
import * as libArchive from '../../Archive/Library/Library'

import {
  videoPlay,
  videoPause,
  videoStop
} from '../../../../Actions/Archive'

import './VideoController.css'
// import lib from 'react-confirm-alert';

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    displayVideoController: state.archive.displayVideoController,
    loadingVideoSource: state.archive.loadingVideoSource,
    videoLoadPercent: state.archive.videoLoadPercent,

    videoCurrent: state.archive.videoCurrent,
    videoCurrentTime: state.archive.videoCurrentTime,
    videoDuration: state.archive.videoDuration,
    videoDurationTime: state.archive.videoDurationTime,
    videoPlayPercent: state.archive.videoPlayPercent,

    videoPlayStatus: state.archive.videoPlayStatus
  }
}

function mapDispatchToProps(dispatch) {
  return {
    videoPlay (e) {
      dispatch(videoPlay(e))
    },
    videoPause (e) {
      dispatch(videoPause(e))
    },
    videoStop (e) {
      dispatch(videoStop(e))
    }
  }
}

class VideoController extends Component {
  constructor (props) {
    super(props)
    this.videoProgress = React.createRef()
    this.videoLoadProgress = React.createRef()
  }

  seekProgress (e) {
    const total = Math.round(this.props.audioRef.duration)
    if(!isNaN(total)){
      // console.log(e.pageX, this.audioProgress.clientWidth)
      this.props.audioRef.currentTime = Math.round(total * (e.pageX / this.audioProgress.clientWidth))
    }
  }

  renderPlayTime () {
    if (this.props.videoCurrent && this.props.videoDuration) {
      return <div className='time'><span>{this.props.videoCurrentTime}</span><span>{this.props.videoDurationTime}</span></div>
    } else {
      return <div className='time'><span>00:00</span><span>00:00</span></div>
    }
  }

  render () {
    const displayVideoControllerClass = this.props.displayVideoController ? ' open' : ''
    const button = this.props.videoPlayStatus ? ((!this.props.loadingVideoSource || this.props.videoCurrent || this.props.videoDuration) ? <i className='fas fa-pause'></i> : <i className='fas fa-spinner fa-pulse'></i>) : <i className='fas fa-play'></i>
    const playStatusClass = this.props.videoPlayStatus ? ' playing' : ''
    const playTime = this.renderPlayTime()
    const playProgress = this.props.videoPlayPercent ? {backgroundSize: this.props.videoPlayPercent + '% 100%'} : {backgroundSize: '0% 100%'}
    const loadProgress = this.props.videoLoadPercent ? {backgroundSize: this.props.videoLoadPercent + '% 100%'} : {backgroundSize: '0% 100%'}
    const playTypeClass = ' other' //this.getAlbum() ? ' ' + this.getAlbum().type : ''

    return (
      <div className={'video-controller' + lib.pcClass(this.props.pc)}>
        <div className={'player' + displayVideoControllerClass}>
          <button className={'control play' + playStatusClass + playTypeClass} onClick={this.props.videoPlayStatus ? (e) => this.props.videoPause(e) : (e) => this.props.videoPlay(e)}>{button}</button>
          <button className={'control stop' + playStatusClass + playTypeClass} onClick={(e) => this.props.videoStop(e)}><i className='fas fa-stop'></i></button>
          <div className={'video-progress' + playStatusClass + playTypeClass} style={playProgress} ref={(i) => this.videoProgress = i} onClick={(e) => this.seekProgress(e)}>{playTime}</div>
          <div className={'video-load-progress' + playStatusClass + playTypeClass} style={loadProgress} ref={(i) => this.videoLoadProgress = i}></div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoController)
