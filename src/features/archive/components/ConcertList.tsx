import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { ContentsBox, ContentsLoading } from '../../../components/ContentsBox'
import { useConcertList } from '../api/getConcertList'
import { ReactComponent as RightIcon } from '../../../assets/right.svg'
import styles from './ConcertList.module.scss'

export const ConcertList = () => {
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
