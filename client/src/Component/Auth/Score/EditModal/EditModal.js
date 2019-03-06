import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

import { setBackNavigation } from '../../../../Actions/Navigation'
import {
  setEditModalRef,
  // getScoreDetail,
  // setEditMode,
  setScoreEdit,
  updateScoreEdit,
  // editRedirect,
  setDisplayEditScoreModal
} from '../../../../Actions/Score'

import Input from '../Library/Input/Input'

import * as libScore from '../Library/Library'
import * as lib from '../../../../Library/Library'

import './EditModal.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    displayEditScoreModal: state.score.displayEditScoreModal,
    detailLoading: state.score.detailLoading,
    scoreid: state.score.scoreid,
    scoreEdit: state.score.scoreEdit,
    boxUse: state.score.boxUse,
    boxList: state.score.boxList,

    editModalRef: state.score.editModalRef,

    editPreLoading: state.score.editPreLoading,
    editMode: state.score.editMode,
    editLoading: state.score.editLoading,
    displayPlayer: state.audio.displayPlayer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setBackNavigation (backNavigation, backNavigationPath) {
      dispatch(setBackNavigation(backNavigation, backNavigationPath))
    },
    setEditModalRef (editModalRef) {
      dispatch(setEditModalRef(editModalRef))
    },
    // getScoreDetail (id) {
    //   dispatch(getScoreDetail(id))
    // },
    // setEditMode (editMode) {
    //   dispatch(setEditMode(editMode))
    // },
    setScoreEdit (scoreDetail) {
      dispatch(setScoreEdit(scoreDetail))
    },
    updateScoreEdit () {
      dispatch(updateScoreEdit())
    },
    setDisplayEditScoreModal (displayEditScoreModal) {
      dispatch(setDisplayEditScoreModal(displayEditScoreModal))
    }
  }
}

class EditModal extends Component {
  constructor (props) {
    super(props)
    // const { params } = this.props.match
    // const id = params.id ? params.id : ''
    // this.props.setBackNavigation(true, '/score/detail/' + id)
    // // id と　scoreid があってないとき(確認する)
    // if (id !== this.props.scoreid) this.props.getScoreDetail(id)
    // id ? this.props.setEditMode('edit') : this.props.setEditMode('new')
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
  }

  changeValue (e) {
    let score = this.props.scoreEdit
    score[e.target.props.target] = e.value
    this.props.setScoreEdit(JSON.parse(JSON.stringify(score)))
  }

  changeValueArray (number, e) {
    let score = this.props.scoreEdit
    let target = score[e.target.props.target]
    target[number] = e.value
    score[e.target.props.target] = target
    this.props.setScoreEdit(JSON.parse(JSON.stringify(score)))
  }

  addBlank (prop) {
    let score = this.props.scoreEdit
    let target = score[prop]
    target[target.length] = ''
    score[prop] = target
    this.props.setScoreEdit(JSON.parse(JSON.stringify(score)))
  }

  selectChange (target, e) {
    let score = this.props.scoreEdit
    score[target] = e.target.value
    this.props.setScoreEdit(JSON.parse(JSON.stringify(score)))
  }

  renderScoreStatus () {
    return (
      <div className='radio-input'>
        <input type='radio' name='scoreStatus' id='scoreStatusLend' value={2} checked={this.props.scoreEdit.scoreStatus === '2'} onChange={(e) => this.selectChange('scoreStatus', e)} /><label htmlFor='scoreStatusLend' className='highlight-high'><span>貸出中</span></label>
        <input type='radio' name='scoreStatus' id='scoreStatusUsing' value={1} checked={this.props.scoreEdit.scoreStatus === '1'} onChange={(e) => this.selectChange('scoreStatus', e)} /><label htmlFor='scoreStatusUsing' className='highlight-low'><span>使用中</span></label>
        <input type='radio' name='scoreStatus' id='scoreStatusStrage' value={0} checked={this.props.scoreEdit.scoreStatus === '0'} onChange={(e) => this.selectChange('scoreStatus', e)} /><label htmlFor='scoreStatusStrage'><span>保管</span></label>
      </div>
    )
  }

  renderLendInput () {
    if (this.props.scoreEdit.scoreStatus === '2') {
      return (<Input label='貸出先' value={this.props.scoreEdit.lendLocate} target='lendLocate' className='lend' onChange={(e) => this.changeValue(e)} />)
    }
  }

  renderBoxSelect () {
    const options = this.props.boxList.map((each, i) => {
      return <option key={each._id} value={each.label}>{each.label} - {!each.locate ? '未設定' : each.locate}</option>
    })
    return (
      <div>
        <select value={this.props.scoreEdit.boxLabel} onChange={(e) => this.selectChange('boxLabel', e)}>
          {options}
        </select>
      </div>
    )
  }

