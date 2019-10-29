import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'
import { getSelectionPhase, getSelectionList } from '../../../../Actions/Manager'

import { showToast } from '../../../../Actions/Toast'

import Forward from '../../../../Library/Icons/Forward'
import * as lib from '../../../../Library/Library'

import './Selection.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,

    loadingSelectionPhase: state.manager.loadingSelectionPhase,
    selectionPhase: state.manager.selectionPhase
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
    getSelectionPhase () {
      dispatch(getSelectionPhase())
    },

    showToast (string) {
      dispatch(showToast(string))
    }
  }
}

class Selection extends Component {
  componentDidMount () {
    this.props.setNavigationTitle('選曲アンケート')
    this.props.setBackNavigation(true, '/manager')
    this.props.getSelectionPhase()
  }

  renderSelection () {
    const link = this.props.loadingSelectionPhase || !this.props.selectionPhase || this.props.selectionPhase === 'prepare' ? <li><div className='disabled-link'><div className='inner'><span>選曲アンケート</span><Forward /></div></div></li> : <li><Link to='/manager/selection'><div className='inner'><span>選曲アンケート</span><Forward /></div></Link></li>
    return (
      <div className={'box selection' + lib.pcClass(this.props.pc)}>
        <div className='link'>
          <ul>
            {link}
          </ul>
        </div>
      </div>
    )
  }

  render () {
    // State List
    const { pc } = this.props
    // Dispatch List
    // none

    return (
      <React.Fragment>
        
        <div className={'contents-header' + lib.pcClass(pc)}>
          <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/manager'>お知らせ</Link><i className="fas fa-chevron-right"></i><Link to='/manager/selection'>選曲アンケート</Link></div>
          <h2>選曲アンケート</h2>
        </div>

      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Selection)
