import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'

import { connect } from 'react-redux'

import Back from '../../../../Library/Icons/Back'
import * as lib from '../../../../Library/Library'
import * as libManager from '../Library/Library'

import { setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'
import {
  getSelectionPhase,
  getSelectionPost,
  setSelectionPostid,
  setSelectionPost,
  sendPost,
} from '../../../../Actions/Manager'

import './Post.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    user: state.status.user,

    loadingSelectionPhase: state.manager.loadingSelectionPhase,
    selectionPhase: state.manager.selectionPhase,

    selectionPostid: state.manager.selectionPostid,
    selectionPost: state.manager.selectionPost,
    loadingSelectionPost: state.manager.loadingSelectionPost,
    loadingSelectionRemovePost: state.manager.loadingSelectionRemovePost,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setNavigationTitle(title) {
      dispatch(setNavigationTitle(title))
    },
    setBackNavigation(backNavigation, backNavigationPath) {
      dispatch(setBackNavigation(backNavigation, backNavigationPath))
    },
    getSelectionPhase() {
      dispatch(getSelectionPhase())
    },
    getSelectionPost(id) {
      dispatch(getSelectionPost(id))
    },
    setSelectionPostid(selectionPostid) {
      dispatch(setSelectionPostid(selectionPostid))
    },
    setSelectionPost(selectionPost) {
      dispatch(setSelectionPost(selectionPost))
    },
    sendPost(removeRequest) {
      dispatch(sendPost(removeRequest))
    },
    // resetPost () {
    //   dispatch(resetPost())
    // }
  }
}

class Post extends Component {
  constructor(props) {
    super(props)
    const { params } = this.props.match
    const id = params.id ? params.id : ''
    if (id) {
      this.props.getSelectionPost(id)
      this.props.setSelectionPostid(id)
      this.props.setNavigationTitle('曲情報編集')
      this.props.setBackNavigation(true, '/manager/selection/detail/' + id)
    } else {
      this.props.setSelectionPostid(false)
      this.props.setNavigationTitle('候補曲投稿')
      this.props.setBackNavigation(true, '/manager/selection')
      // Reducer と同じにする
      this.props.setSelectionPost({
        title: '',
        titleJa: '',
        titleEn: '',
        composer: [''],
        arranger: [''],
        duration: '',
        time: '',
        url: [''],
        memo: '',
      })
    }
  }

  componentDidMount() {
    this.props.getSelectionPhase()
  }

  changeValue(e) {
    const newSelectionPost = {
      ...this.props.selectionPost,
      [e.target.name]: e.target.value,
    }
    this.props.setSelectionPost(newSelectionPost)
  }

  changeArrayValue(num, e) {
    const newArray = this.props.selectionPost[e.target.name]
    newArray[num] = e.target.value
    const newSelectionPost = {
      ...this.props.selectionPost,
      [e.target.name]: newArray,
    }
    this.props.setSelectionPost(newSelectionPost)
  }

  addBlank(name) {
    const newArray = this.props.selectionPost[name]
    newArray[newArray.length] = ''
    const newSelectionPost = {
      ...this.props.selectionPost,
      [name]: newArray,
    }
    this.props.setSelectionPost(newSelectionPost)
  }

