import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'
import { getSelectionPhase, getSelectionList } from '../../../../Actions/Manager'

import { showToast } from '../../../../Actions/Toast'

import Forward from '../../../../Library/Icons/Forward'
import Back from '../../../../Library/Icons/Back'
import * as lib from '../../../../Library/Library'
import * as libScore from '../../Score/Library/Library'

import './Selection.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,

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
    const link = this.props.loadingSelectionPhase || !this.props.selectionPhase || this.props.selectionPhase === 'prepare' ? <li><div className='disabled-link'><div className='inner'><span>候補曲を追加する</span><Forward /></div></div></li> : <li><Link to='/manager/selection/post'><div className='inner'><span>候補曲を追加する</span><Forward /></div></Link></li>
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
      const selection = each.selection
      console.warn(selection)
      const composer = selection.composer.length === 0 ? '' : libScore.makeLine(selection.composer)
      const arranger = selection.arranger.length === 0 ? '' : libScore.makeLine(selection.arranger)
      const bar = composer === '' || arranger === '' ? '' : <span className='bar'>/</span>
      return (
        <div key={each._id} className='selection-list' onTouchStart={() => {}}>
          <div className='content'>
            <div className='title-ja'><span>{selection.titleJa}</span></div>
            <div className='title-en'><span>{selection.titleEn}</span></div>
            <div className='composer-arranger'><span><span>{composer}</span>{bar}<span>{arranger}</span></span></div>
          </div>
          <Forward />
        </div>
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
