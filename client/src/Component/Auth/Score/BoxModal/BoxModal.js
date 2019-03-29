import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import {
  setDisplayBoxModal,
  changeInputBoxLocate,
  updateBoxLocate
} from '../../../../Actions/ScoreBox'

import * as lib from '../../../../Library/Library'
import * as libScore from '../Library/Library'

import './BoxModal.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    displayPlayer: state.audio.displayPlayer,

    displayBoxModal: state.scoreBox.displayBoxModal,
    modalContent: state.scoreBox.modalContent,

    inputBoxLocate: state.scoreBox.inputBoxLocate,
    loadingUpdateBoxLocate: state.scoreBox.loadingUpdateBoxLocate
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setDisplayBoxModal (displayBoxModal, modalContent) {
      dispatch(setDisplayBoxModal(displayBoxModal, modalContent))
    },
    changeInputBoxLocate (inputBoxLocate) {
      dispatch(changeInputBoxLocate(inputBoxLocate))
    },
    updateBoxLocate () {
      dispatch(updateBoxLocate())
    }
  }
}

class BoxModal extends Component {

  keyPress (e) {
    if (e.which === 13) {
      this.props.updateBoxLocate()
    }
  }

  renderModalContent () {
    if (!this.props.modalContent) return <div>&nbsp;</div>
    const gap = this.props.displayPlayer ? <div className='gap'></div> : false
    const locate = !this.props.modalContent.locate ? '未設定' : this.props.modalContent.locate
    const locateClass = !this.props.modalContent.locate ? 'locate disabled' : 'locate'
    return (
      <React.Fragment>
        <div className='modal-header'>
          <div>詳細</div>
          <div onClick={() => this.props.setDisplayBoxModal(false, this.props.modalContent)} className='close'>&times;</div>
        </div>
        <div className='modal-content'>
          <div className='modal-frame'>
            <div className='modal-frame-flex'>
              <div>
                <label>ラベル</label>
                <div className='score-box-label'><span>{this.props.modalContent.label}</span></div>
              </div>
              <div>
                <label>保管場所</label>
                <div className={locateClass}>{locate}</div>
              </div>
            </div>
            <div className='input-box-locate'>
              <label>新しい保管場所</label>
              <input type='text' className='input' value={this.props.inputBoxLocate} onChange={(e) => this.props.changeInputBoxLocate(e.target.value)} onKeyPress={(e) => this.keyPress(e)} />
            </div>
            <div className='links'>
              <div onClick={() => this.props.updateBoxLocate()}>{this.props.loadingUpdateBoxLocate ? '読み込み中' : '保管場所を変更'}</div>
            </div>
          </div>
          {gap}
        </div>
      </React.Fragment>
    )
  }

  render () {
    const displayBoxModalClass = this.props.displayBoxModal ? ' open' : ''
    const showModalContent = this.renderModalContent()
    return (
      <div className={'score-box-modal' + lib.pcClass(this.props.pc)}>
        <div className={'score-box-info' + displayBoxModalClass + lib.pcClass(this.props.pc)}>
          {showModalContent}
        </div>
        <div className={'score-box-modal-background' + displayBoxModalClass} onClick={() => this.props.setDisplayBoxModal(false, this.props.modalContent)}></div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoxModal)