  renderForm() {
    if (!this.props.selectionPost)
      return (
        <div className="loading">
          <div className="loading1"></div>
          <div className="loading2"></div>
          <div className="loading3"></div>
        </div>
      )
    const title = (
      <div>
        <label>曲名</label>
        <input
          type="text"
          name="title"
          value={this.props.selectionPost.title}
          onChange={(e) => this.changeValue(e)}
          placeholder="必須"
        />
      </div>
    )
    const composerInput = this.props.selectionPost.composer.map((each, i) => {
      return (
        <input
          key={i}
          type="text"
          value={each}
          name="composer"
          onChange={(e) => this.changeArrayValue(i, e)}
          placeholder="入力しなくてもOK"
        />
      )
    })
    const composer = (
      <div>
        <label>作曲者</label>
        <div className="multi">{composerInput}</div>
        <div className="add-data" onClick={() => this.addBlank('composer')}>
          <i className="fas fa-plus-circle"></i>作曲者を追加
        </div>
      </div>
    )
    const arrangerInput = this.props.selectionPost.arranger.map((each, i) => {
      return (
        <input
          key={i}
          type="text"
          value={each}
          name="arranger"
          onChange={(e) => this.changeArrayValue(i, e)}
          placeholder="入力しなくてもOK"
        />
      )
    })
    const arranger = (
      <div>
        <label>編曲者</label>
        <div className="multi">{arrangerInput}</div>
        <div className="add-data" onClick={() => this.addBlank('arranger')}>
          <i className="fas fa-plus-circle"></i>編曲者を追加
        </div>
      </div>
    )
    const duration = (
      <div>
        <label>演奏時間</label>
        <input
          type="text"
          name="duration"
          value={this.props.selectionPost.duration}
          onChange={(e) => this.changeValue(e)}
          placeholder="入力しなくてもOK"
        />
      </div>
    )
    const urlInput = this.props.selectionPost.url.map((each, i) => {
      return (
        <input
          key={i}
          type="text"
          value={each}
          name="url"
          onChange={(e) => this.changeArrayValue(i, e)}
          placeholder="YouTubeのURLなど(入力しなくてもOK)"
        />
      )
    })
    const url = (
      <div>
        <label>参考音源</label>
        <div className="multi">{urlInput}</div>
        <div className="add-data" onClick={() => this.addBlank('url')}>
          <i className="fas fa-plus-circle"></i>参考音源を追加
        </div>
      </div>
    )
    const memo = (
      <div>
        <label>メモ</label>
        <input
          type="text"
          name="memo"
          value={this.props.selectionPost.memo}
          onChange={(e) => this.changeValue(e)}
          placeholder="入力しなくてもOK"
        />
      </div>
    )
    if (!this.props.selectionPostid) {
      // New
      return (
        <React.Fragment>
          <div className={'box manager-selection-post' + lib.pcClass(this.props.pc)}>
            <div className="form">{title}</div>
          </div>

          <div className={'box manager-selection-guide' + lib.pcClass(this.props.pc)}>
            <div className="text">
              <p>以下は入力しなくても大丈夫です。</p>
            </div>
          </div>

          <div className={'box manager-selection-post' + lib.pcClass(this.props.pc)}>
            <div className="form">
              {composer}
              {arranger}
              {duration}
              {url}
              {memo}
            </div>
          </div>
        </React.Fragment>
      )
    } else {
      // Edit
      const titleJa =
        this.props.selectionPostid && libManager.admin(this.props.user) ? (
          <div>
            <label>タイトル(日本語)[管理者のみ]</label>
            <input
              type="text"
              name="titleJa"
              value={this.props.selectionPost.titleJa}
              onChange={(e) => this.changeValue(e)}
              placeholder="隠しフィールド"
            />
          </div>
        ) : (
          false
        )
      const titleEn =
        this.props.selectionPostid && libManager.admin(this.props.user) ? (
          <div>
            <label>タイトル(原語)[管理者のみ]</label>
            <input
              type="text"
              name="titleEn"
              value={this.props.selectionPost.titleEn}
              onChange={(e) => this.changeValue(e)}
              placeholder="隠しフィールド"
            />
          </div>
        ) : (
          false
        )
      const time =
        this.props.selectionPostid && libManager.admin(this.props.user) ? (
          <div>
            <label>演奏時間(秒)[管理者のみ] - 4桁の文字列</label>
            <input
              type="text"
              name="time"
              value={this.props.selectionPost.time}
              onChange={(e) => this.changeValue(e)}
              pattern="\d*"
              placeholder="隠しフィールド"
            />
          </div>
        ) : (
          false
        )
      const message = libManager.admin(this.props.user) ? (
        <div className={'box manager-selection-guide' + lib.pcClass(this.props.pc)}>
          <div className="text">
            <p>以下の項目は管理者専用です。</p>
          </div>
        </div>
      ) : (
        false
      )
      const adminForm = libManager.admin(this.props.user) ? (
        <div className={'box manager-selection-post' + lib.pcClass(this.props.pc)}>
          <div className="form">
            {titleJa}
            {titleEn}
            {time}
          </div>
        </div>
      ) : (
        false
      )
      return (
        <React.Fragment>
          <div className={'box manager-selection-post' + lib.pcClass(this.props.pc)}>
            <div className="form">
              {title}
              {composer}
              {arranger}
              {duration}
              {url}
              {memo}
            </div>
          </div>

          {message}

          {adminForm}
        </React.Fragment>
      )
    }
  }

  renderMessage() {
    if (this.props.selectionPostid) {
      return (
        <div className="text">
          <p>修正ページです</p>
        </div>
      )
    } else {
      return (
        <div className="text">
          <p>投稿には曲名のみ必須です。</p>
          <p>候補曲は期間中何回でも投稿できます。</p>
          <p>投稿者情報は公開されません。</p>
          <p>事務局が投稿に対して追記や修正を行う場合があります。</p>
        </div>
      )
    }
  }

