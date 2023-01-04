import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { ContentsBox, ContentsLoading } from '../../../components/ContentsBox'
import { useConcertList } from '../api/getConcertList'
import { ReactComponent as SearchIcon } from '../../../assets/search.svg'
import { ReactComponent as RightIcon } from '../../../assets/right.svg'
import { ReactComponent as ResetIcon } from '../../../assets/close-circle.svg'
import styles from './ConcertList.module.scss'
import { useState } from 'react'

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
        <ConcertSwitch
          searchQuery={searchQuery}
          displayMain={displayMain}
          setDisplayMain={setDisplayMain}
          displayMini={displayMini}
          setDisplayMini={setDisplayMini}
          displayOther={displayOther}
          setDisplayOther={setDisplayOther}
        />
        {concertList.map((concertItem) => {
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
            <ResetIcon />
          </div>
        </div>
      </div>
    </div>
  )
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
