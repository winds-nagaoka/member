import { useState } from 'react'
import { ContentsBox, ContentsLoading } from '../../../components/ContentsBox'
import { ScoreItem, useScoreList } from '../api/getScoreList'
import { ReactComponent as SearchIcon } from '../../../assets/search.svg'
import { ReactComponent as CloseIcon } from '../../../assets/close-circle.svg'
import styles from './ScoreList.module.scss'
import clsx from 'clsx'

const LOAD_MORE = 10

export const ScoreList = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [loadMore, setLoadMore] = useState(false)
  const scoreListQuery = useScoreList(searchQuery)

  if (scoreListQuery.isLoading) {
    return <ContentsLoading />
  }

  if (!scoreListQuery.data) {
    return null
  }

  return (
    <ContentsBox>
      <div className={styles.score}>
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ScoreCount isSearch={!!searchQuery} scoreList={scoreListQuery.data.list} />
        {scoreListQuery.data.list.map((scoreItem, index) => {
          if (!loadMore && index > LOAD_MORE) {
            return null
          }
          if (scoreItem.status === 'false') {
            return null
          }
          const composer = scoreItem.composer.length === 0 ? '' : scoreItem.composer.join(', ')
          const arranger = scoreItem.arranger.length === 0 ? '' : scoreItem.arranger.join(', ')
          const bar = composer === '' || arranger === '' ? '' : <span className="bar">/</span>

          return (
            <div
              key={scoreItem._id}
              className={styles['score-list']}
              onTouchStart={() => {}}
              onClick={() => {
                // setDisplayScoreModal(true, each)
              }}
            >
              <div className={styles.content}>
                {/* {boxInfo} */}
                <div className={styles['title-ja']}>
                  <span>{scoreItem.titleJa}</span>
                </div>
                <div className={styles['title-en']}>
                  <span>{scoreItem.titleEn}</span>
                </div>
                <div className={styles['composer-arranger']}>
                  <span>
                    <span>{composer}</span>
                    {bar}
                    <span>{arranger}</span>
                  </span>
                </div>
              </div>
            </div>
          )
        })}
        <EndLabel
          scoreList={scoreListQuery.data.list}
          isSearch={!!searchQuery}
          loadMore={loadMore}
          setLoadMore={setLoadMore}
        />
      </div>
    </ContentsBox>
  )
}

const EndLabel = ({
  scoreList,
  isSearch,
  loadMore,
  setLoadMore,
}: {
  scoreList: ScoreItem[]
  isSearch: boolean
  loadMore: boolean
  setLoadMore: (loadMore: boolean) => void
}) => {
  if (scoreList.length > LOAD_MORE && !loadMore) {
    return (
      <div onClick={() => setLoadMore(true)} className={styles['score-more']}>
        <span>すべての楽譜を表示</span>
      </div>
    )
  }
  return (
    <div className={styles['end-label']}>
      {scoreList.length === 0 && !isSearch && 'データはありません'}
      {scoreList.length === 0 && isSearch && 'みつかりませんでした'}
      {loadMore && <div className={styles['end-label']}>これ以上データはありません</div>}
    </div>
  )
}

const SearchBox = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string
  setSearchQuery: (searchQuery: string) => void
}) => {
  const searchBarButtonClass = searchQuery
    ? styles['search-bar-button']
    : clsx(styles['search-bar-button'], styles.hidden)
  return (
    <div className={styles['search-bar']}>
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

const ScoreCount = ({ isSearch, scoreList }: { isSearch: boolean; scoreList: ScoreItem[] }) => {
  const title = isSearch ? '該当' : '楽譜'
  return (
    <div className={styles['score-count']}>
      <div>
        {scoreList ? <span>{title}</span> : false}
        {scoreList ? <span>{scoreList.length}</span> : false}
        {scoreList ? <span>件</span> : false}
      </div>
    </div>
  )
}
