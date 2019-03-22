import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'
import {
  getBoxList
 } from '../../../../Actions/ScoreBox'

import * as lib from '../../../../Library/Library'
import * as libScore from '../Library/Library'

import './Box.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    loadingScore: state.score.loading,
    scoreList: state.score.scoreList,
    showList: state.score.showList,
    loadMoreLoading: state.score.loadMoreLoading,
    searchQuery: state.score.searchQuery,
    searchLoading: state.score.searchLoading,
    searchBoxRef: state.score.searchBoxRef,

    editPreLoading: state.score.editPreLoading
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
    getBoxList () {
      dispatch(getBoxList())
    }
  }
}

class Box extends Component {
  componentDidMount () {
    this.props.setNavigationTitle('ウィンズスコア')
    this.props.setBackNavigation(true, '/score')
    this.props.getBoxList()
  }

  componentWillUnmount () {
  }


  render () {

    const showBox = 'OK'

    return (
      <React.Fragment>
        <div className={'contents-header' + lib.pcClass(this.props.pc)}>
          <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/score'>ウィンズスコア</Link></div>
          <h2>ウィンズスコア</h2>
          <p>楽譜管理箱</p>
        </div>

        <div className={'box score-home' + lib.pcClass(this.props.pc)}>
          {showBox}
        </div>

        <div className={'box score-add-link' + lib.pcClass(this.props.pc)}>
          <div onClick={() => this.props.setDisplayEditScoreModal(true, 'new', undefined)}>{this.props.editPreLoading ? <span><i className='fas fa-spinner fa-pulse'></i></span> : <span><i className='far fa-edit'></i>新しい楽譜を追加</span>}</div>
        </div>

      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Box)
