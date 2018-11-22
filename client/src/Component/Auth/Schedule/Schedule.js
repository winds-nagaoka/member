import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { getSchedule } from '../../../Actions/Schedule'

function mapStateToProps(state) {
  return {
    loadingSchedule: state.schedule.loading,
    schedule: state.schedule.data,
    loadingManager: state.manager.loading,
    manager: state.manager.data
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getSchedule () {
      dispatch(getSchedule())
    }
  }
}

class Schedule extends Component {
  componentDidMount () {
    this.props.getSchedule()
  }

  renderScheduleNext (loading, schedule) {
    if (loading || !schedule) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    return <div>{schedule.next.date}</div>
  }

  renderScheduleList (loading, schedule) {
    if (loading || !schedule) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    return schedule.schedule.map((each, i) => {
      return <div key={'schedule' + i}>{each.date}</div>
    })
  }

  render () {
    // State List
    const { loadingSchedule, schedule} = this.props
    // Dispatch List
    // none

    const showScheduleNext = this.renderScheduleNext(loadingSchedule, schedule)
    const showScheduleList = this.renderScheduleList(loadingSchedule, schedule)
    return (
      <div>
        Schedule
        <div>
          <div>
            {showScheduleNext}
          </div>
        </div>
        <div>
          <div>
            {showScheduleList}
          </div>
        </div>
        <Link to='/'>ホーム</Link>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)
