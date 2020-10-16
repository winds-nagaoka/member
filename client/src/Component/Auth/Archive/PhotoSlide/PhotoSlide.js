import React, { Component } from 'react'

import { connect } from 'react-redux'

import Swiper from 'react-id-swiper'
// import Swiper from 'swiper'

import { setDisplayPhotoSlideModal } from '../../../../Actions/Archive'

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
    setDisplayPhotoSlideModal(displayPhotoSlideModal, photoNumber) {
      dispatch(setDisplayPhotoSlideModal(displayPhotoSlideModal, photoNumber))
    },
  }
}

class PhotoSlide extends Component {
  renderPhotoSlide() {
    if (this.props.loadingPhoto || !this.props.photoList)
      return (
        <div className="loading">
          <div className="loading1"></div>
          <div className="loading2"></div>
          <div className="loading3"></div>
        </div>
      )
    const photoList = this.props.photoList.map((each, i) => {
      return (
        <div key={i}>
          <div className="each-original" onClick={() => this.props.setDisplayPhotoSlideModal(false, undefined)}>
            {/* <img src={this.props.photoUrl + this.props.photoBaseSrcOriginal + each} onClick={(e) => e.stopPropagation()} /> */}
            <img
              data-src={this.props.photoUrl + this.props.photoBaseSrcOriginal + each}
              onClick={(e) => e.stopPropagation()}
              className="swiper-lazy"
            />
            {/* <div className='swiper-lazy-preloader'></div> */}
            <div className="swiper-lazy-preloader">
              <i className="fas fa-spinner fa-pulse"></i>
            </div>
            {/* <div className="swiper-lazy-preloader"><div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div></div> */}
          </div>
        </div>
      )
    })
    const params = {
      spaceBetween: 45,
      grabCursor: true,
      navigation: {
        nextEl: '.swiper-custom-button-next',
        prevEl: '.swiper-custom-button-prev',
      },
      renderPrevButton: () => (
        <CustomButton className="swiper-custom-button-prev" pc={this.props.pc}>
          <i className="fas fa-chevron-left"></i>
        </CustomButton>
      ),
      renderNextButton: () => (
        <CustomButton className="swiper-custom-button-next" pc={this.props.pc}>
          <i className="fas fa-chevron-right"></i>
        </CustomButton>
      ),

      // カーソルキーでの操作
      keyboard: true,
      // スライドごとにwrapperのサイズを変更
      watchSlidesProgress: true,
      // 最初のスライドを指定
      // activeSlideKey: this.props.photoNumber.toString()
      initialSlide: this.props.photoNumber,
      // 次のスライドがどれくらい見えていたら次へ行くか
      longSwipesRatio: 0.4,
      preloadImages: false,
      // preloadImages: false,
      lazy: true,
      // lazy: {
      //   loadPrevNext: true,
      //   loadPrevNextAmount: 10,
      //   // スライド開始時にロードする
      //   // loadOnTransitionStart: false,
      // },
      // preloaderClass: 'swiper-lazy-preloader-loading'
    }
    return (
      <div className="archive-photo-slide">
        <Swiper {...params}>{photoList}</Swiper>
      </div>
    )
  }

  render() {
    if (!this.props.displayPhotoSlideModal) return <div></div>

    const showPhotoSlide = this.renderPhotoSlide()
    const displayPhotoSlideModalClass = this.props.displayPhotoSlideModal ? ' open' : ''

    return (
      <div className="photo-slide-modal">
        <div className={'photo-slide-modal-contents' + displayPhotoSlideModalClass + lib.pcClass(this.props.pc)}>
          <div
            className="photo-slide-modal-close"
            onClick={() => this.props.setDisplayPhotoSlideModal(false, undefined)}
          >
            &times;
          </div>
          {showPhotoSlide}
        </div>
        <div
          className={'photo-slide-modal-background' + displayPhotoSlideModalClass}
          onClick={() => this.props.setDisplayPhotoSlideModal(false, undefined)}
        ></div>
      </div>
    )
  }
}

const CustomButton = ({ className, children, pc }) => {
  return <div className={className + lib.pcClass(pc)}>{children}</div>
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoSlide)
