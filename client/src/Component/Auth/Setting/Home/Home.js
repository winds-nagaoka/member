import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'
import { closePlayer } from '../../../../Actions/Audio'

import './Home.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    displayPlayer: state.audio.displayPlayer
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
    closePlayer (e) {
      dispatch(closePlayer(e))
    }
  }
}

class Home extends Component {
  componentDidMount () {
    this.props.setNavigationTitle('設定')
    this.props.setBackNavigation(true, '/')
  }

  componentWillUnmount () {
  }

  renderPlayerClose () {
    if (!this.props.displayPlayer) return false
    return (
      <li><div className='inner' onClick={(e) => this.props.closePlayer(e)}><span>プレイヤーを閉じる</span><i className="fas fa-angle-right"></i></div></li>
    )
  }

  render () {

    const showPlayerClose = this.renderPlayerClose()

    return (
      <React.Fragment>

        <div className='contents-header'>
          <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/setting'>設定</Link></div>
          <h2>設定</h2>
          <p>各種設定はこちらから</p>
        </div>

        <div className='box setting-list'>
          <div className='link'>
            <ul>
              {showPlayerClose}
              <li><Link to='/setting/username'><div className='inner'><span>名前</span><i className="fas fa-angle-right"></i></div></Link></li>
            </ul>
          </div>
        </div>

      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
