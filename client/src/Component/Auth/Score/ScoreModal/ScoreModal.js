import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { setDisplayScoreModal } from '../../../../Actions/Score'

import * as lib from '../../../../Library/Library'
import * as libScore from '../Library/Library'

import './ScoreModal.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    // scoreList: state.score.scoreList,
    displayScoreModal: state.score.displayScoreModal,
    modalContent: state.score.modalContent,
    displayPlayer: state.audio.displayPlayer,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setDisplayScoreModal(displayScoreModal, modalContent) {
      dispatch(setDisplayScoreModal(displayScoreModal, modalContent))
    },
  }
}

class ScoreModal extends Component {
  renderModalContent() {
    if (!this.props.modalContent) return <div>&nbsp;</div>
    const titleJa = this.props.modalContent.titleJa ? (
      <span className="title-ja">{this.props.modalContent.titleJa}</span>
    ) : (
      <span className="no-data">No Data</span>
    )
    const titleEn = this.props.modalContent.titleEn ? (
      <span className="title-en">{this.props.modalContent.titleEn}</span>
    ) : (
      <span className="no-data">No Data</span>
    )
    const composer =
      this.props.modalContent.composer[0] !== '' ? (
        <span className="composer">{libScore.makeLine(this.props.modalContent.composer)}</span>
      ) : (
        <span className="composer no-data">No Data</span>
      )
    const arranger =
      this.props.modalContent.arranger[0] !== '' ? (
        <span className="arranger">{libScore.makeLine(this.props.modalContent.arranger)}</span>
      ) : (
        <span className="arranger no-data">No Data</span>
      )
    const storageStatus = () => {
      if (this.props.modalContent.scoreStatus === '2') {
        return <span className="status lend">貸出中</span>
      } else if (this.props.modalContent.scoreStatus === '1') {
        return <span className="status use">使用中</span>
      } else {
        return <span className="status storage">保管</span>
      }
    }
    // const displayScoreModalClass = this.props.displayScoreModal ? ' open' : ''
    const gap = this.props.displayPlayer ? <div className="gap"></div> : false
    return (
      <React.Fragment>
        <div className="modal-header">
          <div>詳細</div>
          <div onClick={() => this.props.setDisplayScoreModal(false, this.props.modalContent)} className="close">
            &times;
          </div>
        </div>
        <div className="modal-content">
          <div className="modal-frame">
            <div className="modal-frame-flex">
              <div>
                <label>保管状況</label>
                <div className="score-status">{storageStatus()}</div>
              </div>
              <div>
                {/* <label>楽譜管理番号</label> */}
                <label>保管場所</label>
                <div className="locate">
                  <span className="box-label">{this.props.modalContent.boxLabel}</span>
                  <span className="score-number">{this.props.modalContent.label}</span>
                </div>
              </div>
            </div>
            <div className="modal-text">
              <label>タイトル(日本語)</label>
              {titleJa}
            </div>
            <div className="modal-text">
              <label>タイトル(原語)</label>
              {titleEn}
            </div>
            <div className="modal-frame-flex">
              <div>
                <label>作曲者</label>
                {composer}
              </div>
              <div>
                <label>編曲者</label>
                {arranger}
              </div>
            </div>
            <div className="links">
              <Link
                to={'/score/detail/' + this.props.modalContent._id}
                onClick={() => this.props.setDisplayScoreModal(false, this.props.modalContent)}
              >
                <i className="fas fa-info-circle"></i>詳細を表示
              </Link>
            </div>
          </div>
          {gap}
        </div>
      </React.Fragment>
    )
  }

  render() {
    const displayScoreModalClass = this.props.displayScoreModal ? ' open' : ''
    const showModalContent = this.renderModalContent()
    return (
      <div className={'score-modal' + lib.pcClass(this.props.pc)}>
        <div className={'score-info' + displayScoreModalClass + lib.pcClass(this.props.pc)}>{showModalContent}</div>
        <div
          className={'score-modal-background' + displayScoreModalClass}
          onClick={() => this.props.setDisplayScoreModal(false, this.props.modalContent)}
        ></div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreModal)
