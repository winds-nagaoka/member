import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import Swiper from 'react-id-swiper'

import { setDisplayTutorial } from '../../../Actions/Tutorial'

import * as lib from '../../../Library/Library'

import WindsLogo from '../../../Asset/logo.svg'

import './Tutorial.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,

    userAgent: state.tutorial.userAgent,
    standalone: state.tutorial.standalone,

    displayTutorial: state.tutorial.displayTutorial,
    tutorialMode: state.tutorial.displayTutorial
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setDisplayTutorial (displayTutorial, tutorialMode) {
      dispatch(setDisplayTutorial(displayTutorial, tutorialMode))
    }
  }
}

class Tutorial extends Component {

  renderTutorialSlide () {
    if (!this.props.tutorialMode) return
    const standaloneTutorial = [
      {title: 'ようこそ', contents: 'ウィンズアプリへ'},
      {title: 'ページ2', contents: 'ホーム画面への追加ありがとうございます'},
      {title: 'ページ3', contents: 'ページ3です'}
    ]
    const iosTutorial = [
      {title: 'ようこそ', contents: 'ウィンズアプリへ'},
      {title: 'iOS', contents: 'メニューからホーム画面に追加してください'},
      {title: 'ページ3', contents: 'ページ3です'},
    ]
    const androidTutorial = [
      {title: 'ようこそ', contents: 'ウィンズアプリへ'},
      {title: 'Android', contents: 'メニューからホーム画面に追加してください'},
      {title: 'ページ3', contents: 'ページ3です'},
    ]
    const pcTutorial = [
      {title: 'ようこそ', contents: 'ウィンズアプリへ'},
      {title: 'ページ2', contents: 'PCです'},
      {title: 'ページ3', contents: 'ページ3です'}
    ]
    const tutorialContents = this.props.userAgent === 'other' ? pcTutorial : (this.props.standalone ? standaloneTutorial : (this.props.userAgent === 'Android' ? androidTutorial : iosTutorial))

    const tutorialList = tutorialContents.map((each, i) => {
      return (
        <div key={i}>
          {/* <div className='tutorial-each-page' onClick={() => this.props.setDisplayTutorial(false, undefined)}> */}
          <div className={'tutorial-each-page' + lib.pcClass(this.props.pc)}>
            <h2>{each.title}</h2>
            <p>{each.contents}</p>
          </div>
        </div>
      )
    })
    const params = {
      // spaceBetween: 45,
      grabCursor: true,
      navigation: {
        nextEl: '.swiper-custom-button-next',
        prevEl: '.swiper-custom-button-prev'
      },
      renderPrevButton: () => <CustomButton className="swiper-custom-button-prev" pc={this.props.pc}><i className="fas fa-chevron-left"></i></CustomButton>,
      renderNextButton: () => <CustomButton className="swiper-custom-button-next" pc={this.props.pc}><i className="fas fa-chevron-right"></i></CustomButton>,
      
      // カーソルキーでの操作
      keyboard: true,
      // スライドごとにwrapperのサイズを変更
      watchSlidesProgress: true,
      // 最初のスライドを指定
      // activeSlideKey: this.props.photoNumber.toString()
      initialSlide: 0,
      // 次のスライドがどれくらい見えていたら次へ行くか
      longSwipesRatio: 0.4,
      preloadImages: false,
      // preloadImages: false,
      lazy: true,

      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
      // lazy: {
      //   loadPrevNext: true,
      //   loadPrevNextAmount: 10,
      //   // スライド開始時にロードする
      //   // loadOnTransitionStart: false,
      // },
      // preloaderClass: 'swiper-lazy-preloader-loading'
    }
    return (
      <div className='tutorial-slide'>
        <Swiper {...params}>
          {tutorialList}
        </Swiper>
      </div>
    )
  }

  render () {
    if (!this.props.displayTutorial) return <div></div>

    const showTutorialSlide = this.renderTutorialSlide()
    const displayTutorialClass = this.props.displayTutorial ? ' open' : ''

    return (
      <div className='tutorial-modal'>
        <div className={'tutorial-modal-contents' + displayTutorialClass + lib.pcClass(this.props.pc)}>

          <div className={'header' + lib.pcClass(this.props.pc)}>
            {/* <div className='cancel' onClick={() => this.props.setDisplayEditScoreModal(false, undefined, undefined)}>キャンセル</div> */}
            <div className='logo'><WindsLogo /></div>
            <div className={'skip' + lib.pcClass(this.props.pc)} onClick={() => this.props.setDisplayTutorial(false, undefined)}>スキップ</div>
          </div>

          <div className={'contents' + lib.pcClass(this.props.pc)}>
            <div className='contents-inner'>
              {showTutorialSlide}
            </div>
          </div>

        </div>
        <div className={'tutorial-modal-background' + displayTutorialClass}></div>
      </div>
    )
  }
}

const CustomButton = ({className, children, pc}) => {
  return (
    <div className={className + lib.pcClass(pc)}>
      {children}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial)