import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'
import { practicePlayRequest } from '../../../../Actions/Audio'
import { getHistory, loadMore } from '../../../../Actions/History'

import Back from '../../../../Library/Icons/Back'
import * as lib from '../../../../Library/Library'

import './History.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,

    loading: state.history.loading,
    list: state.history.list,
    showList: state.history.showList,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setNavigationTitle(title) {
      dispatch(setNavigationTitle(title))
    },
    setBackNavigation(backNavigation, backNavigationPath) {
      dispatch(setBackNavigation(backNavigation, backNavigationPath))
    },
    practicePlayRequest(practiceid, fileNumber, requestTimeString, playRequest) {
      dispatch(practicePlayRequest(practiceid, fileNumber, requestTimeString, playRequest))
    },
    getHistory() {
      dispatch(getHistory())
    },
    loadMore() {
      dispatch(loadMore())
    },
  }
}

class History extends Component {
  componentDidMount() {
    this.props.setNavigationTitle('練習の記録')
    this.props.setBackNavigation(true, '/practice')
    this.props.getHistory()
  }

  componentWillUnmount() {}

  renderHistoryList() {
    if (this.props.loading || !this.props.list) {
      return (
        <div className="loading">
          <div className="loading1"></div>
          <div className="loading2"></div>
          <div className="loading3"></div>
        </div>
      )
    }
    if (this.props.showList.length === 0) {
      return (
        <div className="title-frame">
          <div className="text">みつかりませんでした</div>
        </div>
      )
    }
    return this.props.showList.map((each, i) => {
      const practice = each.detail
      const audio = practice.recordStatus ? ' has-audio' : ' no-audio'
      const playRequest = practice.recordStatus
        ? () => this.props.practicePlayRequest(practice.id, 0, 0, true)
        : () => {}
      const icon = practice.recordStatus ? (
        <i className="fas fa-play-circle"></i>
      ) : (
        <i className="far fa-times-circle"></i>
      )
      const date = 'date' in practice.time ? <div className="date">{practice.time.date}</div> : false
      const place = 'place' in practice ? <div className="place">{practice.place}</div> : false
      const label = 'label' in practice ? <label>{practice.label}</label> : false
      return (
        <li key={'history' + i} className={'each-history' + audio + lib.pcClass(this.props.pc)} onClick={playRequest}>
          <div className="icon">{icon}</div>
          <div className="info">
            {place}
            {date}
          </div>
          <div className="label">{label}</div>
        </li>
      )
    })
  }

  renderLoadMore() {
    if (this.props.loading || !this.props.list) return
    if (this.props.list.length > 10 && this.props.list.length !== this.props.showList.length) {
      return (
        <div onClick={() => this.props.loadMore()} className="load-more">
          <span>すべて表示</span>
        </div>
      )
    }
  }

  render() {
    // State List
    const { pc } = this.props

    const showHistoryList = this.renderHistoryList()
    const showLoadMore = this.renderLoadMore()
    const historyClass =
      this.props.loading || !this.props.list
        ? ''
        : this.props.list.length > 10 && this.props.list.length !== this.props.showList.length
        ? ''
        : ' no-border-bottom'

    return (
      <React.Fragment>
        <div className={'contents-header' + lib.pcClass(pc)}>
          <div className="bread-navigation">
            <Link to="/">ホーム</Link>
            <i className="fas fa-chevron-right"></i>
            <Link to="/practice">練習について</Link>
            <i className="fas fa-chevron-right"></i>
            <Link to="/practice/history">練習の記録</Link>
          </div>
          <h2>練習の記録</h2>
          <p>練習の録音を掲載しています</p>
          <p>合奏前から録音しているため適宜早送りしてご利用ください</p>
        </div>

        <div className={'box history' + historyClass + lib.pcClass(pc)}>
          <ul>
            {showHistoryList}
            {showLoadMore}
          </ul>
        </div>

        <div className={'box' + lib.pcClass(this.props.pc)}>
          <div className="back-link">
            <ul>
              <li>
                <Link to="/practice">
                  <div className="inner">
                    <Back />
                    <span>戻る</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(History)
