import clsx from 'clsx'
import { Keyboard, Lazy, Pagination } from 'swiper'
import { Swiper, SwiperProps, SwiperSlide, useSwiper } from 'swiper/react'
import { useStyle } from '../../../utilities/useStyle'
import { ReactComponent as WindsLogo } from '../../../assets/logo.svg'
import { ReactComponent as WindsIcon } from '../../../assets/hr.svg'
import { ReactComponent as LeftIcon } from '../../../assets/left.svg'
import { ReactComponent as RightIcon } from '../../../assets/right.svg'
import { getUserAgentType, getIsStandAlone } from '../../../utilities/userAgent'
import styles from './Tutorial.module.scss'

import 'swiper/css'
import 'swiper/css/keyboard'
import 'swiper/css/pagination'
import 'swiper/css/lazy'

export const Tutorial = () => {
  const pc = useStyle()
  const displayTutorial = false

  const setDisplayTutorial = (isOpen: boolean) => console.log('setDisplayTutorial')

  return (
    <div className={styles['tutorial-modal']}>
      <div className={clsx(styles['tutorial-modal-contents'], { [styles.open]: displayTutorial }, styles[pc])}>
        <div className={clsx(styles.header, styles[pc])}>
          {/* <div className='cancel' onClick={() => this.props.setDisplayEditScoreModal(false, undefined, undefined)}>キャンセル</div> */}
          <div className={styles.logo}>
            <WindsLogo />
          </div>
          <div className={clsx(styles.skip, styles[pc])} onClick={() => setDisplayTutorial(false)}>
            スキップ
          </div>
        </div>

        <div className={clsx(styles.contents, styles[pc])}>
          <div className={styles['contents-inner']}>
            <FirstTutorial />
          </div>
        </div>
      </div>
      <div className={clsx(styles['tutorial-modal-background'], { [styles.open]: displayTutorial })}></div>
    </div>
  )
}

type TutorialContent = {
  title: string
  subtitle?: string
  contents: string[]
  img?: string
  button?: boolean
  iosGuide?: boolean
}

const FirstTutorial = () => {
  const pc = useStyle()
  const setDisplayTutorial = (isOpen: boolean) => console.log('setDisplayTutorial')

  const standaloneTutorial: TutorialContent[] = [
    {
      title: 'ようこそ',
      subtitle: 'ウィンズアプリへ',
      contents: ['このアプリは会員専用ページのコンテンツをまとめたものです'],
      img: 'icon',
    },
    { title: 'はじめましょう', contents: ['このページは設定からいつでも表示できます'], img: 'icon', button: true },
  ]
  const iosTutorial: TutorialContent[] = [
    {
      title: 'ようこそ',
      subtitle: 'ウィンズアプリへ',
      contents: ['このアプリは会員専用ページのコンテンツをまとめたものです'],
      img: 'icon',
    },
    {
      title: 'まずはじめに',
      contents: ['全画面表示でのご利用を推奨しています', '下のメニューからホーム画面に追加してください'],
      iosGuide: true,
    },
    { title: 'はじめましょう', contents: ['このページは設定からいつでも表示できます'], img: 'icon', button: true },
  ]
  const androidTutorial: TutorialContent[] = [
    {
      title: 'ようこそ',
      subtitle: 'ウィンズアプリへ',
      contents: ['このアプリは会員専用ページのコンテンツをまとめたものです'],
      img: 'icon',
    },
    { title: 'まずはじめに', contents: ['メニューからホーム画面に追加してください'], img: 'icon' },
    { title: 'はじめましょう', contents: ['このページは設定からいつでも表示できます'], img: 'icon', button: true },
  ]
  const pcTutorial: TutorialContent[] = [
    {
      title: 'ようこそ',
      subtitle: 'ウィンズアプリへ',
      contents: ['このアプリは会員専用ページのコンテンツをまとめたものです'],
      img: 'icon',
    },
    { title: 'はじめましょう', contents: ['このページは設定からいつでも表示できます'], img: 'icon', button: true },
  ]
  const userAgentType = getUserAgentType()
  const tutorialContents =
    userAgentType === 'other'
      ? pcTutorial
      : getIsStandAlone()
      ? standaloneTutorial
      : userAgentType === 'Android'
      ? androidTutorial
      : iosTutorial

  const tutorialList = tutorialContents.map((each, i) => {
    const img =
      each.img === 'icon' ? (
        <div className={styles['winds-icon']}>
          <WindsIcon />
        </div>
      ) : (
        false
      )
    const subtitle = each.subtitle ? <h3>{each.subtitle}</h3> : false
    const contents = each.contents ? each.contents.map((text, i) => <p key={'contents' + i}>{text}</p>) : false
    const button = each.button ? (
      <div className={styles['start-button']} onClick={() => setDisplayTutorial(false)}>
        スタート
      </div>
    ) : (
      false
    )
    const iosGuide = each.iosGuide ? (
      <div className={styles['ios-guide']}>
        <div className={styles['ios-guide-inner']}>
          <h2>全画面で表示するには</h2>
          <p>
            Safariメニューの<span className={styles['share-icon']}></span>から
            <span className={styles['add-icon']}></span>
            を押してホーム画面に追加してください
          </p>
        </div>
      </div>
    ) : (
      false
    )
    return (
      <SwiperSlide key={i}>
        <div>
          <div className={clsx(styles['tutorial-each-page'], styles[pc])}>
            {img}
            <div className={styles.title}>
              <h2>{each.title}</h2>
              {subtitle}
            </div>
            {contents}
            {button}
            {iosGuide}
          </div>
        </div>
      </SwiperSlide>
    )
  })
  const params: SwiperProps = {
    spaceBetween: 0,
    slidesPerView: 1,
    grabCursor: true,
    keyboard: true,
    lazy: true,
    pagination: true,
    modules: [Keyboard, Lazy, Pagination],
    initialSlide: 0,
    preloadImages: false,
    style: {
      // @ts-ignore
      '--swiper-pagination-color': '#B60005',
    },
  }
  return (
    <div className={styles['tutorial-slide']}>
      <Swiper {...params}>
        {tutorialList}
        <NextButton />
        <PrevButton />
      </Swiper>
    </div>
  )
}

const NextButton = () => {
  const pc = useStyle()
  const swiper = useSwiper()
  return (
    <div className={clsx(styles['swiper-custom-button-next'], styles[pc])} onClick={() => swiper.slideNext()}>
      <RightIcon />
    </div>
  )
}

const PrevButton = () => {
  const pc = useStyle()
  const swiper = useSwiper()
  return (
    <div className={clsx(styles['swiper-custom-button-prev'], styles[pc])} onClick={() => swiper.slidePrev()}>
      <LeftIcon />
    </div>
  )
}
