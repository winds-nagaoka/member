import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import Schedule from './Schedule/Schedule'

// import { goBack } from 'react-router-redux'

import './Practice.css'

function mapStateToProps(state) {
  return {
    mobile: state.status.mobile,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

class Practice extends Component {
  render () {
    // State List
    const { mobile } = this.props
    // Dispatch List
    // const { goBack } = this.props

    const mobileMode = mobile ? ' mobile' : ''

    return (
      <div className={'practice' + mobileMode}>
        <div className='contents-header'>
          <h2>練習について</h2>
          <p>練習日程および過去の練習を確認できます</p>
        </div>

        <Schedule />

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

export default connect(mapStateToProps, mapDispatchToProps)(Practice)
