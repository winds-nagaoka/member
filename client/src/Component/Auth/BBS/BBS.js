import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import * as lib from '../../../Library/Library'

import { setNavigationTitle, setBackNavigation } from '../../../Actions/Navigation'
import { getBBSList, loadMore } from '../../../Actions/BBS'

import { showToast } from '../../../Actions/Toast'

import './BBS.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,

    loading: state.bbs.loading,
    list: state.bbs.list,
    showList: state.bbs.showList,
    showMore: state.bbs.showMore
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
    getBBSList () {
      dispatch(getBBSList())
    },

    showToast (string) {
      dispatch(showToast(string))
    },
    loadMore () {
      dispatch(loadMore())
    }
  }
}

class BBS extends Component {
  componentDidMount () {
    this.props.setNavigationTitle('団員専用掲示板')
    this.props.setBackNavigation(true, '/')
    this.props.getBBSList()
  }

  // loadMore () {
  //   setTimeout(() => {
  //     const showCount = this.state.showCount + 5
  //     const bbsList = this.state.bbsList.concat(this.props.list.list.slice(this.state.showCount, showCount))
  //     console.log('load call', this.state.showCount, showCount, bbsList, showCount, this.props.list.list.length)
  //     this.setState({bbsList, showCount})
  //     if (showCount > this.props.list.list.length) this.setState({hasMore: false})    
  //   }, 100)
  // }

  renderContents () {
    if (this.props.loading || !this.props.list) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    return this.props.showList.map((each, i) => {
      const text = each.text.replace(/(<br>|<br \/>)/gi, '\n').replace(/&gt;/gi, '>').replace(/&lt;/gi, '<')
      return (
        <div key={'bbs' + i} className='bbs-item'>
          <div className='bbs-title'><span className='number'>{each.number}</span><span className='name'>{each.name}</span><span className='time'>{each.time}</span></div>
          {/* <div className='bbs-text' dangerouslySetInnerHTML={{__html: each.text}}></div> */}
          <div className='bbs-text'>{text.split('\n').map((m,j) => {return (<p key={'text' + i + j}>{m}</p>)})}</div>
        </div>
      )
    })
  }

  renderMore () {
    if (this.props.loading || !this.props.list) return false
    return this.props.showMore ? <div onClick={() => this.props.loadMore()} className='more'><i className="fas fa-plus-circle"></i>More</div> : false
  }

  render () {
    const showList = this.renderContents()
    const showMore = this.renderMore()

    return (
      <div className={'bbs' + (lib.pcClass(this.props.pc))}>
        <div className={'contents-header' + lib.pcClass(this.props.pc)}>
          <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/bbs'>掲示板</Link></div>
          <h2>団員専用掲示板</h2>
        </div>
        <div className={'box bbs-list' + lib.pcClass(this.props.pc)}>
          <div className='text'>
            <div className='bbs-list'>
              {showList}
              {showMore}
            </div>
          </div>
        </div>
        <div className={'box back-to-home' + lib.pcClass(this.props.pc)}>
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
