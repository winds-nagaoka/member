import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { connectSocket, disconnectSocket } from '../../../Actions/Socket'

import { getList } from '../../../Actions/Cast'

// import { goBack } from 'react-router-redux'

import './Cast.css'

function mapStateToProps(state) {
  return {
    mobile: state.status.mobile,

    loadingList: state.cast.loadingList,
    castList: state.cast.list,
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
  }
}

class Cast extends Component {
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
    const { mobile, loadingList, castList} = this.props
    // Dispatch List
    // const { goBack } = this.props

    const mobileMode = mobile ? ' mobile' : ''

    console.log('!',castList)

    const showCastList = this.renderList(loadingList, castList)
    // const showScheduleNext = this.renderScheduleNext(loadingSchedule, schedule)
    // const showScheduleList = this.renderScheduleList(loadingSchedule, schedule)
    return (
      <div className={'cast' + mobileMode}>
        <div className='contents-header'>
          <h2>キャスト</h2>
        </div>

        {showCastList}
        {/* <div className='box schedule-next'>
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
        </div> */}

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
        {/* <div onClick={() => {goBack()}}>もどる</div>
        <div onClick={() => {window.history.back()}}>もどる</div> */}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cast)
