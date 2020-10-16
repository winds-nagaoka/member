import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'

import { connect } from 'react-redux'

import { setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'
import { getBoxList, setDisplayBoxModal, addBox } from '../../../../Actions/ScoreBox'

import Back from '../../../../Library/Icons/Back'
import * as lib from '../../../../Library/Library'

import './Box.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    loading: state.scoreBox.loading,
    boxList: state.scoreBox.boxList,
    loadingAddBox: state.scoreBox.loadingAddBox,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setNavigationTitle(title) {
      dispatch(setNavigationTitle(title))
    },
    setBackNavigation(backNavigation, backNavigationPath) {
      dispatch(setBackNavigation(backNavigation, backNavigationPath))
    },
    getBoxList() {
      dispatch(getBoxList())
    },
    setDisplayBoxModal(displayBoxModal, modalContent) {
      dispatch(setDisplayBoxModal(displayBoxModal, modalContent))
    },
    addBox() {
      dispatch(addBox())
    },
  }
}

class Box extends Component {
  componentDidMount() {
    this.props.setNavigationTitle('楽譜管理箱')
    this.props.setBackNavigation(true, '/score')
    this.props.getBoxList()
  }

  componentWillUnmount() {}

  renderBox() {
    if (this.props.loading || !this.props.boxList)
      return (
        <div className="loading">
          <div className="loading1"></div>
          <div className="loading2"></div>
          <div className="loading3"></div>
        </div>
      )
    return this.props.boxList.map((each, i) => {
      if (!each.status && !this.state.showDisable) return
      const locate = !each.locate ? '未設定' : each.locate
      const locateClass = !each.locate ? 'locate disabled' : 'locate'
      const disableClass = each.status ? 'score-box' : 'score-box disabled'
      return (
        <div
          key={'score-box' + each._id}
          className={disableClass}
          onTouchStart={() => {}}
          onClick={() => {
            this.props.setDisplayBoxModal(true, each)
          }}
        >
          <div className="label">
            <span>{each.label}</span>
          </div>
          <i className="fas fa-archive"></i>
          <div className={locateClass}>
            <span>{locate}</span>
          </div>
        </div>
      )
    })
  }

  renderBlankBox() {
    if (this.props.loading || !this.props.boxList) return
    if (this.props.boxList.length % 3 === 0) return
    // 空白を埋める あんまり良いやり方じゃないと思う
    return (3 - (this.props.boxList.length % 3) === 1 ? [''] : ['', '']).map((each, i) => {
      return <div key={'blank' + i} className="score-box blank"></div>
    })
  }

  addBox() {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="alert">
            <h1>新しい箱を追加します</h1>
            <p>古い箱が満杯になったら追加してください</p>
            <div className="button-group">
              <button onClick={onClose}>キャンセル</button>
              <button
                onClick={() => {
                  this.props.addBox()
                  onClose()
                }}
              >
                確認
              </button>
            </div>
          </div>
        )
      },
    })
  }

  render() {
    const showBox = this.renderBox()
    const showBlankBox = this.renderBlankBox()

    return (
      <React.Fragment>
        <div className={'contents-header' + lib.pcClass(this.props.pc)}>
          <div className="bread-navigation">
            <Link to="/">ホーム</Link>
            <i className="fas fa-chevron-right"></i>
            <Link to="/score">ウィンズスコア</Link>
            <i className="fas fa-chevron-right"></i>
            <Link to="/score/box">楽譜管理箱</Link>
          </div>
          <h2>楽譜管理箱</h2>
          <p>楽譜管理箱の追加および編集はこちら</p>
        </div>

        <div className={'box score-box-list' + lib.pcClass(this.props.pc)}>
          {showBox}
          {showBlankBox}
        </div>

        <div className={'box score-box-add-link' + lib.pcClass(this.props.pc)}>
          <div className="send-button" onClick={() => this.addBox()}>
            {this.props.loadingAddBox ? (
              <span>
                <i className="fas fa-spinner fa-pulse"></i>
              </span>
            ) : (
              <span>
                <i className="far fa-edit"></i>新しい箱を追加
              </span>
            )}
          </div>
        </div>

        <div className={'box' + lib.pcClass(this.props.pc)}>
          <div className="back-link">
            <ul>
              <li>
                <Link to="/score">
                  <div className="inner">
                    <Back />
                    <span>楽譜一覧へ</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Box)
