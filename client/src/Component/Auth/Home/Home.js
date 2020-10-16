import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { setNavigationTitle, releaseBackNavigation } from '../../../Actions/Navigation'
import { getSchedule } from '../../../Actions/Schedule'
import { getSource } from '../../../Actions/Source'
import { getManager } from '../../../Actions/Manager'
import { getBBSList } from '../../../Actions/BBS'

import { showToast } from '../../../Actions/Toast'

import Forward from '../../../Library/Icons/Forward'
import * as lib from '../../../Library/Library'

import './Home.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,

    loadingSchedule: state.schedule.loading,
    schedule: state.schedule.data,
    loadingSource: state.source.loading,
    source: state.source.list,
    loadingManager: state.manager.loading,
    manager: state.manager.data,
    loadingBBS: state.bbs.loading,
    BBSList: state.bbs.list,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setNavigationTitle(title) {
      dispatch(setNavigationTitle(title))
    },
    releaseBackNavigation() {
      dispatch(releaseBackNavigation())
    },
    getSchedule() {
      dispatch(getSchedule())
    },
    getSource() {
      dispatch(getSource())
    },
    getManager() {
      dispatch(getManager())
    },
    getBBSList() {
      dispatch(getBBSList())
    },

    showToast(string) {
      dispatch(showToast(string))
    },
  }
}

class Home extends Component {
  componentDidMount() {
    this.props.setNavigationTitle(undefined)
    this.props.releaseBackNavigation()

    this.props.getSchedule()
    this.props.getSource()
    this.props.getManager()
    this.props.getBBSList()
  }

  renderSchedule(loading, schedule) {
    if (loading || !schedule)
      return (
        <div className="loading">
          <div className="loading1"></div>
          <div className="loading2"></div>
          <div className="loading3"></div>
        </div>
      )
    const today = schedule.today ? <span className="today">本日</span> : ''
    const next = schedule.next
    const date = next.date.split('-')
    const month = date[1].match(/0[0-9]/) ? date[1].replace(/^0/g, '') : date[1]
    const day = date[2].match(/0[0-9]/) ? date[2].replace(/^0/g, '') : date[2]
    const memo = next.memo ? <span className="memo">{next.memo}</span> : ''
    const studio = next.studio.match(/第[1-9]スタジオ/) ? (
      <span>
        第<span>{next.studio.replace('第', '').replace('スタジオ', '')}</span>スタジオ
      </span>
    ) : (
      <span>{next.studio}</span>
    )
    return (
      <div className="next">
        <div className="next-labels">
          {today}
          {memo}
          {/* <span className='memo'>今井合奏</span> */}
        </div>
        <div className="next-day">
          {/* <span className='year'>{date[0]}<span>年</span></span> */}
          <span className="month">
            {month}
            <span>月</span>
          </span>
          <span className="day">
            {day}
            <span>日</span>
          </span>
          <span className={'date ' + next.weeken}>{next.weekjp}</span>
        </div>
        <div className="next-time">
          <span className="time">{next.time.start}</span>
          <span className="while">～</span>
          <span className="time">{next.time.end}</span>
        </div>
        <div className="next-place">
          <span className="place">{next.place}</span>
          <span className="studio">{studio}</span>
        </div>
      </div>
    )
  }

  renderManager(loading, manager) {
    if (loading || !manager)
      return (
        <div className="loading">
          <div className="loading1"></div>
          <div className="loading2"></div>
          <div className="loading3"></div>
        </div>
      )
    const date = manager.contents[0].time[0].date === '1970/01/01' ? false : manager.contents[0].time[0].date
    const text =
      manager.contents[0].text.split('<br>').slice(0, 3).join('<br>') +
      (manager.contents[0].text.split('<br>').length > 3 ? '<br>…' : '')
    return (
      <div className="top-notice">
        <div className="top-notice-title">
          <span>{manager.contents[0].title}</span>
          <span className="date">{date}</span>
        </div>
        <div className="top-notice-text" dangerouslySetInnerHTML={{ __html: text }}></div>
      </div>
    )
  }

