import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { loginAuth, windowWidthChange } from '../../Actions/Status'
import { audioPlay, audioPause } from '../../Actions/Audio'

import Home from './Home/Home'
import Practice from './Practice/Practice'
import Manager from './Manager/Manager'
import BBS from './BBS/BBS'

import Archive from './Archive/Archive'
import ArchivePhotoSlide from './Archive/PhotoSlide/PhotoSlide'
import ArchiveVideoController from './Archive/VideoController/VideoController'
import Score from './Score/Score'
import ScoreModal from './Score/ScoreModal/ScoreModal'
import ScoreEditModal from './Score/EditModal/EditModal'
import ScoreBoxModal from './Score/BoxModal/BoxModal'

import Setting from './Setting/Setting'

import Tutorial from './Tutorial/Tutorial'

import NavigationHeader from './Component/NavigationHeader/NavigationHeader'
import NavigationInline from './Component/NavigationInline/NavigationInline'

import Audio from './Component/Audio/Audio'

import Loading from '../Loading/Loading'

import './Auth.css'

function mapStateToProps(state) {
  return {
    login: state.status.login,
    loading: state.status.loading,
    pc: state.status.pc,
    contentsRef: state.status.contentsRef,
    displayPlayer: state.audio.displayPlayer,
    playStatus: state.audio.playStatus
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loginAuth (location) {
      dispatch(loginAuth(location))
    },
    windowWidthChange () {
      dispatch(windowWidthChange())
    },
    audioPlay () {
      dispatch(audioPlay())
    },
    audioPause () {
      dispatch(audioPause())
    }
  }
}

class Auth extends Component {
  constructor (props) {
    super(props)
    this.contentsRef = React.createRef()
  }

  UNSAFE_componentWillMount () {
    // 過去のlocation情報が存在する場合はそのページへRedirect
    this.props.loginAuth(window.localStorage.location ? window.localStorage.location : false)
  }

  UNSAFE_componentWillReceiveProps () {
    if (this.contentsRef) {
      if (this.contentsRef.scrollTop) {
        this.contentsRef.scrollTop = 0
      }
    }
  }

  componentDidMount () {
    this.props.windowWidthChange()
    window.addEventListener('resize', () => {
      this.props.windowWidthChange()
    })
  }

  componentWillUnmount () {
    window.removeEventListener('resize', () => {})
  }

  onKeyPress (e) {
    if (!this.props.displayPlayer) return false
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && e.which === 32) {
      this.props.playStatus ? this.props.audioPause() : this.props.audioPlay()
    }
  }

  render () {
    const { login, loading, pc, displayPlayer } = this.props
    if (loading) return <Loading />
    if (!login) return <Redirect to='/login' />
    const gap = displayPlayer ? <div className='gap'></div> : false
    return (
      <div className='auth' onKeyPress={(e) => this.onKeyPress(e)} tabIndex='0'>
        {/* <Toast /> */}
        <NavigationHeader />
        <div className={'contents' + (pc ? ' pc' : ' mobile')}>
          <div className={'contents-inner' + (pc ? ' pc' : ' mobile')} ref={(i) => {this.contentsRef = i}}>
            <div className={pc ? 'flex-frame': ''}>
              <NavigationInline />
              <div className={pc ? 'inline-contents' : 'full-contents'}>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route path='/practice' component={Practice} />
                  <Route path='/manager' component={Manager} />
                  <Route path='/bbs' component={BBS} />
                  <Route path='/archive' component={Archive} />
                  <Route path='/score' component={Score} />
                  <Route path='/setting' component={Setting} />
                </Switch>
              </div>
            </div>
            <footer>
              <small>&copy; The Wind Ensemble</small>
            </footer>
            {gap}
          </div>
        </div>
        <Audio />
        <ArchivePhotoSlide />
        <ArchiveVideoController />
        <ScoreModal />
        <ScoreEditModal />
        <ScoreBoxModal />
        <Tutorial />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
