import React, { Component } from 'react'

import { connect } from 'react-redux'

import Swiper from 'react-id-swiper'

import { setDisplayTutorial } from '../../../Actions/Tutorial'

import * as lib from '../../../Library/Library'

import WindsLogo from '../../../Asset/logo.svg'
import WindsIcon from '../../../Asset/hr.svg'

import './Tutorial.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,

    userAgent: state.tutorial.userAgent,
    standalone: state.tutorial.standalone,

    displayTutorial: state.tutorial.displayTutorial,
    tutorialMode: state.tutorial.tutorialMode
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

  renderiosGuide () {
    return (
      <div className='ios-guide'>
        <div className='ios-guide-inner'>
          <h2>全画面で表示するには</h2>
          <p>Safariメニューの<span className='share-icon'></span>から<span className='add-icon'></span>を押してホーム画面に追加してください</p>
        </div>
      </div>
    )
  }

  renderFirstTutorial () {
    const standaloneTutorial = [
      {title: 'ようこそ', subtitle: 'ウィンズアプリへ', contents: ['このアプリは会員専用ページのコンテンツをまとめたものです'], img: 'icon'},
      {title: 'はじめましょう', contents: ['このページは設定からいつでも表示できます'], img: 'icon', button: true}
    ]
    const iosTutorial = [
      {title: 'ようこそ', subtitle: 'ウィンズアプリへ', contents: ['このアプリは会員専用ページのコンテンツをまとめたものです'], img: 'icon'},
      {title: 'まずはじめに', contents: ['全画面表示でのご利用を推奨しています', '下のメニューからホーム画面に追加してください'], iosGuide: true},
      {title: 'はじめましょう', contents: ['このページは設定からいつでも表示できます'], img: 'icon', button: true},
    ]
    const androidTutorial = [
      {title: 'ようこそ', subtitle: 'ウィンズアプリへ', contents: ['このアプリは会員専用ページのコンテンツをまとめたものです'], img: 'icon'},
      {title: 'まずはじめに', contents: ['メニューからホーム画面に追加してください'], img: 'icon'},
      {title: 'はじめましょう', contents: ['このページは設定からいつでも表示できます'], img: 'icon', button: true},
    ]
    const pcTutorial = [
      {title: 'ようこそ', subtitle: 'ウィンズアプリへ', contents: ['このアプリは会員専用ページのコンテンツをまとめたものです'], img: 'icon'},
      {title: 'はじめましょう', contents: ['このページは設定からいつでも表示できます'], img: 'icon', button: true}
    ]
    const tutorialContents = this.props.userAgent === 'other' ? pcTutorial : (this.props.standalone ? standaloneTutorial : (this.props.userAgent === 'Android' ? androidTutorial : iosTutorial))
    const tutorialList = tutorialContents.map((each, i) => {
      const img = each.img === 'icon' ? <div className='winds-icon'><WindsIcon /></div> : false
      const subtitle = each.subtitle ? <h3>{each.subtitle}</h3> : false
      const contents = each.contents ? each.contents.map((text, i) => <p key={'contents' + i}>{text}</p>) : false
      const button = each.button ? <div className='start-button' onClick={() => this.props.setDisplayTutorial(false, undefined)}>スタート</div> : false
      const iosGuide = each.iosGuide ? this.renderiosGuide() : false
      return (
        <div key={i}>
          <div className={'tutorial-each-page' + lib.pcClass(this.props.pc)}>
            {img}
            <div className='title'>
              <h2>{each.title}</h2>
              {subtitle}
            </div>
            {contents}
            {button}
            {iosGuide}
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
      initialSlide: 0,
      // 次のスライドがどれくらい見えていたら次へ行くか
      longSwipesRatio: 0.4,
      preloadImages: false,
      lazy: true,

      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    }
    return (
      <div className='tutorial-slide'>
        <Swiper {...params}>
          {tutorialList}
        </Swiper>
      </div>
    )
  }

  renderTutorialSlide () {
    if (!this.props.tutorialMode) return
    if (this.props.tutorialMode === 'first') return this.renderFirstTutorial()
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