  renderBreadNavigation() {
    if (this.props.selectionPostid) {
      return (
        <div className="bread-navigation">
          <Link to="/">ホーム</Link>
          <i className="fas fa-chevron-right"></i>
          <Link to="/manager">お知らせ</Link>
          <i className="fas fa-chevron-right"></i>
          <Link to="/manager/selection">選曲アンケート</Link>
          <i className="fas fa-chevron-right"></i>
          <Link to={'/manager/selection/detail/' + this.props.selectionPostid}>候補曲詳細</Link>
          <i className="fas fa-chevron-right"></i>
          <Link to={'/manager/selection/edit/' + this.props.selectionPostid}>曲情報編集</Link>
        </div>
      )
    } else {
      return (
        <div className="bread-navigation">
          <Link to="/">ホーム</Link>
          <i className="fas fa-chevron-right"></i>
          <Link to="/manager">お知らせ</Link>
          <i className="fas fa-chevron-right"></i>
          <Link to="/manager/selection">選曲アンケート</Link>
          <i className="fas fa-chevron-right"></i>
          <Link to="/manager/selection/add">候補曲投稿</Link>
        </div>
      )
    }
  }

  renderBackLink() {
    if (this.props.selectionPostid) {
      return (
        <li>
          <Link to={'/manager/selection/detail/' + this.props.selectionPostid}>
            <div className="inner">
              <Back />
              <span>候補曲詳細へ</span>
            </div>
          </Link>
        </li>
      )
    } else {
      return (
        <li>
          <Link to="/manager/selection">
            <div className="inner">
              <Back />
              <span>候補曲一覧へ</span>
            </div>
          </Link>
        </li>
      )
    }
  }

  renderAdditionalBackLink() {
    if (this.props.selectionPostid) {
      return (
        <div className={'box' + lib.pcClass(this.props.pc)}>
          <div className="back-link">
            <ul>
              <li>
                <Link to="/manager/selection">
                  <div className="inner">
                    <Back />
                    <span>候補曲一覧へ</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )
    }
  }

  renderTitle() {
    if (this.props.selectionPostid) {
      return <h2>曲情報を編集する</h2>
    } else {
      return <h2>候補曲を投稿する</h2>
    }
  }

  renderSendButton() {
    if (this.props.selectionPhase === 'getmusic' || libManager.admin(this.props.user)) {
      const buttonLabel = this.props.selectionPostid ? '更新する' : '投稿する'
      if (
        this.props.selectionPostid &&
        !(this.props.selectionPost.postUserid === this.props.user._id || libManager.admin(this.props.user))
      )
        return false
      return (
        <div className={'box manager-selection-post-button' + lib.pcClass(this.props.pc)}>
          <div onClick={() => this.props.sendPost()} className="send-button">
            {this.props.loadingSelectionPost ? (
              '読み込み中'
            ) : (
              <span>
                <i className="far fa-edit"></i>
                {buttonLabel}
              </span>
            )}
          </div>
        </div>
      )
    }
  }

  renderRemoveButton() {
    if ((this.props.selectionPhase === 'getmusic' || libManager.admin(this.props.user)) && this.props.selectionPostid) {
      if (!(this.props.selectionPost.postUserid === this.props.user._id || libManager.admin(this.props.user)))
        return false
      return (
        <div className={'box manager-selection-post-button' + lib.pcClass(this.props.pc)}>
          <div onClick={() => this.removeRequest()} className="send-button">
            {this.props.loadingSelectionRemovePost ? (
              '読み込み中'
            ) : (
              <span>
                <i className="far fa-edit"></i>削除する
              </span>
            )}
          </div>
        </div>
      )
    }
  }

  removeRequest() {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="alert">
            <h1>候補曲を削除します</h1>
            <p>この操作は取り消せません。</p>
            <div className="button-group">
              <button onClick={onClose}>キャンセル</button>
              <button
                onClick={() => {
                  this.props.sendPost(true)
                  onClose()
                }}
              >
                削除
              </button>
            </div>
          </div>
        )
      },
    })
  }

  render() {
    const showBreadNavigation = this.renderBreadNavigation()
    const showTitle = this.renderTitle()
    const showMessage = this.renderMessage()
    const showForm = this.renderForm()
    const showSendButton = this.renderSendButton()
    const showRemoveButton = this.renderRemoveButton()
    const showBackLink = this.renderBackLink()
    const showAdditionalBackLink = this.renderAdditionalBackLink()

    return (
      <React.Fragment>
        <div className={'contents-header' + lib.pcClass(this.props.pc)}>
          {showBreadNavigation}
          {showTitle}
        </div>

        <div className={'box manager-selection-guide' + lib.pcClass(this.props.pc)}>{showMessage}</div>

        {showForm}

        {showSendButton}

        {showRemoveButton}

        <div className={'box' + lib.pcClass(this.props.pc)}>
          <div className="back-link">
            <ul>{showBackLink}</ul>
          </div>
        </div>

        {showAdditionalBackLink}
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
