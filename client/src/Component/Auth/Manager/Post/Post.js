import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import Back from '../../../../Library/Icons/Back'
import * as lib from '../../../../Library/Library'

import { setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'
import { getSelectionPost, setSelectionPostid, setSelectionPost, sendPost } from '../../../../Actions/Manager'

import { showToast } from '../../../../Actions/Toast'

import './Post.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,

    selectionPostid: state.manager.selectionPostid,
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
    getSelectionPost (id) {
      dispatch(getSelectionPost(id))
    },
    setSelectionPostid (selectionPostid) {
      dispatch(setSelectionPostid(selectionPostid))
    },
    setSelectionPost (selectionPost) {
      dispatch(setSelectionPost(selectionPost))
    },
    sendPost (removeRequest) {
      dispatch(sendPost(removeRequest))
    },
    resetPost () {
      dispatch(resetPost())
    }
  }
}

class Post extends Component {
  constructor (props) {
    super(props)
    console.warn('constructor')
    const { params } = this.props.match
    const id = params.id ? params.id : ''
    if (id) {
      this.props.getSelectionPost(id)
      this.props.setSelectionPostid(id)
      this.props.setNavigationTitle('曲情報を編集する')
      this.props.setBackNavigation(true, '/manager/detail/' + id)
    } else {
      this.props.setSelectionPostid(false)
      // Reducer と同じにする
      this.props.setSelectionPost({
        title: '',
        titleJa: '',
        titleEn: '',
        composer: [''],
        arranger: [''],
        duration: '',
        url: ['']
      })
      this.props.setNavigationTitle('候補曲を追加する')
      this.props.setBackNavigation(true, '/manager/selection')  
    }
  }

  componentDidMount () {
    console.warn('componentDidMout', this.props.selectionPostid)
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

  renderForm () {
    if (!this.props.selectionPost) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
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
      <div className='form'>
        <div>
          <label>曲名</label>
          <input type='text' name='title' value={this.props.selectionPost.title} onChange={(e) => this.changeValue(e)} placeholder='必須' />
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
          <label>演奏時間</label>
          <input type='text' name='duration' value={this.props.selectionPost.duration} onChange={(e) => this.changeValue(e)} />
        </div>
        <div>
          <label>参考音源</label>
          <div className='multi'>
            {urlInput}
          </div>
          <div className='add-data' onClick={() => this.addBlank('url')}><i className="fas fa-plus-circle"></i>参考音源を追加</div>
        </div>
      </div>
    )
  }

  renderMessage () {
    if (this.props.selectionPostid) {
      return (
        <div className='text'>
          <p>修正ページです。</p>
        </div>
      )
    } else {
      return (
        <div className='text'>
          <p>候補曲は期間中何度でも投稿できます。</p>
          <p>投稿者情報は公開されません。</p>
          <p>事務局が投稿に対して追記や修正を行う場合があります。</p>
        </div>
      )
    }
  }

  renderBreadNavigation () {
    if (this.props.selectionPostid) {
      return <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/manager'>お知らせ</Link><i className="fas fa-chevron-right"></i><Link to='/manager/selection'>選曲アンケート</Link><i className="fas fa-chevron-right"></i><Link to={'/manager/selection/detail/' + this.props.selectionPostid}>候補曲詳細</Link><i className="fas fa-chevron-right"></i><Link to={'/manager/selection/edit/' + this.props.selectionPostid}>曲情報を編集する</Link></div>
    } else {
      return <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/manager'>お知らせ</Link><i className="fas fa-chevron-right"></i><Link to='/manager/selection'>選曲アンケート</Link><i className="fas fa-chevron-right"></i><Link to='/manager/selection/add'>候補曲を追加する</Link></div>
    }
  }

  renderBackLink () {
    if (this.props.selectionPostid) {
      return <li><Link to={'/manager/selection/detail/' + this.props.selectionPostid}><div className='inner'><Back /><span>候補曲詳細へ</span></div></Link></li>
    } else {
      return <li><Link to='/manager/selection'><div className='inner'><Back /><span>候補曲一覧へ</span></div></Link></li>
    }
  }

  renderTitle () {
    if (this.props.selectionPostid) {
      return <h2>曲情報を編集する</h2>
    } else {
      return <h2>候補曲を追加する</h2>
    }
  }

  renderRemoveButton () {
    if (this.props.selectionPostid) {
      return (
        <div className={'box manager-selection-post-button' + lib.pcClass(this.props.pc)}>
          <div onClick={() => this.props.sendPost(true)} className='send-button'>
            {this.props.loadingSelectionPost ? '読み込み中' : <span><i className='far fa-edit'></i>削除する</span>}
          </div>
        </div>
      )
    } else {
      return false
    }
  }

  render () {

    const showBreadNavigation = this.renderBreadNavigation()
    const showTitle = this.renderTitle()
    const showMessage = this.renderMessage()
    const showForm = this.renderForm()
    const showRemoveButton = this.renderRemoveButton()
    const showBackLink = this.renderBackLink()

    const buttonLabel = this.props.selectionPostid ? '更新する' : '書き込む'

    return (
      <React.Fragment>

        <div className={'contents-header' + lib.pcClass(this.props.pc)}>
          {showBreadNavigation}
          {showTitle}
        </div>

        <div className={'box manager-selection-guide' + lib.pcClass(this.props.pc)}>
          {showMessage}
        </div>

        <div className={'box manager-selection-post' + lib.pcClass(this.props.pc)}>
          {showForm}
        </div>

        <div className={'box manager-selection-post-button' + lib.pcClass(this.props.pc)}>
          <div onClick={() => this.props.sendPost()} className='send-button'>
            {this.props.loadingSelectionPost ? '読み込み中' : <span><i className='far fa-edit'></i>{buttonLabel}</span>}
          </div>
        </div>

        {showRemoveButton}

        <div className={'box' + lib.pcClass(this.props.pc)}>
          <div className='back-link'>
            <ul>
              {showBackLink}
            </ul>
          </div>
        </div>

      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)