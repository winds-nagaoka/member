import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'
import { getSelectionPhase, getSelectionDetail, getSelectionLike, sendSelectionLike } from '../../../../Actions/Manager'

import Forward from '../../../../Library/Icons/Forward'
import Back from '../../../../Library/Icons/Back'
import * as lib from '../../../../Library/Library'
import * as libManager from '../Library/Library'

import './Detail.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    user: state.status.user,

    loadingSelectionPhase: state.manager.loadingSelectionPhase,
    selectionPhase: state.manager.selectionPhase,

    loadingSelectionDetail: state.manager.loadingSelectionDetail,
    selectionDetailid: state.manager.selectionDetailid,
    selectionDetail: state.manager.selectionDetail,

    loadingSelectionLike: state.manager.loadingSelectionLike,
    selectionLike: state.manager.selectionLike,
    loadingSelectionSendLike: state.manager.loadingSelectionSendLike
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
    getSelectionPhase () {
      dispatch(getSelectionPhase())
    },
    getSelectionDetail (id) {
      dispatch(getSelectionDetail(id))
    },
    getSelectionLike () {
      dispatch(getSelectionLike())
    },
    sendSelectionLike (selectionid) {
      dispatch(sendSelectionLike(selectionid))
    }
  }
}

class Detail extends Component {
  constructor (props) {
    super(props)
    const { params } = this.props.match
    const id = params.id ? params.id : ''
    this.props.getSelectionDetail(id)
  }

  // 直接アクセスしたときに必要
  componentDidMount () {
    this.props.setNavigationTitle('候補曲詳細')
    this.props.setBackNavigation(true, '/manager/selection')
    this.props.getSelectionPhase()
    !this.props.selectionLike ? this.props.getSelectionLike() : false
  }

  renderDetail () {
    if (this.props.loadingSelectionDetail || !this.props.selectionDetail || !this.props.selectionDetailid) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    if ('removed' in this.props.selectionDetail) return <div className='removed'>データがありません</div>
    const selection = this.props.selectionDetail
    const composer = selection.composer.length !== 0 && libManager.makeLine(selection.composer) !== '' ? (
      <li>
        <label>作曲者</label>
        <p><span>{libManager.makeLine(selection.composer)}</span></p>
      </li>
    ) : false
    const arranger = selection.arranger.length !== 0 && libManager.makeLine(selection.arranger) !== '' ? (
      <li>
        <label>編曲者</label>
        <p><span>{libManager.makeLine(selection.arranger)}</span></p>
      </li>
    ) : false
    const duration = selection.duration ? (
      <li>
        <label>演奏時間</label>
        <p><span className='duration'>{selection.duration}</span></p>
      </li>
    ) : false
    const url = selection.url.length !== 0 && libManager.makeLine(selection.url) !== '' ? (
      <li>
        <label>参考音源</label>
        <div className='link'>{libManager.makeLineUrl(selection.url)}</div>
      </li>
    ) : false
    const memo = selection.memo ? (
      <li>
        <label>メモ</label>
        <p><span className='memo'>{selection.memo}</span></p>
      </li>
    ) : false
    return (
      <ul className='selection-detail-list'>
        <li>
          <label>曲名</label>
          <p>{selection.title ? <span className='title'>{selection.title}</span> : <span className='no-data'>記載なし</span>}</p>
        </li>
        {composer}
        {arranger}
        {duration}
        {url}
        {memo}
      </ul>
    )
  }


  renderLike () {
    if (!this.props.selectionLike || this.props.loadingSelectionDetail || !this.props.selectionDetail || !this.props.selectionDetailid) return false
    if ('removed' in this.props.selectionDetail) return false
    const likeList = this.props.selectionLike.find(item => item.likeUserid === this.props.user._id) ? this.props.selectionLike.find(item => item.likeUserid === this.props.user._id) : {like: []}
    // const icon = likeList.like.find(item => item === this.props.selectionDetailid) ? <i className='fas fa-thumbs-up'></i> : <i className='far fa-thumbs-up'></i>
    // const icon = likeList.like.find(item => item === this.props.selectionDetailid) ? <span className='like-true'><i className='fas fa-heart'></i></span> : <span><i className='far fa-heart'></i></span>
    const icon = likeList.like.find(item => item === this.props.selectionDetailid) ? <span className='like-true'><i className='fas fa-vote-yea'></i></span> : <span><i className='fas fa-vote-yea'></i></span>
    const buttonClass = likeList.like.find(item => item === this.props.selectionDetailid) ? ' true' : ' false'
    const disableClass = this.props.selectionPhase === 'getmusic' || libManager.admin(this.props.user) ? ' use' : ' not-use'
    const buttonLabel = this.props.loadingSelectionSendLike ? '読み込み中...' : likeList.like.find(item => item === this.props.selectionDetailid) ? '投票済み' : '投票する'
    const count = libManager.countLike(this.props.selectionLike, this.props.selectionDetailid)
    return (
      <div className={'box selection-like' + lib.pcClass(this.props.pc)}>
        <div className='title-frame'>
          <div className='text'>
            <div className='like'>
              <div className='count'><span>{count}</span>票</div>
              <div className='button-frame'>
                <div onClick={() => this.props.sendSelectionLike(this.props.selectionDetailid)} className={'button' + buttonClass + disableClass}>{icon}{buttonLabel}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderBreadNavigation () {
    return (
      <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/manager'>お知らせ</Link><i className="fas fa-chevron-right"></i><Link to='/manager/selection'>選曲アンケート</Link><i className="fas fa-chevron-right"></i><Link to={'/manager/selection/detail/' + this.props.selectionDetailid}>候補曲詳細</Link></div>
    )
  }

  renderEditDetailLink () {
    if (this.props.loadingSelectionDetail || !this.props.selectionDetail || !this.props.selectionDetailid) return false
    if (!(this.props.selectionDetail.postUserid === this.props.user._id || libManager.admin(this.props.user))) return false
    if (this.props.selectionPhase === 'getmusic' || libManager.admin(this.props.user)) {
      return (
        <div className={'box selection-edit-link' + lib.pcClass(this.props.pc)}>
          <div className='link'>
            <ul>
              <li><Link to={'/manager/selection/edit/' + this.props.selectionDetailid}><div className='inner'><span>編集する</span><Forward /></div></Link></li>
            </ul>
          </div>
        </div>
      )  
    }
  }

  render () {

    const showBreadNavigation = this.renderBreadNavigation()
    const showDetail = this.renderDetail()
    const showLike = this.renderLike()
    const showEditDetailLink = this.renderEditDetailLink()

    return (
      <React.Fragment>
        <div className={'contents-header' + lib.pcClass(this.props.pc)}>
          {showBreadNavigation}
          <h2>候補曲詳細</h2>
        </div>

        <div className={'box selection-detail' + lib.pcClass(this.props.pc)}>
          <div className='title-frame'>
            <div className='text'>
              {showDetail}
            </div>
          </div>
        </div>

        {showLike}

        {showEditDetailLink}

        <div className={'box' + lib.pcClass(this.props.pc)}>
          <div className='back-link'>
            <ul>
              <li><Link to='/manager/selection'><div className='inner'><Back /><span>候補曲一覧へ</span></div></Link></li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
