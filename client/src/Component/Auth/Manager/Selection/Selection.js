import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'
import { getSelectionPhase, getSelectionList } from '../../../../Actions/Manager'

import { showToast } from '../../../../Actions/Toast'

import Forward from '../../../../Library/Icons/Forward'
import Back from '../../../../Library/Icons/Back'
import * as lib from '../../../../Library/Library'
import * as libManager from '../Library/Library'

import './Selection.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    user: state.status.user,

    loadingSelectionPhase: state.manager.loadingSelectionPhase,
    selectionPhase: state.manager.selectionPhase,

    loadingSelectionList: state.manager.loadingSelectionList,
    selectionList: state.manager.selectionList
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
    getSelectionList () {
      dispatch(getSelectionList())
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
    this.props.getSelectionList()
  }

  renderPost () {
    const link = this.props.loadingSelectionPhase || !this.props.selectionPhase || this.props.selectionPhase === 'prepare' ? <li><div className='disabled-link'><div className='inner'><span>候補曲を追加する</span><Forward /></div></div></li> : <li><Link to='/manager/selection/add'><div className='inner'><span>候補曲を追加する</span><Forward /></div></Link></li>
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

  renderList () {
    if (!this.props.selectionList) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    return this.props.selectionList.map((each, i) => {
      if (each.remove) return
      console.log(each, this.props.user)
      const selection = each.selection
      const composer = selection.composer.length === 0 ? '' : libManager.makeLine(selection.composer)
      const arranger = selection.arranger.length === 0 ? '' : libManager.makeLine(selection.arranger)
      const bar = composer === '' || arranger === '' ? '' : <span className='bar'>/</span>
      const link = selection.url.length > 0 && selection.url[0].match(/youtu\.?be/) ? <div className='youtube-link'><i className='fab fa-youtube'></i></div> : false
      const edit = selection.postUserid === this.props.user._id ? <div className='edit'><i className='fas fa-edit'></i></div> : false
      const contentClassLink = selection.url.length > 0 && selection.url[0].match(/youtu\.?be/) ? ' add-link' : ''
      const contentClassEdit = selection.postUserid === this.props.user._id ? ' add-edit' : ''
      return (
        <Link key={each._id} to={'/manager/selection/detail/' + each._id} className='selection-list' onTouchStart={() => {}}>
          <div className={'content' + contentClassLink + contentClassEdit}>
            <div className='selection-title'><span>{selection.title}</span></div>
            <div className='composer-arranger'><span><span>{composer}</span>{bar}<span>{arranger}</span></span></div>
          </div>
          {edit}
          {link}
          <Forward />
        </Link>
      )
    })
  }

  render () {
    // State List
    const { pc } = this.props
    // Dispatch List
    // none

    const showPost = this.renderPost()
    const showList = this.renderList()

    const endLabel = this.props.selectionList ? !(this.props.selectionList.length > 10 && this.props.selectionList.length !== this.props.showList.length) ? <div className='end-label'>{!this.props.loadingSelectionList && !this.props.loadingSearch ? this.props.selectionList.length === 0 ? 'みつかりませんでした' : 'これ以上データはありません' : false}</div> : false : false

    return (
      <React.Fragment>
        
        <div className={'contents-header' + lib.pcClass(pc)}>
          <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/manager'>お知らせ</Link><i className="fas fa-chevron-right"></i><Link to='/manager/selection'>選曲アンケート</Link></div>
          <h2>選曲アンケート</h2>
        </div>

        {showPost}

        <div className={'box selection' + lib.pcClass(this.props.pc)}>
          {showList}
          {endLabel}
        </div>

        <div className={'box' + lib.pcClass(this.props.pc)}>
          <div className='back-link'>
            <ul>
              <li><Link to='/manager'><div className='inner'><Back /><span>戻る</span></div></Link></li>
            </ul>
          </div>
        </div>

      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Selection)
