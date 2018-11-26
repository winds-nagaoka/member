import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { getSchedule } from '../../../Actions/Schedule'

import { goBack } from 'react-router-redux'

import './Schedule.css'

function mapStateToProps(state) {
  return {
    mobile: state.status.mobile,

    loadingSchedule: state.schedule.loading,
    schedule: state.schedule.data,
    loadingManager: state.manager.loading,
    manager: state.manager.data,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getSchedule () {
      dispatch(getSchedule())
    },

    goBack () {
      dispatch(goBack())
    }
  }
}

class Schedule extends Component {
  componentDidMount () {
    this.props.getSchedule()
  }

  renderScheduleNext (loading, schedule) {
    if (loading || !schedule) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    const today = schedule.today ? <span className='today'>本日</span> : ''
    const next = schedule.next
    const date = next.date.split('-')
    const month = date[1].match(/0[0-9]/) ? date[1].replace(/^0/g, '') : date[1]
    const day = date[2].match(/0[0-9]/) ? date[2].replace(/^0/g, '') : date[2]
    const memo = next.memo ? <span className='memo'>{next.memo}</span> : ''
    const studio = next.studio.match(/第[1-9]スタジオ/) ? <span>第<span>{next.studio.replace('第', '').replace('スタジオ', '')}</span>スタジオ</span> : <span>{next.studio}</span>
    return (
      <div className='next'>
        <div className='next-labels'>
          {today}
          {memo}
          {/* <span className='memo'>今井合奏</span> */}
        </div>
        <div className='next-day'>
          {/* <span className='year'>{date[0]}<span>年</span></span> */}
          <span className='month'>{month}<span>月</span></span>
          <span className='day'>{day}<span>日</span></span>
          <span className={'date ' + next.weeken}>{next.weekjp}</span>
        </div>
        <div className='next-time'>
          <span className='time'>{next.time.start}</span><span className='while'>～</span><span className='time'>{next.time.end}</span>
        </div>
        <div className='next-place'>
          <span className='place'>{next.place}</span>
          <span className='studio'>{studio}</span>
        </div>
      </div>
    )
  }

  renderScheduleList (loading, schedule) {
    if (loading || !schedule) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    return Object.keys(schedule.schedule).map((key, i) => {
      console.log(key,schedule.schedule[key])
      const year = key.split('-')[0]
      const month = key.split('-')[1].match(/0[0-9]/) ? key.split('-')[1].replace(/^0/g, '') : key.split('-')[1]
      const list = schedule.schedule[key].map((each, j) => {
        const date = each.date.split('-')
        // const month = date[1].match(/0[0-9]/) ? date[1].replace(/^0/g, '') : date[1]
        const day = date[2].match(/0[0-9]/) ? date[2].replace(/^0/g, '') : date[2]
        const memo = each.memo ? <span className='memo'>{each.memo}</span> : ''
        const studio = each.studio.match(/第[1-9]スタジオ/) ? <span>第<span>{each.studio.replace('第', '').replace('スタジオ', '')}</span>スタジオ</span> : <span>{each.studio}</span>
        return (
          <div key={'list' + j} className='each'>
            <div className='labels'>
              {/* {today} */}
              {memo}
              {/* <span className='memo'>今井合奏</span> */}
            </div>
            <div className='days'>
              {/* <span className='year'>{date[0]}<span>年</span></span> */}
              {/* <span className='month'>{month}<span>月</span></span> */}
              <span className='day'>{day}<span>日</span></span>
              <span className={'date ' + each.weeken}>{each.weekjp}</span>
            </div>
            <div className='times'>
              <span className='time'>{each.time.start}</span><span className='while'>～</span><span className='time'>{each.time.end}</span>
            </div>
            <div className='places'>
              <span className='place'>{each.place}</span>
              <span className='studio'>{studio}</span>
            </div>
          </div>
        )
      })
      return (
        <div key={'month' + i} className='schedule-list'>
          <div className='month-title'><span className='year'>{year}<span>年</span></span><span className='month'>{month}<span>月</span></span></div>
          <div className='list'>{list}</div>
        </div>
      )
    })
  }

  render () {
    // State List
    const { mobile, loadingSchedule, schedule} = this.props
    // Dispatch List
    const { goBack } = this.props

    const mobileMode = mobile ? ' mobile' : ''

    const showScheduleNext = this.renderScheduleNext(loadingSchedule, schedule)
    const showScheduleList = this.renderScheduleList(loadingSchedule, schedule)
    return (
      <div className={'schedule' + mobileMode}>
        <div className='contents-header'>
          <h2>練習日程</h2>
        </div>

        <div className='box schedule-next'>
          <div className='title-frame'>
            <label>次回の練習日</label>
            <div className='text'>
              {showScheduleNext}
            </div>
          </div>
        </div>

        <div className='box schedule-next'>
          <div className='title-frame'>
            <label>今後の練習日程</label>
            <div className='text'>
              {showScheduleList}
            </div>
          </div>
        </div>

        {/* <div>
          <div>
            {showScheduleList}
          </div>
        </div> */}
        {/* <Link to='/'>ホーム</Link> */}

        <div className='box back-to-home'>
          <div className='back-link'>
            <ul>
              <li><Link to='/'><div className='inner'><i className="fas fa-angle-left"></i><span>ホーム</span></div></Link></li>
            </ul>
          </div>
        </div>
        <div onClick={() => {goBack()}}>もどる</div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)
