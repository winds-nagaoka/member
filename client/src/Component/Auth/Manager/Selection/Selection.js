import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'
import { getSelectionPhase, getSelectionList, getSelectionLike } from '../../../../Actions/Manager'

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
    selectionList: state.manager.selectionList,

    loadingSelectionLike: state.manager.loadingSelectionLike,
    selectionLike: state.manager.selectionLike
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
    getSelectionLike () {
      dispatch(getSelectionLike())
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
    this.props.getSelectionLike()
  }

  renderList () {
    if (!this.props.selectionList) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    return this.props.selectionList.map((each, i) => {
      if (each.remove) return
      const selection = each.selection
      const composer = selection.composer.length === 0 ? '' : libManager.makeLine(selection.composer)
      const arranger = selection.arranger.length === 0 ? '' : libManager.makeLine(selection.arranger)
      const bar = composer === '' || arranger === '' ? '' : <span className='bar'>/</span>
      const link = selection.url.length > 0 && selection.url[0].match(/youtu\.?be/) ? <div className='youtube-link'><i className='fab fa-youtube'></i></div> : false
      const edit = selection.postUserid === this.props.user._id && this.props.selectionPhase === 'getmusic' ? <div className='edit'><i className='fas fa-edit'></i></div> : false
      const contentClassLink = selection.url.length > 0 && selection.url[0].match(/youtu\.?be/) ? ' add-link' : ''
      const contentClassEdit = selection.postUserid === this.props.user._id && this.props.selectionPhase === 'getmusic' ? ' add-edit' : ''
      const like = this.props.loadingSelectionLike ? false : <div className='like'>{libManager.countLike(this.props.selectionLike, each._id)}</div>
      return (
        <Link key={each._id} to={'/manager/selection/detail/' + each._id} className='selection-list' onTouchStart={() => {}}>
          <div className={'content' + contentClassLink + contentClassEdit}>
            <div className='selection-title'><span>{selection.title}</span></div>
            <div className='composer-arranger'><span><span>{composer}</span>{bar}<span>{arranger}</span></span></div>
          </div>
          {edit}
          {link}
          {like}
          <Forward />
        </Link>
      )
    })
  }

  renderPost () {
    const link = (this.props.selectionPhase === 'getmusic' || libManager.admin(this.props.user)) ? (
      <li><Link to='/manager/selection/add'><div className='inner'><span>候補曲を追加する</span><Forward /></div></Link></li>
    ) : (
      <li><div className='disabled-link'><div className='inner'><span>候補曲を追加する</span><Forward /></div></div></li>
    )
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

  renderMessage () {
    if (this.props.selectionPhase === 'onlyadmin') {
      return (
        <div className='text'>
          <p>現在管理者のみ閲覧できます</p>
        </div>
      )
    } else if (this.props.selectionPhase === 'getmusic') {
      return (
        <div className='text'>
          <p>現在候補曲を集めています。</p>
          <p>思いついたときにどんどん投稿してください。</p>
          <p>投稿期間が終わると投稿および修正ができなくなりますのでご注意ください。</p>
          <p>現在の投稿数は{this.props.selectionList ? this.props.selectionList.length : ' '}件です。</p>
        </div>
      )
    } else if (this.props.selectionPhase === 'showlist') {
      return (
        <div className='text'>
          <p>候補曲の募集期間は終了しました。</p>
          <p>これ以上の曲の追加および修正はできません。</p>
          <p>投稿数は{this.props.selectionList ? this.props.selectionList.length : ' '}件です。</p>
        </div>
      )
    } else if (this.props.selectionPhase === 'hide') {
      return (
        <div className='text'>
          <p>現在管理者のみ閲覧できます</p>
        </div>
      )
    } else {
      return (
        <div className='text'>
          <p>現在管理者のみ閲覧できます</p>
        </div>
      )
    }
  }

  render () {
    // State List
    const { pc } = this.props
    // Dispatch List
    // none

    const showMessage = this.renderMessage()
    const showPost = this.renderPost()
    const showList = this.renderList()

    const endLabel = this.props.selectionList ? !(this.props.selectionList.length > 10 && this.props.selectionList.length !== this.props.showList.length) ? <div className='end-label'>{!this.props.loadingSelectionList && !this.props.loadingSearch ? this.props.selectionList.length === 0 ? 'みつかりませんでした' : 'これ以上データはありません' : false}</div> : false : false

    return (
      <React.Fragment>
        
        <div className={'contents-header' + lib.pcClass(pc)}>
          <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/manager'>お知らせ</Link><i className="fas fa-chevron-right"></i><Link to='/manager/selection'>選曲アンケート</Link></div>
          <h2>選曲アンケート</h2>
        </div>

        <div className={'box selection-message' + lib.pcClass(this.props.pc)}>
          {showMessage}
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
