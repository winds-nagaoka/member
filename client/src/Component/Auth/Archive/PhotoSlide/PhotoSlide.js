import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import Swiper from 'react-id-swiper'
// import Swiper from 'swiper'

import { setBackNavigation } from '../../../../Actions/Navigation'
import { setDisplayPhotoSlideModal } from '../../../../Actions/Archive'

import * as libArchive from '../Library/Library'
import * as lib from '../../../../Library/Library'

import './PhotoSlide.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,

    concertid: state.archive.concertid,
    loadingPhoto: state.archive.loadingPhoto,

    photoList: state.archive.photoList,
    photoUrl: state.archive.photoUrl,
    photoBaseSrcOriginal: state.archive.photoBaseSrcOriginal,

    displayPhotoSlideModal: state.archive.displayPhotoSlideModal,
    photoNumber: state.archive.photoNumber,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setDisplayPhotoSlideModal (displayPhotoSlideModal, photoNumber) {
      dispatch(setDisplayPhotoSlideModal(displayPhotoSlideModal, photoNumber))
    }
  }
}

class PhotoSlide extends Component {

  renderPhotoSlide () {
    if (this.props.loadingPhoto || !this.props.photoList) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    console.log(this.props.photoList)
    const photoList = this.props.photoList.map((each, i) => {
      return (
        <div key={i}>
          <div className='each-original' onClick={() => this.props.setDisplayPhotoSlideModal(false, undefined)}>
            <img src={this.props.photoUrl + this.props.photoBaseSrcOriginal + each} className='thumbnail-photo' lazyload="on" onClick={(e) => e.stopPropagation()} />
          </div>
        </div>
      )
    })
    const params = {
      spaceBetween: 45,
      grabCursor: true,
      // カーソルキーでの操作
      keyboard: true,
      // スライドごとにwrapperのサイズを変更
      watchSlidesProgress: true,
      // 最初のスライドを指定
      // activeSlideKey: this.props.photoNumber.toString()
      initialSlide: this.props.photoNumber,
      // 次のスライドがどれくらい見えていたら次へ行くか
      longSwipesRatio: 0.4,
    }
    console.log('num',this.props.photoNumber)
    return (
      <div className='archive-photo-slide'>
        <Swiper {...params}>
          {photoList}
        </Swiper>
      </div>
    )
  }

  render () {
    if (!this.props.displayPhotoSlideModal) return <div></div>

    const showPhotoSlide = this.renderPhotoSlide()
    const displayPhotoSlideModalClass = this.props.displayPhotoSlideModal ? ' open' : ''

    return (
      <div className='photo-slide-modal'>
        <div className={'photo-slide-modal-contents' + displayPhotoSlideModalClass + lib.pcClass(this.props.pc)}>
          {showPhotoSlide}
        </div>
        <div className={'photo-slide-modal-background' + displayPhotoSlideModalClass} onClick={() => this.props.setDisplayPhotoSlideModal(false, undefined)}></div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoSlide)
