import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { connectSocket } from '../../../Actions/Socket'
import { logout } from '../../../Actions/Status'

import { getSchedule } from '../../../Actions/Schedule'
import { getManager } from '../../../Actions/Manager'

import { showToast } from '../../../Actions/Toast'

function mapStateToProps(state) {
  return {
    socketid: state.socket.id,

    loadingSchedule: state.schedule.loading,
    schedule: state.schedule.data,
    loadingManager: state.manager.loading,
    manager: state.manager.data
  }
}

function mapDispatchToProps(dispatch) {
  return {
    connectSocket () {
      dispatch(connectSocket())
    },
    logout () {
      dispatch(logout())
    },
    getSchedule () {
      dispatch(getSchedule())
    },
    getManager () {
      dispatch(getManager())
    },

    showToast (string) {
      dispatch(showToast(string))
    }
  }
}

class Home extends Component {
  componentDidMount () {
    this.props.connectSocket()

    this.props.getSchedule()
    this.props.getManager()
  }

  renderSchedule (loading, schedule) {
    if (loading || !schedule) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    return <div>{schedule.next.date}</div>
  }

  renderManager (loading, manager) {
    if (loading || !manager) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    return <div><div>{manager.manager[0].title}</div><div dangerouslySetInnerHTML={{__html: manager.manager[0].text}}></div></div>
  }

  render () {
    // State List
    const { socketid, loadingSchedule, schedule, loadingManager, manager } = this.props
    // Dispatch List
    const { logout } = this.props
    // const showLoadingSchedule = loadingSchedule ? '読み込み中' : ''
    const showScheduleNext = this.renderSchedule(loadingSchedule, schedule)
    // const showLoadingManager = loadingManager ? '読み込み中' : ''
    const showManager = this.renderManager(loadingManager, manager)
    return (
      <div>
        Auth
        <button onClick={() => logout()}>ログアウト</button>
        {socketid}
        <div>
          <div>
            {showScheduleNext}
          </div>
        </div>
        <div>
          <Link to='/schedule'>Schedule</Link>
        </div>
        <div>
          <div>
            {showManager}
          </div>
        </div>
        <div>
          <Link to='/manager'>Manager</Link>
        </div>
        <button onClick={() => this.props.showToast('Toast!!!')}>Toast</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
