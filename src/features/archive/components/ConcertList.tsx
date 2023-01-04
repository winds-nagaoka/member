import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { ConcertItem, useConcertList } from '../api/getConcertList'
import { ContentsBox, ContentsLoading } from '../../../components/ContentsBox'
import { ReactComponent as SearchIcon } from '../../../assets/search.svg'
import { ReactComponent as RightIcon } from '../../../assets/right.svg'
import { ReactComponent as CloseIcon } from '../../../assets/close-circle.svg'
import { ReactComponent as PlayIcon } from '../../../assets/play-circle.svg'
import { ReactComponent as VideoIcon } from '../../../assets/video.svg'
import { ReactComponent as VideoOffIcon } from '../../../assets/video-off.svg'
import styles from './ConcertList.module.scss'
import { useState } from 'react'
import { escapeReg } from '../../../utilities/escape'

export const ConcertList = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [displayMain, setDisplayMain] = useState(true)
  const [displayMini, setDisplayMini] = useState(true)
  const [displayOther, setDisplayOther] = useState(true)

  const concertListQuery = useConcertList()
  if (concertListQuery.isLoading) {
    return <ContentsLoading />
  }
  if (!concertListQuery.data) {
    return null
  }

  const concertList = [...concertListQuery.data.list].reverse()
  return (
    <ContentsBox>
      <div className={styles['archive-list']}>
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <SearchResult searchQuery={searchQuery} concertList={concertList} />
        <ConcertSwitch
          searchQuery={searchQuery}
          displayMain={displayMain}
          setDisplayMain={setDisplayMain}
          displayMini={displayMini}
          setDisplayMini={setDisplayMini}
          displayOther={displayOther}
          setDisplayOther={setDisplayOther}
        />
        {!searchQuery &&
          concertList.map((concertItem) => {
            const { detail, type } = concertItem
            if (type === 'main' && !displayMain) {
              return null
            }
            if (type === 'mini' && !displayMini) {
              return null
            }
            if (type === 'other' && !displayOther) {
              return null
            }
            return (
              <Link key={concertItem.id} to={`/archive/overview/${concertItem.id}`} className={styles['concert-item']}>
                <div className={clsx(styles.info, styles[detail.type])}>
                  <span>{detail.title}</span>
                  <span className={styles.date}>{detail.time.date}</span>
                </div>
                <div className={styles.icon}>
                  <RightIcon />
                </div>
              </Link>
            )
          })}
      </div>
    </ContentsBox>
  )
}

const SearchBox = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string
  setSearchQuery: (searchQuery: string) => void
}) => {
  const searchBarButtonClass = searchQuery ? styles['search-bar-button'] : styles['search-bar-button hidden']
  return (
    <div className={clsx(styles['search-bar'], { [styles['search-mode']]: !!searchQuery })}>
      <div className={styles['search-frame']}>
        <div className={styles['search-box']}>
          <div className={styles['search-bar-icon']}>
            <SearchIcon />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            // リセットしたらカーソルを検索inputに戻す処理を削除
            placeholder="検索"
          />
          <div onClick={() => setSearchQuery('')} className={searchBarButtonClass}>
            <CloseIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

const SearchResult = ({ searchQuery, concertList }: { searchQuery: string; concertList: ConcertItem[] }) => {
  if (!searchQuery) {
    return null
  }
  const searchResult = search(searchQuery, concertList)
  if (searchResult === null) {
    return null
  }
  return (
    <div className={styles['search-result']}>
      {searchResult.map((item, index) => {
        if (!item) {
          return null
        }
        const { concert, track } = item
        const audioHandler = () => {}
        return (
          <div key={`${concert.id}-${track.title}-${index}`} className={styles['search-result-item']}>
            <div className={styles[concert.type]}>
              <span className={styles['concert-title']}>{concert.title}</span>
              <span className={styles.title}>{track.title}</span>
              {track.composer ? (
                track.arranger ? (
                  <span className={styles.composer}>
                    {track.composer}
                    {track.composer.match(/民謡/) ? '' : '作曲'}
                    <span>/</span>
                    {track.arranger}編曲
                  </span>
                ) : (
                  <span className={styles.composer}>{track.composer}</span>
                )
              ) : track.arranger ? (
                <span className={styles.composer}>{track.arranger}編曲</span>
              ) : (
                ''
              )}
            </div>
            <div>
              <span
                onClick={audioHandler}
                className={clsx(styles.audio, { [styles.on]: !!track.audio }, styles[concert.type])}
              >
                {!!track.audio ? <PlayIcon /> : <CloseIcon />}
              </span>
              <span className={clsx(styles.video, { [styles.on]: !!track.video }, styles[concert.type])}>
                {!!track.video ? <VideoIcon /> : <VideoOffIcon />}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const search = (searchQuery: string, concertList: ConcertItem[]) => {
  if (!searchQuery) {
    return null
  }
  return concertList
    .map((concertItem) => {
      const concertDetail = concertItem.detail
      return concertDetail.data.map((track) => {
        const s = new RegExp(escapeReg(searchQuery), 'i')
        // 演奏会名で一致
        if (concertDetail.title.search(s) >= 0) return { concert: concertDetail, track }
        // タイトルで一致
        if (track.title.search(s) >= 0) return { concert: concertDetail, track }
        // サブタイトルで一致
        // if (track.addtitle.search(s) >= 0) return {concert: concert, track}
        // 作曲者名で一致
        if ((track.composer ? track.composer : '').search(s) >= 0) return { concert: concertDetail, track }
        // 編曲者名で一致
        if ((track.arranger ? track.arranger : '').search(s) >= 0) return { concert: concertDetail, track }
        return null
      })
    })
    .flat()
}

const ConcertSwitch = ({
  searchQuery,
  displayMain,
  setDisplayMain,
  displayMini,
  setDisplayMini,
  displayOther,
  setDisplayOther,
}: {
  searchQuery: string
  displayMain: boolean
  setDisplayMain: (displayMain: boolean) => void
  displayMini: boolean
  setDisplayMini: (displayMini: boolean) => void
  displayOther: boolean
  setDisplayOther: (displayOther: boolean) => void
}) => {
  if (searchQuery) {
    return null
  }
  return (
    <div className={styles['concert-switch']}>
      <div
        className={clsx(styles.switch, styles.main, { [styles.on]: displayMain })}
        onClick={() => setDisplayMain(!displayMain)}
      >
        定期演奏会
      </div>
      <div
        className={clsx(styles.switch, styles.mini, { [styles.on]: displayMini })}
        onClick={() => setDisplayMini(!displayMini)}
      >
        ミニコンサート
      </div>
      <div
        className={clsx(styles.switch, styles.other, { [styles.on]: displayOther })}
        onClick={() => setDisplayOther(!displayOther)}
      >
        その他
      </div>
    </div>
  )
}
