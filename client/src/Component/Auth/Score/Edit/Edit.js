import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

import { setBackNavigation } from '../../../../Actions/Navigation'
import { getScoreDetail, setEditMode, updateScoreDetail, updateScoreSend, editRedirect } from '../../../../Actions/Score'

import Input from '../Library/Input/Input'

import * as libScore from '../Library/Library'
import * as lib from '../../../../Library/Library'

import './Edit.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    detailLoading: state.score.detailLoading,
    scoreid: state.score.scoreid,
    scoreDetail: state.score.scoreDetail,
    boxUse: state.score.boxUse,
    boxList: state.score.boxList,

    editMode: state.score.editMode,
    editLoading: state.score.editLoading,
    redirect: state.score.editRedirect
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
    setEditMode (editMode) {
      dispatch(setEditMode(editMode))
    },
    updateScoreDetail (scoreDetail) {
      dispatch(updateScoreDetail(scoreDetail))
    },
    updateScoreSend () {
      dispatch(updateScoreSend())
    },
    editRedirect (redirect) {
      dispatch(editRedirect(redirect))
    }
  }
}

class Edit extends Component {
  constructor (props) {
    super(props)
    const { params } = this.props.match
    const id = params.id ? params.id : ''
    this.props.setBackNavigation(true, '/score/detail/' + id)
    // id と　scoreid があってないとき(確認する)
    if (id !== this.props.scoreid) this.props.getScoreDetail(id)
    id ? this.props.setEditMode('edit') : this.props.setEditMode('new')
  }

  // 直接アクセスしたときに必要
  componentDidMount () {
    // this.props.setBackNavigation(true, '/score')
  }

  componentWillReceiveProps (nextProps, nextContext) {
    // const { params } = nextProps.match
    // params.id ? this.props.setScoreid(params.id) : false
  }

  componentWillUnmount () {
    // 状態をリセット
    this.props.setEditMode(undefined)
    this.props.editRedirect(undefined)
  }

  changeValue (e) {
    let score = this.props.scoreDetail
    score[e.target.props.target] = e.value
    this.props.updateScoreDetail(Object.assign({}, score))
  }

  changeValueArray (number, e) {
    let score = this.props.scoreDetail
    let target = score[e.target.props.target]
    target[number] = e.value
    score[e.target.props.target] = target
    this.props.updateScoreDetail(Object.assign({}, score))
  }

  addBlank (prop) {
    let score = this.props.scoreDetail
    let target = score[prop]
    target[target.length] = ''
    score[prop] = target
    this.props.updateScoreDetail(Object.assign({}, score))
  }
  
  selectChange (target, e) {
    let score = this.props.scoreDetail
    score[target] = e.target.value
    this.props.updateScoreDetail(Object.assign({}, score))
  }

  renderScoreStatus () {
    return (
      <div className='radio-input'>
        <input type='radio' name='scoreStatus' id='scoreStatusLend' value={2} checked={this.props.scoreDetail.scoreStatus === '2'} onChange={(e) => this.selectChange('scoreStatus', e)} /><label htmlFor='scoreStatusLend' className='highlight-high'><span>貸出中</span></label>
        <input type='radio' name='scoreStatus' id='scoreStatusUsing' value={1} checked={this.props.scoreDetail.scoreStatus === '1'} onChange={(e) => this.selectChange('scoreStatus', e)} /><label htmlFor='scoreStatusUsing' className='highlight-low'><span>使用中</span></label>
        <input type='radio' name='scoreStatus' id='scoreStatusStrage' value={0} checked={this.props.scoreDetail.scoreStatus === '0'} onChange={(e) => this.selectChange('scoreStatus', e)} /><label htmlFor='scoreStatusStrage'><span>保管</span></label>
      </div>
    )
  }

  renderLendInput () {
    if (this.props.scoreDetail.scoreStatus === '2') {
      return (<Input label='貸出先' value={this.props.scoreDetail.lendLocate} target='lendLocate' className='lend' onChange={(e) => this.changeValue(e)} />)
    }
  }

  renderBoxSelect () {
    const options = this.props.boxList.map((each, i) => {
      return <option key={each._id} value={each.label}>{each.label} - {!each.locate ? '未設定' : each.locate}</option>
    })
    return (
      <div>
        <select value={this.props.scoreDetail.boxLabel} onChange={(e) => this.selectChange('boxLabel', e)}>
          {options}
        </select>
      </div>
    )
  }

