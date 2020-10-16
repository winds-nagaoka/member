import React, { Component } from 'react'

import { connect } from 'react-redux'

import * as lib from '../../../../../Library/Library'

import { setModifyText, updateModifyText } from '../../../../../Actions/Setting'

import './Modify.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    loadingModify: state.setting.loadingModify,
    modifyText: state.setting.modifyText,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setModifyText(text) {
      dispatch(setModifyText(text))
    },
    updateModifyText(apiPath, replacePath) {
      dispatch(updateModifyText(apiPath, replacePath))
    },
  }
}

class Modify extends Component {
  componentDidMount() {
    this.props.setModifyText(this.props.text)
  }

  sendText() {
    if (!this.props.modifyText) return
    if (!this.props.api) return
    this.props.updateModifyText(this.props.api, '/setting')
  }

  keyPress(e) {
    if (e.which === 13) this.sendText(e)
  }

  cancel() {
    if (this.props.onCancel) {
      this.props.onCancel()
    }
  }

  render() {
    const buttonText = this.props.loadingModify ? '読み込み中...' : '保存'
    const disabledClass =
      this.props.modifyText === this.props.text || !this.props.modifyText || this.props.loadingModify ? ' disabled' : ''
    const buttonHandler =
      this.props.modifyText === this.props.text || !this.props.modifyText || this.props.loadingModify
        ? () => {}
        : () => this.sendText()
    return (
      <React.Fragment>
        <div className={'box setting-text' + lib.pcClass(this.props.pc)}>
          <div>
            <label>{this.props.title}</label>
            <input
              type={this.props.type}
              value={this.props.modifyText}
              onChange={(e) => this.props.setModifyText(e.target.value)}
              placeholder={this.props.text}
              onKeyPress={(e) => this.keyPress(e)}
            />
          </div>
        </div>
        <div className={'box setting-button' + lib.pcClass(this.props.pc)}>
          <div onClick={buttonHandler} className={'button save' + disabledClass}>
            {buttonText}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modify)
