import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { setBackNavigation } from '../../../../Actions/Navigation'
import { getScoreDetail, setDisplayEditScoreModal } from '../../../../Actions/Score'

import * as libScore from '../Library/Library'
import * as lib from '../../../../Library/Library'

import './Detail.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    detailLoading: state.score.detailLoading,
    scoreid: state.score.scoreid,
    scoreDetail: state.score.scoreDetail,
    boxUse: state.score.boxUse,
    boxList: state.score.boxList,

    editPreLoading: state.score.editPreLoading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setBackNavigation (backNavigation, backNavigationPath) {
      dispatch(setBackNavigation(backNavigation, backNavigationPath))
    },
    getScoreDetail (id) {
      dispatch(getScoreDetail(id))
    },
    setDisplayEditScoreModal (displayEditScoreModal, editMode, scoreEdit) {
      dispatch(setDisplayEditScoreModal(displayEditScoreModal, editMode, scoreEdit))
    }
  }
}

class Detail extends Component {
  constructor (props) {
    super(props)
    const { params } = this.props.match
    const id = params.id ? params.id : ''
    this.props.getScoreDetail(id)
  }

  // 直接アクセスしたときに必要
  componentDidMount () {
    this.props.setBackNavigation(true, '/score')
  }

  componentWillReceiveProps (nextProps, nextContext) {
    // const { params } = nextProps.match
    // params.id ? this.props.setScoreid(params.id) : false
  }

  renderDetail () {
    if (this.props.detailLoading || !this.props.scoreDetail || !this.props.scoreid) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    const score = this.props.scoreDetail
    return (
      <ul className='score-detail-list'>
        <li>
          <label>タイトル(日本語)</label>
          <p>{score.titleJa ? <span className='title-ja'>{score.titleJa}</span> : <span className='no-data'>No Data</span>}</p>
        </li>
        <li>
          <label>タイトル(原語)</label>
          <p>{score.titleEn ? <span className='title-en'>{score.titleEn}</span> : <span className='no-data'>No Data</span>}</p>
        </li>
        <li>
          <label>作曲者</label>
          <p>{score.composer.length === 0 || libScore.makeLine(score.composer) === '' ? <span className='no-data'>No Data</span> : <span>{libScore.makeLine(score.composer)}</span>}</p>
        </li>
        <li>
          <label>編曲者</label>
          <p>{score.arranger.length === 0 || libScore.makeLine(score.arranger) === '' ? <span className='no-data'>No Data</span> : <span>{libScore.makeLine(score.arranger)}</span>}</p>
        </li>
        <li>
          <label>出版社</label>
          <p>{score.publisher}</p>
        </li>
        <li>
          <label>ジャンル</label>
          <p>{score.genre}</p>
        </li>
        <li>
          <label>譜種</label>
          <p className='score-type'>{score.scoreType === '1' ? 'コピー譜' : '原譜'}</p>
        </li>
        {this.renderScoreLack(score)}
        {this.renderScoreLackList(score)}
        <li>
          <label>原譜処理</label>
          <p className='score-based'>{score.scoreBased === '1' ? '未処理' : '処理済'}</p>
        </li>
      </ul>
    )
  }

  renderScoreLack (score) {
    if (score.scoreLack) {
      if (score.scoreLack === '1') {
        var scoreLack = 'あり'
      } else if (score.scoreLack === '2') {
        var scoreLack = '未確認'
      } else {
        var scoreLack = 'なし'
      }
      return (
        <li>
          <label>欠譜</label>
          <p className='score-lack'>{scoreLack}</p>
        </li>
      )
    }
  }

  renderScoreLackList (score) {
    if (score.scoreLack === '1') {
      let list
      if (score.lackList.length > 0) {
        if (score.lackList[0] === '') {
          list = <p className='no-data'>No Data</p>
        } else {
          list = score.lackList.map((each, i) => <p className='score-lack-list' key={'score-lack-' + i}>{each}</p>)
        }
      }
      return (
        <li>
          <label>欠譜リスト</label>
          {list}
        </li>
      )
    }
  }

  renderStatus () {
    if (this.props.detailLoading || !this.props.scoreDetail || !this.props.scoreid) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    const scoreStatus = () => {
      if (this.props.scoreDetail.scoreStatus === '0') {
        return <label className='highlight-normal'>保管</label>
      } else if (this.props.scoreDetail.scoreStatus === '1') {
        return <label className='highlight-low'>使用中</label>
      } else { // this.props.scoreDetail.scoreStatus === '2'
        return <label className='highlight-high'>貸出中</label>
      }
    }
    return (
      <div className={'score-status-info' + lib.pcClass(this.props.pc)}>
        <div className='score-box'>
          <label>楽譜保管箱</label>
          <div>{this.props.boxUse.label}</div>
          <div className='box-locate'>{this.props.boxUse.locate ? this.props.boxUse.locate : '未設定'}</div>
        </div>
        <div className='score-number'>
          <label>楽譜管理番号</label>
          <div>{this.props.scoreDetail.label}</div>
          <div className='score-status-display'>{scoreStatus()}</div>
        </div>
      </div>
    )
  }

  renderBreadNavigation () {
    // if (this.props.detailLoading || !this.props.scoreDetail || !this.props.scoreid) return false
    return (
      <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/score'>ウィンズスコア</Link><i className="fas fa-chevron-right"></i><Link to={'/score/detail/' + this.props.scoreid}>詳細情報</Link></div>
    )
  }

  renderEditLink () {
    if (this.props.detailLoading || !this.props.scoreDetail || !this.props.scoreid) return false
    return (
      <div className={'box score-edit-link' + lib.pcClass(this.props.pc)}>
        <div onClick={() => this.props.setDisplayEditScoreModal(true, 'edit', JSON.parse(JSON.stringify(this.props.scoreDetail)))}>{this.props.editPreLoading ? <span><i className='fas fa-spinner fa-pulse'></i></span> : <span><i className='far fa-edit'></i>修正</span>}</div>
      </div>
    )
  }

  render () {

    const showBreadNavigation = this.renderBreadNavigation()

    const showStatus = this.renderStatus()
    const showDetail = this.renderDetail()

    const showEditLink = this.renderEditLink()

    return (
      <React.Fragment>
        <div className='contents-header'>
          {showBreadNavigation}
          <h2>ウィンズスコア</h2>
          <p>楽譜詳細情報</p>
        </div>

        <div className={'box score-detail-status' + lib.pcClass(this.props.pc)}>
          <div className='title-frame'>
            <label>楽譜の状態</label>
            {showStatus}
          </div>
        </div>

        <div className='box score-detail-detail'>
          <div className='title-frame'>
            <label>楽譜詳細情報</label>
            {showDetail}
          </div>
        </div>

        {showEditLink}

        <div className='box'>
          <div className='back-link'>
            <ul>
              <li><Link to='/score'><div className='inner'><i className="fas fa-angle-left"></i><span>楽譜一覧へ</span></div></Link></li>
              <li><Link to='/'><div className='inner'><i className="fas fa-angle-left"></i><span>ホーム</span></div></Link></li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