  renderInfo () {
    if (this.props.detailLoading || !this.props.scoreDetail || !this.props.scoreid) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div> 
    const score = this.props.scoreDetail
    const scoreStatusSelect = this.renderScoreStatus()
    const lendInput = this.renderLendInput()
    const boxSelect = this.renderBoxSelect()
    return (
      <div className='list'>
        <div className='input'>
          <label>保管状況</label>
          {scoreStatusSelect}
        </div>
        {lendInput}
        <div className='input' onClick={() => this.reloadNumberLabel()}>
          <label>楽譜管理番号</label>
          <span className='score-number'>{score.label}</span>
        </div>
        <div className='input'>
          <label>楽譜保管箱</label>
          {boxSelect}
        </div>
      </div>
    )
  }

  renderScoreType () {
    return (
      <div className='radio-input'>
        <input type='radio' name='scoreType' id='scoreTypeTrue' value={1} checked={this.props.scoreDetail.scoreType === '1'} onChange={(e) => this.selectChange('scoreType', e)} /><label htmlFor='scoreTypeTrue'><span>コピー譜</span></label>
        <input type='radio' name='scoreType' id='scoreTypeFalse' value={0} checked={this.props.scoreDetail.scoreType === '0'} onChange={(e) => this.selectChange('scoreType', e)} /><label htmlFor='scoreTypeFalse'><span>原譜</span></label>
      </div>
    )
  }

  renderCopiedFromInput () {
    if (this.props.scoreDetail.scoreType === '1') {
      return <Input label='コピーメモ' value={this.props.scoreDetail.copyMemo} target='copyMemo' inputClass='copied-from' onChange={(e) => this.changeValue(e)} />
    }
  }

  renderScoreLack () {
    return (
      <div className='radio-input'>
        <input type='radio' name='scoreLack' id='scoreLackTrue' value={1} checked={this.props.scoreDetail.scoreLack === '1'} onChange={(e) => this.selectChange('scoreLack', e)} /><label htmlFor='scoreLackTrue'><span>あり</span></label>
        <input type='radio' name='scoreLack' id='scoreLackUnconfirmed' value={2} checked={this.props.scoreDetail.scoreLack === '2'} onChange={(e) => this.selectChange('scoreLack', e)} /><label htmlFor='scoreLackUnconfirmed'><span>未確認</span></label>
        <input type='radio' name='scoreLack' id='scoreLackFalse' value={0} checked={this.props.scoreDetail.scoreLack === '0'} onChange={(e) => this.selectChange('scoreLack', e)} /><label htmlFor='scoreLackFalse'><span>なし</span></label>
      </div>
    )
  }

  renderScoreLackInput () {
    if (this.props.scoreDetail.scoreLack === '1') {
      const list =  this.props.scoreDetail.lackList.map((each, i) => {
        return <Input key={i} label={'欠譜' + (i + 1)} value={each} target='lackList' className='multi' inputClass='lack-list' onChange={(e) => this.changeValueArray(i, e)} />
      })
      return (
        <div>
          {list}
          <div className='add-data' onClick={() => this.addBlank('lackList')}><i className="fas fa-plus-circle"></i>欠譜情報を追加</div>
        </div>
      )
    }
  }

  renderScoreBased () {
    return (
      <div className='radio-input'>
        <input type='radio' name='scoreBased' id='scoreBasedTrue' value={1} checked={this.props.scoreDetail.scoreBased === '1'} onChange={(e) => this.selectChange('scoreBased', e)} /><label htmlFor='scoreBasedTrue'><span>未処理</span></label>
        <input type='radio' name='scoreBased' id='scoreBasedFalse' value={0} checked={this.props.scoreDetail.scoreBased === '0'} onChange={(e) => this.selectChange('scoreBased', e)} /><label htmlFor='scoreBasedFalse'><span>処理済</span></label>
      </div>
    )
  }

  renderStatus () {
    if (this.props.detailLoading || !this.props.scoreDetail || !this.props.scoreid) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div> 
    // const score = this.props.scoreDetail

    const scoreTypeSelect = this.renderScoreType()
    const copyMemoInput = this.renderCopiedFromInput()
    const scoreLackSelect = this.renderScoreLack()
    const scoreLackInputs = this.renderScoreLackInput()
    const scoreBasedSelect = this.renderScoreBased()
    return (
      <div className='list'>
        <div className='input'>
          <label>種類</label>
          {scoreTypeSelect}
        </div>
        {copyMemoInput}
        <div className='input'>
          <label>欠譜</label>
          {scoreLackSelect}
        </div>
        {scoreLackInputs}
        <div className='input'>
          <label>原譜処理</label>
          {scoreBasedSelect}
        </div>
      </div>
    )
  }

