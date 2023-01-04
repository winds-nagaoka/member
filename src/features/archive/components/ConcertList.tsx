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
        {concertList.map((concertItem) => {
          const { detail } = concertItem
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
