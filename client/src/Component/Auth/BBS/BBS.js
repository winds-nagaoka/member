import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { getBBSList } from '../../../Actions/BBS'

import { showToast } from '../../../Actions/Toast'

import './BBS.css'

function mapStateToProps(state) {
  return {
    mobile: state.status.mobile,

    loadingBBSList: state.bbs.loading,
    list: state.bbs.data
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getBBSList () {
      dispatch(getBBSList())
    },

    showToast (string) {
      dispatch(showToast(string))
    }
  }
}

class BBS extends Component {
  componentDidMount () {
    this.props.getBBSList()
  }

  renderBBSList (loading, list) {
    if (loading || !list) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    console.warn(list)
    return list.list.map((each, i) => {
      const text = each.text.replace(/(<br>|<br \/>)/gi, '\n')
      return (
        <div key={'bbs' + i} className='bbs-item'>
          <div className='bbs-title'><span className='number'>{each.number}</span><span className='name'>{each.name}</span><span className='time'>{each.time}</span></div>
          {/* <div className='bbs-text' dangerouslySetInnerHTML={{__html: each.text}}></div> */}
          <div className='bbs-text'>{text.split('\n').map((m,j) => {return (<p key={'text' + i + j}>{m}</p>)})}</div>
        </div>
      )
    })
  }

  render () {
    // State List
    const { mobile, loadingBBSList, list } = this.props
    // Dispatch List
    // none

    const mobileMode = mobile ? ' mobile' : ''
    const showBBS = this.renderBBSList(loadingBBSList, list)
    return (
      <div className={'bbs' + mobileMode}>
        <div className='contents-header'>
          <h2>団員専用掲示板</h2>
        </div>
        <div className='box bbs-list'>
          <div className='text'>
            <div className='bbs-list'>
              {showBBS}
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(BBS)
