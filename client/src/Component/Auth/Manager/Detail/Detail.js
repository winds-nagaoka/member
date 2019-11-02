import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'
import { getSelectionDetail } from '../../../../Actions/Manager'

import Forward from '../../../../Library/Icons/Forward'
import Back from '../../../../Library/Icons/Back'
import * as lib from '../../../../Library/Library'
import * as libManager from '../Library/Library'

import './Detail.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    user: state.status.user,

    loadingSelectionDetail: state.manager.loadingSelectionDetail,
    selectionDetailid: state.manager.selectionDetailid,
    selectionDetail: state.manager.selectionDetail
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
    getSelectionDetail (id) {
      dispatch(getSelectionDetail(id))
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
  }

  renderDetail () {
    if (this.props.loadingSelectionDetail || !this.props.selectionDetail || !this.props.selectionDetailid) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    if ('removed' in this.props.selectionDetail) return <div className='removed'>データがありません</div>
    const selection = this.props.selectionDetail
    console.log(selection)
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
        <label>アピールポイント</label>
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

  renderBreadNavigation () {
    return (
      <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/manager'>お知らせ</Link><i className="fas fa-chevron-right"></i><Link to='/manager/selection'>選曲アンケート</Link><i className="fas fa-chevron-right"></i><Link to={'/manager/selection/detail/' + this.props.selectionDetailid}>候補曲詳細</Link></div>
    )
  }

  renderEditStatusLink () {
    if (this.props.detailLoading || !this.props.scoreDetail || !this.props.scoreid) return false
    if (!libManager.admin(this.props.user)) return false
    return (
      <div className={'box score-edit-link' + lib.pcClass(this.props.pc)}>
        <div onClick={() => this.props.setDisplayEditScoreModal(true, 'editStatus', JSON.parse(JSON.stringify(this.props.scoreDetail)))}>{this.props.editPreLoading ? <span><i className='fas fa-spinner fa-pulse'></i></span> : <span><i className='far fa-edit'></i>状態を変更</span>}</div>
      </div>
    )
  }

  renderEditDetailLink () {
    if (this.props.loadingSelectionDetail || !this.props.selectionDetail || !this.props.selectionDetailid) return false
    if (!(this.props.selectionDetail.postUserid === this.props.user._id || libManager.admin(this.props.user))) return false
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

  render () {

    const showBreadNavigation = this.renderBreadNavigation()
    const showDetail = this.renderDetail()
    const showEditStatusLink = this.renderEditStatusLink()
    const showEditDetailLink = this.renderEditDetailLink()

    return (
      <React.Fragment>
        <div className={'contents-header' + lib.pcClass(this.props.pc)}>
          {showBreadNavigation}
          <h2>候補曲詳細</h2>
        </div>

        {showEditStatusLink}

        <div className={'box selection-detail' + lib.pcClass(this.props.pc)}>
          <div className='title-frame'>
            <div className='text'>
              {showDetail}
            </div>
          </div>
        </div>

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
