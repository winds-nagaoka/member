import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { connectSocket, disconnectSocket } from '../../../Actions/Socket'

import { getList } from '../../../Actions/Cast'

import { requestPlayAudio, requestStopAudio } from '../../../Actions/Audio'

import './Record.css'

function mapStateToProps(state) {
  return {
    mobile: state.status.mobile,

    loadingCastList: state.cast.loadingList,
    castList: state.cast.list,

    playStatus: state.audio.playStatus
  }
}

function mapDispatchToProps(dispatch) {
  return {
    connectSocket () {
      dispatch(connectSocket())
    },
    disconnectSocket () {
      dispatch(disconnectSocket())
    },
    getList () {
      dispatch(getList())
    },

    requestPlayAudio (src, withPlay) {
      dispatch(requestPlayAudio(src, withPlay))
    },
    requestStopAudio () {
      dispatch(requestStopAudio())
    }
  }
}

class Record extends Component {
  componentDidMount () {
    this.props.connectSocket()
    this.props.getList()
  }

  componentWillUnmount () {
    this.props.disconnectSocket()
  }

  renderList (loading, castList) {
    if (loading || !castList) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    if (castList.length === 0) return <div className='box'><div className='text'>現在放送していません</div></div>
    return (
      <div className='box cast'>
        <div className='title-frame'>
          <label>キャスト</label>
          <div className='text'>
            放送中です。
            {castList.map((each, i) => {
              return <p key={'id' + i} onClick={() => this.a()}>{each.id}</p>
            })}
          </div>
        </div>
      </div>
    )
  }

  render () {
    // State List
    const { mobile, playStatus, loadingCastList, castList } = this.props
    // Dispatch List
    const { requestPlayAudio, requestStopAudio } = this.props

    const mobileMode = mobile ? ' mobile' : ''

    const showPlayStatus = playStatus ? 'PLAY' : 'STOP'

    const showCastList = this.renderList(loadingCastList, castList)

    return (
      <div className={'cast' + mobileMode}>
        <div className='contents-header'>
          <h2>練習の録音</h2>
        </div>
        <div onClick={() => requestPlayAudio('https://audio.winds-n.com/member/no5.mp3', true)}>再生</div>
        {/* <div onClick={() => requestPlayAudio('https://audio.winds-n.com/30th/002.mp3', true)}>再生</div> */}
        <div onClick={() => requestStopAudio()}>停止</div>
        <div>{showPlayStatus}</div>
        {showCastList}

        <div className='box back-to-home'>
          <div className='back-link'>
            <ul>
              <li><Link to='/'><div className='inner'><i className="fas fa-angle-left"></i><span>ホーム</span></div></Link></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Record)
