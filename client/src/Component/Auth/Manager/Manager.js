import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { getManager } from '../../../Actions/Manager'

import { showToast } from '../../../Actions/Toast'

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
    this.props.getManager()
  }

  renderManager (loading, manager) {
    if (loading || !manager) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    console.log(manager)
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
      <div className={'manager' + (pc ? ' pc' : ' mobile')}>
        <div className='contents-header'>
          <h2>事務局からのお知らせ</h2>
        </div>

        <div className='box manager'>
          <div className='text'>
            {showManager}
          </div>
        </div>

        <div className='box back-to-home'>
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
