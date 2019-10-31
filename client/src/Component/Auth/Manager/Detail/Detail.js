import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'
import { getSelectionDetail } from '../../../../Actions/Manager'

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
    console.log(id)
    this.props.getSelectionDetail(id)
  }

  // 直接アクセスしたときに必要
  componentDidMount () {
    this.props.setNavigationTitle('候補曲詳細')
    this.props.setBackNavigation(true, '/manager/selection')
  }

  renderDetail () {
    if (this.props.loadingSelectionDetail || !this.props.selectionDetail || !this.props.selectionDetailid) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    const selection = this.props.selectionDetail.selection
    console.warn(selection.url, libManager.makeLineUrl(selection.url))
    return (
      <ul className='selection-detail-list'>
        <li>
          <label>タイトル(日本語)</label>
          <p>{selection.titleJa ? <span className='title-ja'>{selection.titleJa}</span> : <span className='no-data'>No Data</span>}</p>
        </li>
        <li>
          <label>タイトル(原語)</label>
          <p>{selection.titleEn ? <span className='title-en'>{selection.titleEn}</span> : <span className='no-data'>No Data</span>}</p>
        </li>
        <li>
          <label>作曲者</label>
          <p>{selection.composer.length === 0 || libManager.makeLine(selection.composer) === '' ? <span className='no-data'>No Data</span> : <span>{libManager.makeLine(selection.composer)}</span>}</p>
        </li>
        <li>
          <label>編曲者</label>
          <p>{selection.arranger.length === 0 || libManager.makeLine(selection.arranger) === '' ? <span className='no-data'>No Data</span> : <span>{libManager.makeLine(selection.arranger)}</span>}</p>
        </li>
        <li>
          <label>参考音源</label>
          <div className='link'>{selection.url.length === 0 || libManager.makeLineUrl(selection.url) === '' ? <span className='no-data'>No Data</span> : <div>{libManager.makeLineUrl(selection.url)}</div>}</div>
        </li>
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
    if (this.props.detailLoading || !this.props.scoreDetail || !this.props.scoreid) return false
    if (!libManager.admin(this.props.user)) return false
    return (
      <div className={'box score-edit-link' + lib.pcClass(this.props.pc)}>
        <div onClick={() => this.props.setDisplayEditScoreModal(true, 'editDetail', JSON.parse(JSON.stringify(this.props.scoreDetail)))}>{this.props.editPreLoading ? <span><i className='fas fa-spinner fa-pulse'></i></span> : <span><i className='far fa-edit'></i>詳細情報を修正</span>}</div>
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
            <label>詳細情報</label>
            {showDetail}
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