  renderInfo () {
    if (this.props.editPreLoading || !this.props.scoreEdit) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    const score = this.props.scoreEdit
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
        <input type='radio' name='scoreType' id='scoreTypeTrue' value={1} checked={this.props.scoreEdit.scoreType === '1'} onChange={(e) => this.selectChange('scoreType', e)} /><label htmlFor='scoreTypeTrue'><span>コピー譜</span></label>
        <input type='radio' name='scoreType' id='scoreTypeFalse' value={0} checked={this.props.scoreEdit.scoreType === '0'} onChange={(e) => this.selectChange('scoreType', e)} /><label htmlFor='scoreTypeFalse'><span>原譜</span></label>
      </div>
    )
  }

  renderCopiedFromInput () {
    if (this.props.scoreEdit.scoreType === '1') {
      return <Input label='コピーメモ' value={this.props.scoreEdit.copyMemo} target='copyMemo' inputClass='copied-from' onChange={(e) => this.changeValue(e)} />
    }
  }

  renderScoreLack () {
    return (
      <div className='radio-input'>
        <input type='radio' name='scoreLack' id='scoreLackTrue' value={1} checked={this.props.scoreEdit.scoreLack === '1'} onChange={(e) => this.selectChange('scoreLack', e)} /><label htmlFor='scoreLackTrue'><span>あり</span></label>
        <input type='radio' name='scoreLack' id='scoreLackUnconfirmed' value={2} checked={this.props.scoreEdit.scoreLack === '2'} onChange={(e) => this.selectChange('scoreLack', e)} /><label htmlFor='scoreLackUnconfirmed'><span>未確認</span></label>
        <input type='radio' name='scoreLack' id='scoreLackFalse' value={0} checked={this.props.scoreEdit.scoreLack === '0'} onChange={(e) => this.selectChange('scoreLack', e)} /><label htmlFor='scoreLackFalse'><span>なし</span></label>
      </div>
    )
  }

  renderScoreLackInput () {
    if (this.props.scoreEdit.scoreLack === '1') {
      const list =  this.props.scoreEdit.lackList.map((each, i) => {
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
        <input type='radio' name='scoreBased' id='scoreBasedTrue' value={1} checked={this.props.scoreEdit.scoreBased === '1'} onChange={(e) => this.selectChange('scoreBased', e)} /><label htmlFor='scoreBasedTrue'><span>未処理</span></label>
        <input type='radio' name='scoreBased' id='scoreBasedFalse' value={0} checked={this.props.scoreEdit.scoreBased === '0'} onChange={(e) => this.selectChange('scoreBased', e)} /><label htmlFor='scoreBasedFalse'><span>処理済</span></label>
      </div>
    )
  }

  renderStatus () {
    if (this.props.editPreLoading || !this.props.scoreEdit) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    // const score = this.props.scoreEdit

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
    if (this.props.editPreLoading || !this.props.scoreEdit) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    const score = this.props.scoreEdit
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

  render () {
    const displayEditScoreModalClass = this.props.displayEditScoreModal ? ' open' : ''
    const gap = this.props.displayPlayer ? <div className='gap'></div> : false

    const showBase = this.renderBase()
    const showStatus = this.renderStatus()
    const showInfo = this.renderInfo()

    return (
      <div className='score-edit-modal'>
        <div className={'score-edit-modal-contents' + displayEditScoreModalClass + lib.pcClass(this.props.pc)}>

          <div className={'header' + lib.pcClass(this.props.pc)}>
            <div className='cancel' onClick={() => this.props.setDisplayEditScoreModal(false, undefined, undefined)}>キャンセル</div>
            <div className='title'>{this.props.editMode === 'new' ? '新しい楽譜を追加' : '楽譜の修正'}</div>
            <div className='save' onClick={() => this.props.updateScoreEdit()}>{this.props.editLoading ? <span>&nbsp;<i className='fas fa-spinner fa-pulse'></i>&nbsp;</span> : (this.props.editMode === 'new' ? '追加' : '修正')}</div>
          </div>

          <div className='contents' ref={(i) => {!this.props.editModalRef ? this.props.setEditModalRef(i) : false}}>

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
              <div onClick={() => this.props.updateScoreEdit()} className='send-button'>
                {this.props.editLoading ? '読み込み中' : (this.props.editMode === 'new' ? <span><i className='far fa-edit'></i>追加</span> : <span><i className='far fa-edit'></i>修正</span>) }
              </div>
            </div>

            {gap}
          </div>
        </div>

        <div className={'score-edit-modal-background' + displayEditScoreModalClass} onClick={() => this.props.setDisplayEditScoreModal(false, undefined, undefined)}></div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditModal)
