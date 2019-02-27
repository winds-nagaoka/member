import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { getConcertList, setOverviewid } from '../../../../Actions/Archive'

import * as lib from '../Library/Library'

import './Overview.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    loadingArchive: state.archive.loading,
    concertList: state.archive.concertList,
    overviewid: state.archive.overviewid
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getConcertList () {
      dispatch(getConcertList())
    },
    setOverviewid (id) {
      dispatch(setOverviewid(id))
    }
  }
}

class Overview extends Component {
  constructor (props) {
    super(props)
    const { params } = this.props.match
    const id = params.id ? params.id : ''
    console.log(id)
    this.props.setOverviewid(id)
  }

  // 直接アクセスしたときに必要
  componentDidMount () {
    this.props.getConcertList()
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

  setAudio (num) {
    Actions.setAudio(this.state.id, num)
    if (audioPlayerStore) Actions.playerDisplay(true)
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
      return <li key={'l' + item.id + i}><label className={list.label.match(/第[0-9]部/) ? '' : 'other'}>{list.label}</label><ol>{ml}</ol></li>
    })
  }

  showPoster (item) {
    if (item['poster']) {
      return <img src={item.poster} />
    } else {
      return <div className='no-poster'><div><span>NO IMAGE</span></div></div>
    }
  }

  renderOverview (loadingArchive, concertList) {
    if (loadingArchive || !concertList) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    const item = lib.getConcert(this.props.overviewid, this.props.concertList).detail
    console.log(item)
    return (
      <div className='article'>
        <div className='title'><h2>{item.title}</h2></div>
        {/* <ConcertNavigation id={this.state.id} /> */}
        <div className='concert-detail'>
          <div className='poster'>
            {this.showPoster(item)}
          </div>
          <div className='overview-detail'>
            <div>
              <label>概要</label>
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

  render () {
    // State List
    const { pc, loadingArchive, concertList, overviewid } = this.props

    const showOverview = this.renderOverview(loadingArchive, concertList)

    return (
      <div className='box archive-overview'>
        {showOverview}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
