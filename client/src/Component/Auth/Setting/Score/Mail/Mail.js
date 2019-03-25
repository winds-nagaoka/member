import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import * as lib from '../../../../../Library/Library'

import { redirect, setNavigationTitle, setBackNavigation } from '../../../../../Actions/Navigation'

import './Mail.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    loading: state.status.loading,
    user: state.status.user,
    displayPlayer: state.audio.displayPlayer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    redirect (location) {
      dispatch(redirect(location))
    },
    setNavigationTitle (title) {
      dispatch(setNavigationTitle(title))
    },
    setBackNavigation (backNavigation, backNavigationPath) {
      dispatch(setBackNavigation(backNavigation, backNavigationPath))
    }
  }
}

class Mail extends Component {
  componentDidMount () {
    this.props.setNavigationTitle('CSV出力')
    this.props.setBackNavigation(true, '/setting/score')
  }

  componentWillUnmount () {
  }

  // nameChanged () {
  //   console.log('onComplete')
  //   this.props.redirect('/setting')
  // }

  // canceled () {
  //   console.log('onCancel')
  //   this.props.redirect('/setting')
  // }

  render () {
    return (
      <React.Fragment>

        <div className={'contents-header' + lib.pcClass(this.props.pc)}>
          <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/setting'>設定</Link><i className="fas fa-chevron-right"></i><Link to='/setting/score/mail'>CSV出力</Link></div>
          <h2>CSV出力</h2>
          <p>メールでウィンズスコア一覧をCSV出力できます。</p>
        </div>

        <div className={'box' + lib.pcClass(this.props.pc)}>
          <div className='back-link'>
            <ul>
              <li><Link to='/setting/score'><div className='inner'><i className="fas fa-angle-left"></i><span>戻る</span></div></Link></li>
            </ul>
          </div>
        </div>

      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Mail)
