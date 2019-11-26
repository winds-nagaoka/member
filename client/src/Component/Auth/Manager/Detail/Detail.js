import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'
import {
  getSelectionPhase,
  getSelectionDetail,
  setSelectionDetailid,
  setSelectionDetail,
  getSelectionLike,
  sendSelectionLike,
  getSelectionList,
  getSelectionListSearch,
  changeSearchQuery
} from '../../../../Actions/Manager'

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
    loadingSelectionSendLike: state.manager.loadingSelectionSendLike,

    loadingSelectionList: state.manager.loadingSelectionList,
    selectionList: state.manager.selectionList,

    loadingSelectionListSearch: state.manager.loadingSelectionListSearch,
    searchQuery: state.manager.searchQuery,
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
    setSelectionDetailid (id) {
      dispatch(setSelectionDetailid(id))
    },
    setSelectionDetail (detail) {
      dispatch(setSelectionDetail(detail))
    },
    getSelectionLike () {
      dispatch(getSelectionLike())
    },
    sendSelectionLike (selectionid) {
      dispatch(sendSelectionLike(selectionid))
    },
    getSelectionList () {
      dispatch(getSelectionList())
    },
    getSelectionListSearch (query) {
      dispatch(getSelectionListSearch(query))
    },
    changeSearchQuery (query) {
      dispatch(changeSearchQuery(query))
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
    this.props.getSelectionLike()
    if (!this.props.selectionList) this.props.searchQuery ? this.props.changeSearchQuery(this.props.searchQuery) : this.props.getSelectionList()
  }

  componentWillReceiveProps (nextProps, nextContext) {
    const { params } = nextProps.match
    if (params.id !== this.props.concertid) {
      if (!this.props.selectionList) return
      this.props.setSelectionDetailid(params.id)
      this.props.setSelectionDetail(libManager.getDetail(params.id, this.props.selectionList))
    }
  }

  renderDetail () {
    if (this.props.loadingSelectionDetail || !this.props.selectionDetail || !this.props.selectionDetailid) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    if ('removed' in this.props.selectionDetail) return <div className='removed'>データがありません</div>
    const selection = this.props.selectionDetail
    const titleJa = libManager.admin(this.props.user) && selection.titleJa ? (
      <li>
        <label>タイトル(日本語)[管理者のみ]</label>
        <p><span className='title-ja'>{selection.titleJa}</span></p>
      </li>
    ) : false
    const titleEn = libManager.admin(this.props.user) && selection.titleEn ? (
      <li>
        <label>タイトル(原語)[管理者のみ]</label>
        <p><span className='title-en'>{selection.titleEn}</span></p>
      </li>
    ) : false
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
    const time = libManager.admin(this.props.user) && selection.time ? (
      <li>
        <label>演奏時間(秒)[管理者のみ]</label>
        <p><span className='time'>{selection.time}</span></p>
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
    const createdAt = libManager.admin(this.props.user) ? (
      <li>
        <label>投稿日時[管理者のみ]</label>
        <p><span>{selection.createdAt}</span></p>
      </li>
    ) : false
    const updatedAt = libManager.admin(this.props.user) ? (
      <li>
        <label>更新日時[管理者のみ]</label>
        <p><span>{selection.updatedAt}</span></p>
      </li>
    ) : false
    return (
      <ul className='selection-detail-list'>
        <li>
          <label>曲名</label>
          <p>{selection.title ? <span className='title'>{selection.title}</span> : <span className='no-data'>記載なし</span>}</p>
        </li>
        {titleJa}
        {titleEn}
        {composer}
        {arranger}
        {duration}
        {time}
        {url}
        {memo}
        {createdAt}
        {updatedAt}
      </ul>
    )
  }

  renderLike () {
    if (!this.props.selectionLike || this.props.loadingSelectionDetail || !this.props.selectionDetail || !this.props.selectionDetailid) return false
    if ('removed' in this.props.selectionDetail) return false
    const likeList = this.props.selectionLike.find(item => item.likeUserid === this.props.user._id) ? this.props.selectionLike.find(item => item.likeUserid === this.props.user._id) : {like: []}
    // const icon = likeList.like.find(item => item === this.props.selectionDetailid) ? <i className='fas fa-thumbs-up'></i> : <i className='far fa-thumbs-up'></i>
    // const icon = likeList.like.find(item => item === this.props.selectionDetailid) ? <span className='like-true'><i className='fas fa-heart'></i></span> : <span><i className='far fa-heart'></i></span>
    const icon = this.props.loadingSelectionSendLike ? <span className='icon'><i className='fas fa-spinner fa-pulse'></i></span> : (
      likeList.like.find(item => item === this.props.selectionDetailid) ? (
        <span className='icon like-true'><i className='fas fa-vote-yea'></i></span>
      ) : (
        <span className='icon'><i className='fas fa-vote-yea'></i></span>
      )
    )
    const buttonClass = likeList.like.find(item => item === this.props.selectionDetailid) ? ' true' : ' false'
    const disableClass = this.props.selectionPhase === 'getmusic' || libManager.admin(this.props.user) ? ' use' : ' not-use'
    const buttonLabel = likeList.like.find(item => item === this.props.selectionDetailid) ? '投票済み' : '投票する'
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

  renderConcertNavigation () {
    if (this.props.loadingArchive || !this.props.concertList || !this.props.concertid) return
    const item = libArchive.getConcert(this.props.concertid, this.props.concertList).detail
    const concertList = this.props.concertList
    const concertid = this.props.concertid
    // reverse()していないので逆になってる
    const prevClass = 'prev ' + libArchive.getPrevConcert(concertid, concertList) + ' ' + libArchive.getConcertType(concertid, concertList)
    const prevLink = libArchive.getPrevConcert(concertid, concertList) ? <Link to={'/archive/overview/' + libArchive.getPrevConcert(concertid, concertList)} className={prevClass}>次<i className='fas fa-chevron-circle-right'></i></Link> : <span className={prevClass}>次<i className='fas fa-chevron-circle-right'></i></span>
    const nextClass = 'next ' + libArchive.getNextConcert(concertid, concertList) + ' ' + libArchive.getConcertType(concertid, concertList)
    const nextLink = libArchive.getNextConcert(concertid, concertList) ? <Link to={'/archive/overview/' + libArchive.getNextConcert(concertid, concertList)} className={nextClass}><i className='fas fa-chevron-circle-left'></i>前</Link> : <span className={nextClass}><i className='fas fa-chevron-circle-left'></i>前</span>
    return (
      <div className={'title' + lib.pcClass(this.props.pc)}>
        {nextLink}
        <h2>{item.title}</h2>
        {prevLink}
      </div>
    )
  }

  renderDetailNavigation () {
    if (this.props.loadingSelectionList || this.props.loadingSelectionListSearch || !this.props.selectionList || !this.props.selectionDetailid) {
      return (
        <div className={'box selection-detail-navigation' + lib.pcClass(this.props.pc)}>
          <span className={prevClass}><i className='fas fa-chevron-circle-left'></i>前</span>
          <span className={nextClass}>次<i className='fas fa-chevron-circle-right'></i></span>
        </div>
      )
    }
    const item = libManager.getDetail(this.props.selectionDetailid, this.props.selectionList)
    const prevClass = 'prev ' + libManager.getPrevDetail(this.props.selectionDetailid, this.props.selectionList)
    const prevLink = libManager.getPrevDetail(this.props.selectionDetailid, this.props.selectionList) ? <Link to={'/manager/selection/detail/' + libManager.getPrevDetail(this.props.selectionDetailid, this.props.selectionList)} className={prevClass}><i className='fas fa-chevron-circle-left'></i>前</Link> : <span className={prevClass}><i className='fas fa-chevron-circle-left'></i>前</span>
    const nextClass = 'next ' + libManager.getNextDetail(this.props.selectionDetailid, this.props.selectionList)
    const nextLink = libManager.getNextDetail(this.props.selectionDetailid, this.props.selectionList) ? <Link to={'/manager/selection/detail/' + libManager.getNextDetail(this.props.selectionDetailid, this.props.selectionList)} className={nextClass}>次<i className='fas fa-chevron-circle-right'></i></Link> : <span className={nextClass}>次<i className='fas fa-chevron-circle-right'></i></span>
    return (
      <div className={'box selection-detail-navigation' + lib.pcClass(this.props.pc)}>
        {prevLink}
        {nextLink}
      </div>
    )
  }

  render () {

    const showBreadNavigation = this.renderBreadNavigation()
    const showDetailNavigation = this.renderDetailNavigation()
    const showDetail = this.renderDetail()
    const showLike = this.renderLike()
    const showEditDetailLink = this.renderEditDetailLink()

    return (
      <React.Fragment>
        <div className={'contents-header' + lib.pcClass(this.props.pc)}>
          {showBreadNavigation}
          <h2>候補曲詳細</h2>
        </div>

        {showDetailNavigation}

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
