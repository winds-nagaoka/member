import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'
import { getManager, getSelectionPhase } from '../../../../Actions/Manager'

import { showToast } from '../../../../Actions/Toast'

import Forward from '../../../../Library/Icons/Forward'
import * as lib from '../../../../Library/Library'

import './Notice.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,

    loadingManager: state.manager.loading,
    manager: state.manager.data,

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
    getManager () {
      dispatch(getManager())
    },
    getSelectionPhase () {
      dispatch(getSelectionPhase())
    },

    showToast (string) {
      dispatch(showToast(string))
    }
  }
}

class Notice extends Component {
  componentDidMount () {
    this.props.setNavigationTitle('お知らせ')
    this.props.setBackNavigation(true, '/')
    this.props.getManager()
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

  renderManager (loading, manager) {
    if (loading || !manager) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    return manager.contents.map((each, i) => {
      const attachment = each.attachment ? each.attachment.map((attach, i) => {
        const size = Math.round(attach.size * 0.01) / 10
        return <div key={'attachment' + i} className='notice-attachment'><a href={'https://winds-n.com/member/data/' + attach.filename} target='_blank' className='attachment'><span>{attach.title}</span><span className='size'>{size}KB</span></a></div>
      }) : ''
      const date = each.time[0].date === '1970/01/01' ? false : each.time[0].date
      return (
        <div key={'manager' + i} className={'box notice' + lib.pcClass(this.props.pc)}>
          <div className='title-frame notice-frame'>
            <label className='notice-title'><span>{each.title}</span><span className='date'>{date}</span></label>
            <div className='notice-text text' dangerouslySetInnerHTML={{__html: each.text}}></div>
          </div>
          {attachment}
          {/* <div className='notice-each'>
            <div className='notice-title'></div>
            
          </div> */}
        </div>
      )
    })
  }

  render () {
    // State List
    const { pc, loadingManager, manager } = this.props
    // Dispatch List
    // none

    const showSelection = this.renderSelection()
    const showManager = this.renderManager(loadingManager, manager)
    return (
      <React.Fragment>
        
        <div className={'contents-header' + lib.pcClass(pc)}>
          <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/manager'>お知らせ</Link></div>
          <h2>事務局からのお知らせ</h2>
        </div>

        {showSelection}

        {/* <div className={'box manager' + lib.pcClass(pc)}> */}
          {/* <div className='text'> */}
          {showManager}
          {/* </div> */}
        {/* </div> */}

      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notice)
