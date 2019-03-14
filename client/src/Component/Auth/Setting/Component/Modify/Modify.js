import React, { Component } from 'react'
import request from 'superagent'

import { connect } from 'react-redux'

import * as lib from '../../../../../Library/Library'

import { setModifyText, updateModifyText } from '../../../../../Actions/Setting'

import './Modify.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    loadingModify: state.setting.loadingModify,
    modifyText: state.setting.modifyText
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setModifyText (text) {
      dispatch(setModifyText(text))
    },
    updateModifyText (apiPath, replacePath) {
      dispatch(updateModifyText(apiPath, replacePath))
    }
  }
}

class Modify extends Component {

  componentDidMount () {
    this.props.setModifyText(this.props.text)
  }

  sendText () {
    if (!this.props.modifyText) return
    if (!this.props.api) return
    this.props.updateModifyText(this.props.api, '/setting')
  }

  keyPress (e) {
    if (e.which === 13) this.sendText(e)
  }

  cancel () {
    if (this.props.onCancel) {
      this.props.onCancel()
    }
  }

  render () {
    const disabled = (this.props.modifyText === this.props.text || !this.props.modifyText) ? true : false;
    return (
      <React.Fragment>
        <div className={'box setting-text' + lib.pcClass(this.props.pc)}>
          <input value={this.props.modifyText} onChange={(e) => this.props.setModifyText(e.target.value)} placeholder={this.props.text} onKeyPress={(e) => this.keyPress(e)} />
        </div>
        <div className={'box setting-button' + lib.pcClass(this.props.pc)}>
          <div onClick={() => this.sendText()} className='button save' disabled={disabled}>保存</div>
          {/* <div onClick={() => this.cancel()} className='button cancel'>キャンセル</div> */}
        </div>
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modify)