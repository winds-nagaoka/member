import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'
import { getConcertList, setConcertid, getPhotoList, resetPhotoList, setDisplayPhotoSlideModal } from '../../../../Actions/Archive'

import Back from '../../../../Library/Icons/Back'
import * as libArchive from '../Library/Library'
import * as lib from '../../../../Library/Library'

import './Photo.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,

    concertList: state.archive.concertList,
    concertid: state.archive.concertid,

    loadingPhoto: state.archive.loadingPhoto,

    photoList: state.archive.photoList,
    photoUrl: state.archive.photoUrl,
    photoBaseSrcThumbnail: state.archive.photoBaseSrcThumbnail
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
    getConcertList () {
      dispatch(getConcertList())
    },
    setConcertid (id) {
      dispatch(setConcertid(id))
    },
    getPhotoList () {
      dispatch(getPhotoList())
    },
    resetPhotoList () {
      dispatch(resetPhotoList())
    },
    setDisplayPhotoSlideModal (displayPhotoSlideModal, photoNumber) {
      dispatch(setDisplayPhotoSlideModal(displayPhotoSlideModal, photoNumber))
    }
  }
}

class Photo extends Component {
  constructor (props) {
    super(props)
    const { params } = this.props.match
    const id = params.id ? params.id : ''
    this.props.setConcertid(id)
    id !== '' ? this.props.setBackNavigation(true, ('/archive/overview/' + id)) : this.props.setBackNavigation(true, ('/archive'))
  }

  UNSAFE_componentWillMount () {
    this.props.getPhotoList()
  }

  // 直接アクセスしたときに必要
  componentDidMount () {
    this.props.setNavigationTitle('写真')
    // パンくずリスト用
    this.props.getConcertList()
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { params } = nextProps.match
    params.id ? this.props.setConcertid(params.id) : false
  }

  componentWillUnmount () {
    this.props.resetPhotoList()
  }

  openPhoto (i) {
    this.props.setDisplayPhotoSlideModal(true, i)
  }

  renderPhoto () {
    if (this.props.loadingPhoto || !this.props.photoList) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    const photoList = this.props.photoList.map((each, i) => {
      return (
        <div key={i} className='each-thumbnail' onClick={() => this.openPhoto(i)}>
          <img src={this.props.photoUrl + this.props.photoBaseSrcThumbnail + each} className='thumbnail-photo' lazyload="on" />
        </div>
      )
    })
    return (
      <div className='thumbnail-list'>
        {photoList}
      </div>
    )
  }

  renderBreadNavigation () {
    if (!this.props.concertList || !this.props.concertid) {
      return (
        <div className='bread-navigation'>
          <Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i>
          <Link to='/archive'>アーカイブ</Link><i className="fas fa-chevron-right"></i>
          <i className='fas fa-spinner fa-pulse'></i><i className="fas fa-chevron-right"></i>
          <i className='fas fa-spinner fa-pulse'></i>
        </div>
      )
    }
    return (
      <div className='bread-navigation'>
        <Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i>
        <Link to='/archive'>アーカイブ</Link><i className="fas fa-chevron-right"></i>
        <Link to={'/archive/overview/' + this.props.concertid}>{libArchive.getConcertTitle(this.props.concertid, this.props.concertList)}</Link><i className="fas fa-chevron-right"></i>
        <Link to={'/archive/photo/' + this.props.concertid}>写真</Link>
      </div>
    )
  }

  render () {
    const showBreadNavigation = this.renderBreadNavigation()
    const showPhoto = this.renderPhoto()

    return (
      <React.Fragment>
        <div className={'contents-header' + lib.pcClass(this.props.pc)}>
          {showBreadNavigation}
          <h2>写真</h2>
          <p>過去のウィンズの活動履歴を確認できます</p>
        </div>

        <div className={'box archive-photo' + lib.pcClass(this.props.pc)}>
          {showPhoto}
        </div>

        <div className={'box' + lib.pcClass(this.props.pc)}>
          <div className='back-link'>
            <ul>
              <li><Link to='/archive'><div className='inner'><Back /><span>一覧へ</span></div></Link></li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Photo)