  renderBBS(loading, BBSList) {
    if (loading || !BBSList)
      return (
        <div className="loading">
          <div className="loading1"></div>
          <div className="loading2"></div>
          <div className="loading3"></div>
        </div>
      )
    return BBSList.map((each, i) => {
      if (i >= 3) return false
      const text = each.text
        .replace(/(<br>|<br \/>)/gi, '\n')
        .replace(/&gt;/gi, '>')
        .replace(/&lt;/gi, '<')
      return (
        <div key={'bbs' + i} className="home-bbs-item">
          <div className="home-bbs-title">
            <span className="number">{each.number}</span>
            <span className="name">{each.name}</span>
            <span className="time">{each.time}</span>
          </div>
          {/* <div className='bbs-text' dangerouslySetInnerHTML={{__html: each.text}}></div> */}
          <div className="home-bbs-text">
            {text.split('\n').map((m, j) => {
              return j < 3 ? <p key={'text' + i + j}>{m}</p> : j === 3 ? '…' : false
            })}
          </div>
        </div>
      )
    })
  }

  render() {
    // State List
    const { pc, loadingSchedule, schedule, loadingManager, manager, loadingBBS, BBSList } = this.props
    const showScheduleNext = this.renderSchedule(loadingSchedule, schedule)
    const showManager = this.renderManager(loadingManager, manager)
    const showBBS = this.renderBBS(loadingBBS, BBSList)
    return (
      <div className={'home' + lib.pcClass(pc)}>
        <div className={'contents-header' + lib.pcClass(pc)}>
          <div className="bread-navigation">
            <Link to="/">ホーム</Link>
          </div>
          <h2>会員専用ページ</h2>
        </div>

        <div className={'box home-schedule' + lib.pcClass(pc)}>
          <div className="title-frame">
            <label>次回の練習日</label>
            <div className="text border-bottom">{showScheduleNext}</div>
          </div>
          <div className="link">
            <ul>
              <li>
                <Link to="/practice">
                  <div className="inner">
                    <span>練習について</span>
                    <Forward />
                  </div>
                </Link>
              </li>
              {/* <li className='border-top'><Link to='/history'><div className='inner'><span>過去の記録</span><Forward /></div></Link></li> */}
            </ul>
          </div>
        </div>

        <div className={'box home-manager' + lib.pcClass(pc)}>
          <div className="title-frame">
            <label>お知らせ</label>
            <div className="text border-bottom">{showManager}</div>
          </div>
          <div className="link">
            <ul>
              <li>
                <Link to="/manager">
                  <div className="inner">
                    <span>More</span>
                    <Forward />
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={'box home-bbs' + lib.pcClass(pc)}>
          <div className="title-frame">
            <label>会員専用掲示板</label>
            <div className="text border-bottom">
              <div className="home-bbs-list">{showBBS}</div>
            </div>
          </div>
          <div className="link">
            <ul>
              <li>
                <Link to="/bbs">
                  <div className="inner">
                    <span>More</span>
                    <Forward />
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={'box home-archive' + lib.pcClass(pc)}>
          {/* <div className='title-frame'>
            <label>アーカイブ</label>
            <div className='text border-bottom'>
              <p>これまでの活動記録はこちらから参照できます</p>
              <p>定期演奏会とミニコンサートの記録を掲載しています</p>
            </div>
          </div> */}
          <div className="link">
            <ul>
              <li>
                <Link to="/archive">
                  <div className="inner">
                    <span>アーカイブ</span>
                    <Forward />
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={'box home-score' + lib.pcClass(pc)}>
          {/* <div className='title-frame'>
            <label>ウィンズスコア</label>
            <div className='text border-bottom'>
              ウィンズが所有する楽譜はこちらから参照できます
            </div>
          </div> */}
          <div className="link">
            <ul>
              <li>
                <Link to="/score">
                  <div className="inner">
                    <span>ウィンズスコア</span>
                    <Forward />
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={'box home-setting' + lib.pcClass(pc)}>
          {/* <div className='title-frame'>
            <label>設定</label>
            <div className='text border-bottom'>
              アプリの設定はこちら
            </div>
          </div> */}
          <div className="link">
            <ul>
              <li>
                <Link to="/setting">
                  <div className="inner">
                    <span>設定</span>
                    <Forward />
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