  renderBase () {
    if (this.props.detailLoading || !this.props.scoreDetail || !this.props.scoreid) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div> 
    const score = this.props.scoreDetail
    const composerInput = score.composer.map((each, i) => {
      return <Input key={i} label={'作曲者' + (i + 1)} value={each} target='composer' className='multi' inputClass='composer' onChange={(e) => this.changeValueArray(i, e)} />
    })
    const arrangerInput = score.arranger.map((each, i) => {
      return <Input key={i} label={'編曲者' + (i + 1)} value={each} target='arranger' className='multi' inputClass='arranger' onChange={(e) => this.changeValueArray(i, e)} />
    })
    return (
      <div className='list'>
        <Input label='タイトル(日本語)' value={score.titleJa} target='titleJa' inputClass='title-ja' onChange={(e) => this.changeValue(e)} />
        <Input label='タイトル(英語)' value={score.titleEn} target='titleEn' inputClass='title-en' onChange={(e) => this.changeValue(e)} />
        {composerInput}
        <div className='add-data' onClick={() => this.addBlank('composer')}><i className="fas fa-plus-circle"></i>作曲者を追加</div>
        {arrangerInput}
        <div className='add-data' onClick={() => this.addBlank('arranger')}><i className="fas fa-plus-circle"></i>編曲者を追加</div>
        <Input label='出版社' value={score.publisher} target='publisher' inputClass='publisher' onChange={(e) => this.changeValue(e)} />
        <Input label='ジャンル' value={score.genre} target='genre' inputClass='genre' onChange={(e) => this.changeValue(e)} />
      </div>
    )
  }

  renderBreadNavigation () {
    // if (this.props.detailLoading || !this.props.scoreDetail || !this.props.scoreid) return false
    return (
      <div className='bread-navigation'>
        <Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i>
        <Link to='/score'>ウィンズスコア</Link><i className="fas fa-chevron-right"></i>
        <Link to={'/score/detail/' + this.props.scoreid}>詳細情報</Link><i className="fas fa-chevron-right"></i>
        <Link to={'/score/detail/' + this.props.scoreid}>{this.props.editMode === 'new' ? '新しい楽譜を追加' : '楽譜の修正'}</Link>
      </div>
    )
  }

  render () {
    if (this.props.redirect) return <Redirect to={this.props.redirect} />

    const showBreadNavigation = this.renderBreadNavigation()

    const showBase = this.renderBase()
    const showStatus = this.renderStatus()
    const showInfo = this.renderInfo()

    return (
      <React.Fragment>
        <div className='contents-header'>
          {showBreadNavigation}
          <h2>ウィンズスコア</h2>
          <p>{this.props.editMode === 'new' ? '新しい楽譜を追加' : '楽譜の修正'}</p>
        </div>

        <div className={'box score-edit' + lib.pcClass(this.props.pc)}>
          <div className='title-frame'>
            <label>基本情報</label>
            {showBase}
          </div>
        </div>

        <div className={'box score-edit' + lib.pcClass(this.props.pc)}>
          <div className='title-frame'>
            <label>楽譜の状態</label>
            {showStatus}
          </div>
        </div>

        <div className={'box score-edit' + lib.pcClass(this.props.pc)}>
          <div className='title-frame'>
            <label>保管情報</label>
            {showInfo}
          </div>
        </div>

        <div className={'box score-edit' + lib.pcClass(this.props.pc)}>
          <div onClick={() => this.props.updateScoreSend()} className='send-button'>
            {this.props.editLoading ? '読み込み中' : <span><i className='far fa-edit'></i>修正</span> }
          </div>
        </div>

        <div className='box'>
          <div className='back-link'>
            <ul>
              <li><Link to={'/score/detail/' + this.props.scoreid}><div className='inner'><i className="fas fa-angle-left"></i><span>変更せず戻る</span></div></Link></li>
              <li><Link to='/'><div className='inner'><i className="fas fa-angle-left"></i><span>ホーム</span></div></Link></li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit)
