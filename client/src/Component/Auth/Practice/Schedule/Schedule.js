import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'
import { getSchedule } from '../../../../Actions/Schedule'
import { getSource } from '../../../../Actions/Source'

import Forward from '../../../../Library/Icons/Forward'
import * as lib from '../../../../Library/Library'

// import { goBack } from 'react-router-redux'

import './Schedule.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,

    loadingSchedule: state.schedule.loading,
    schedule: state.schedule.data,
    loadingManager: state.manager.loading,
    manager: state.manager.data,
    loadingSource: state.source.loading,
    source: state.source.list
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setNavigationTitle (title) {
      dispatch(setNavigationTitle(title))
    },
    setBackNavigation (backNavigation, backNavigationPath) {
      dispatch(setBackNavigation(backNavigation, backNavigationPath))
    },
    getSchedule () {
      dispatch(getSchedule())
    },
    getSource () {
      dispatch(getSource())
    }
  }
}

class Schedule extends Component {
  componentDidMount () {
    this.props.setNavigationTitle('練習日程')
    this.props.setBackNavigation(true, '/')
    this.props.getSchedule()
    this.props.getSource()
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
        </div>
        <div className='next-day'>
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
            <div className='labels'>
              {/* {today} */}
              {memo}
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

  renderScheduleSync () {
    if (lib.browser(window.navigator.userAgent) === 'iPhone') {
      return (
        <div className={'box button' + lib.pcClass(this.props.pc)}>
          <a href='webcal://api.winds-n.com/schedule/cal.ics'>カレンダーアプリと同期する</a>
        </div>
      )
    }
  }

  renderSource () {
    const link = this.props.loading || !this.props.source || this.props.source.length === 0 ? <li><div className='disabled-link'><div className='inner'><span>参考音源</span><Forward /></div></div></li> : <li><Link to='/practice/source'><div className='inner'><span>参考音源</span><Forward /></div></Link></li>
    return (
      <div className={'box' + lib.pcClass(this.props.pc)}>
        <div className='link'>
          <ul>
            {link}
          </ul>
        </div>
      </div>
    )
  }

  render () {
    // State List
    const { pc, loadingSchedule, schedule} = this.props
    // Dispatch List
    // const { goBack } = this.props

    const showScheduleNext = this.renderScheduleNext(loadingSchedule, schedule)
    const showScheduleList = this.renderScheduleList(loadingSchedule, schedule)
    const showScheduleSync = this.renderScheduleSync()
    const showSource = this.renderSource()
    return (
      <React.Fragment>

        <div className={'contents-header' + lib.pcClass(pc)}>
          <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/practice'>練習について</Link><span></span></div>
          <h2>練習について</h2>
          <p>今後の練習予定です</p>
        </div>

        <div className={'schedule' + lib.pcClass(pc)}>

          <div className={'box schedule-next' + lib.pcClass(pc)}>
            <div className='title-frame'>
              <label>次回の練習日</label>
              <div className='text'>
                {showScheduleNext}
              </div>
            </div>
          </div>

          <div className={'box schedule-next' + lib.pcClass(pc)}>
            <div className='title-frame'>
              <label>今後の練習日程</label>
              <div className='text'>
                {showScheduleList}
              </div>
            </div>
          </div>

          {showScheduleSync}

          {showSource}

          <div className={'box' + lib.pcClass(pc)}>
            <div className='link'>
              <ul>
                <li><Link to='/practice/history'><div className='inner'><span>練習の記録</span><Forward /></div></Link></li>
              </ul>
            </div>
          </div>

        </div>

      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)
