import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import Back from '../../../../Library/Icons/Back'
import * as lib from '../../../../Library/Library'

import { setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'
import { setSelectionPost, sendPost } from '../../../../Actions/Manager'

import { showToast } from '../../../../Actions/Toast'

import './Post.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,

    selectionPost: state.manager.selectionPost,
    loadingSelectionPost: state.manager.loadingSelectionPost,
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
    setSelectionPost (selectionPost) {
      dispatch(setSelectionPost(selectionPost))
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
    this.props.setNavigationTitle('候補曲を追加する')
    this.props.setBackNavigation(true, '/manager/selection')
    // Reducer と同じにする
    this.props.setSelectionPost({
      titleJa: '',
      titleEn: '',
      composer: [''],
      arranger: [''],
      url: ['']
    })
  }

  changeValue (e) {
    const newSelectionPost = {
      ...this.props.selectionPost,
      [e.target.name]: e.target.value
    }
    this.props.setSelectionPost(newSelectionPost)
  }

  changeArrayValue (num, e) {
    const newArray = this.props.selectionPost[e.target.name]
    newArray[num] = e.target.value
    const newSelectionPost = {
      ...this.props.selectionPost,
      [e.target.name]: newArray
    }
    this.props.setSelectionPost(newSelectionPost)
  }

  addBlank (name) {
    const newArray = this.props.selectionPost[name]
    newArray[newArray.length] = ''
    const newSelectionPost = {
      ...this.props.selectionPost,
      [name]: newArray
    }
    this.props.setSelectionPost(newSelectionPost)
  }

  render () {
    const composerInput = this.props.selectionPost.composer.map((each, i) => {
      return <input key={i} type='text' value={each} name='composer' onChange={(e) => this.changeArrayValue(i, e)} />
    })
    const arrangerInput = this.props.selectionPost.arranger.map((each, i) => {
      return <input key={i} type='text' value={each} name='arranger' onChange={(e) => this.changeArrayValue(i, e)} />
    })
    const urlInput = this.props.selectionPost.url.map((each, i) => {
      return <input key={i} type='text' value={each} name='url' onChange={(e) => this.changeArrayValue(i, e)} placeholder='YouTubeのURLなど' />
    })

    return (
      <React.Fragment>

        <div className={'contents-header' + lib.pcClass(this.props.pc)}>
          <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/manager'>お知らせ</Link><i className="fas fa-chevron-right"></i><Link to='/manager/selection'>選曲アンケート</Link><i className="fas fa-chevron-right"></i><Link to='/manager/selection/post'>候補曲を追加する</Link></div>
          <h2>候補曲を追加する</h2>
        </div>

        <div className={'box manager-selection-guide' + lib.pcClass(this.props.pc)}>
          <div className='text'>
            <p>候補曲は期間中何度でも投稿できます。</p>
            <p>投稿者情報は公開されません。</p>
            <p>事務局が投稿に対して追記や修正を行う場合があります。</p>
          </div>
        </div>

        <div className={'box manager-selection-post' + lib.pcClass(this.props.pc)}>
          <div className='form'>
            <div>
              <label>タイトル(日本語)</label>
              <input type='text' name='titleJa' value={this.props.selectionPost.titleJa} onChange={(e) => this.changeValue(e)} />
            </div>
            <div>
              <label>タイトル(原語)</label>
              <input type='text' name='titleEn' value={this.props.selectionPost.titleEn} onChange={(e) => this.changeValue(e)} />
            </div>
            <div>
              <label>作曲者</label>
              <div className='multi'>
                {composerInput}
              </div>
              <div className='add-data' onClick={() => this.addBlank('composer')}><i className="fas fa-plus-circle"></i>作曲者を追加</div>
            </div>
            <div>
              <label>編曲者</label>
              <div className='multi'>
                {arrangerInput}
              </div>
              <div className='add-data' onClick={() => this.addBlank('arranger')}><i className="fas fa-plus-circle"></i>編曲者を追加</div>
            </div>
            <div>
              <label>参考音源</label>
              <div className='multi'>
                {urlInput}
              </div>
              <div className='add-data' onClick={() => this.addBlank('url')}placeholder='YouTubeのURLなど'><i className="fas fa-plus-circle"></i>参考音源を追加</div>
            </div>
          </div>
        </div>

        <div className={'box manager-selection-post-button' + lib.pcClass(this.props.pc)}>
          <div onClick={() => this.props.sendPost()} className='send-button'>
            {this.props.loadingSelectionPost ? '読み込み中' : <span><i className='far fa-edit'></i>書き込む</span>}
          </div>
        </div>

        <div className={'box' + lib.pcClass(this.props.pc)}>
          <div className='back-link'>
            <ul>
              <li><Link to='/manager/selection'><div className='inner'><Back /><span>候補曲一覧へ</span></div></Link></li>
            </ul>
          </div>
        </div>

      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)