import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { setNavigationTitle, setBackNavigation } from '../../../Actions/Navigation'
import { getManager } from '../../../Actions/Manager'

import { showToast } from '../../../Actions/Toast'

import * as lib from '../../../Library/Library'

import './Manager.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,

    loadingManager: state.manager.loading,
    manager: state.manager.data
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

    showToast (string) {
      dispatch(showToast(string))
    }
  }
}

class Manager extends Component {
  componentDidMount () {
    this.props.setNavigationTitle('お知らせ')
    this.props.setBackNavigation(true, '/')
    this.props.getManager()
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
        <div key={'manager' + i} className='notice'>
          <div className='notice-title'><span>{each.title}</span><span className='date'>{date}</span></div>
          <div className='notice-text' dangerouslySetInnerHTML={{__html: each.text}}></div>
          {attachment}
        </div>
      )
    })
  }

  render () {
    // State List
    const { pc, loadingManager, manager } = this.props
    // Dispatch List
    // none

    const showManager = this.renderManager(loadingManager, manager)
    return (
      <div className={'manager' + lib.pcClass(pc)}>
        <div className={'contents-header' + lib.pcClass(pc)}>
          <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/manager'>お知らせ</Link></div>
          <h2>事務局からのお知らせ</h2>
        </div>

        <div className={'box manager' + lib.pcClass(pc)}>
          <div className='text'>
            {showManager}
          </div>
        </div>

        <div className={'box back-to-home' + lib.pcClass(pc)}>
          <div className='back-link'>
            <ul>
              <li><Link to='/'><div className='inner'><i className="fas fa-angle-left"></i><span>ホーム</span></div></Link></li>
            </ul>
          </div>
        </div>
        {/* <button onClick={() => this.props.showToast('Toast!!!')}>Toast</button> */}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Manager)
