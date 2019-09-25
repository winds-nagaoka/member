import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import Back from '../../../../Library/Icons/Back'
import * as lib from '../../../../Library/Library'

import { setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'
import { setPostName, setPostText, setPostPass, sendPost, resetPost } from '../../../../Actions/BBS'

import { showToast } from '../../../../Actions/Toast'

import './Post.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,

    postName: state.bbs.postName,
    postText: state.bbs.postText,
    postPass: state.bbs.postPass,

    loadingPost: state.bbs.loadingPost
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
    setPostName (postName) {
      dispatch(setPostName(postName))
    },
    setPostText (postText) {
      dispatch(setPostText(postText))
    },
    setPostPass (postPass) {
      dispatch(setPostPass(postPass))
    },
    sendPost () {
      dispatch(sendPost())
    },
    resetPost () {
      dispatch(resetPost())
    }
  }
}

class Post extends Component {
  componentDidMount () {
    this.props.setNavigationTitle('書き込む')
    this.props.setBackNavigation(true, '/bbs')
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

  render () {

    return (
      <React.Fragment>

        <div className={'contents-header' + lib.pcClass(this.props.pc)}>
          <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/bbs'>掲示板</Link><i className="fas fa-chevron-right"></i><Link to='/bbs/post'>書き込む</Link></div>
          <h2>書き込む</h2>
        </div>

        <div className={'box post-form' + lib.pcClass(this.props.pc)}>
          <div className='form'>
            <div>
              <label>名前</label>
              <input type='text' tabIndex='1' value={this.props.postName} onChange={(e) => this.props.setPostName(e.target.value)} />
            </div>
            <div>
              <label>コメント</label>
              <textarea id='posttext' tabIndex='2' value={this.props.postText} onChange={(e) => this.props.setPostText(e.target.value)} />
            </div>
            <div>
              <label>編集パス</label>
              <input type='password' tabIndex='3' value={this.props.postPass} onChange={(e) => this.props.setPostPass(e.target.value)} />
            </div>
          </div>
        </div>

        <div className={'box post-button' + lib.pcClass(this.props.pc)}>
          <div onClick={() => this.props.sendPost()} className='send-button'>
            {this.props.loadingPost ? '読み込み中' : <span><i className='far fa-edit'></i>書き込む</span>}
          </div>
        </div>

        <div className={'box' + lib.pcClass(this.props.pc)}>
          <div className='back-link'>
            <ul>
              <li><Link to='/bbs'><div className='inner'><Back /><span>戻る</span></div></Link></li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)