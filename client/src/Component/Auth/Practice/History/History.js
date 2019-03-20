import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'
import { practicePlayRequest } from '../../../../Actions/Audio'
import { getHistory } from '../../../../Actions/History'

import * as lib from '../../../../Library/Library'

import './History.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,

    loading: state.history.loading,
    list: state.history.list
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
    practicePlayRequest(practiceid, fileNumber, requestTimeString, playRequest) {
      dispatch(practicePlayRequest(practiceid, fileNumber, requestTimeString, playRequest))
    },
    getHistory () {
      dispatch(getHistory())
    }
  }
}

class History extends Component {
  componentDidMount () {
    this.props.setNavigationTitle('練習の記録')
    this.props.setBackNavigation(true, '/')
    this.props.getHistory()
  }

  componentWillUnmount () {

  }

  renderHistoryList () {
    if (this.props.loading || !this.props.list) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    return this.props.list.map((each, i) => {
      const practice = each.detail
      console.log(each, practice.id)
      const date = practice.time.date ? practice.time.date : false
      const place = practice.place ? practice.place : false
      return (
        <div key={'history' + i} className='each-history' onClick={() => this.props.practicePlayRequest(practice.id, 0, 0, true)}>
          {date}
          {place}
        </div>
      )
    })
  }

  render () {
    // State List
    const { pc } = this.props

    const showHistoryList = this.renderHistoryList()

    return (
      <React.Fragment>

        <div className={'contents-header' + lib.pcClass(pc)}>
          <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/history'>過去の記録</Link><span></span></div>
          <h2>過去の記録</h2>
          <p>練習の録音を掲載しています</p>
        </div>

        <div className={'box history' + lib.pcClass(pc)}>
          <div className='text'>
            {showHistoryList}
          </div>
        </div>

      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(History)
