import { Link, useParams } from 'react-router-dom'
import clsx from 'clsx'
import { useConcertList } from '../api/getConcertList'
import styles from './ConcertNavigation.module.scss'
import { useStyle } from '../../../utilities/useStyle'
import { ReactComponent as NextIcon } from '../../../assets/right-circle.svg'
import { ReactComponent as PrevIcon } from '../../../assets/left-circle.svg'

export const ConcertNavigation = () => {
  const pc = useStyle()
  const { concertId } = useParams()
  const concertListQuery = useConcertList()
  if (concertListQuery.isLoading) {
    return null
  }
  if (!concertListQuery.data) {
    return null
  }

  const concertItem = concertListQuery.data.list.find((item) => item.id === concertId)?.detail
  const concertType = concertItem?.type || ''
  const concertList = [...concertListQuery.data.list.filter((item) => item.type === concertType)].reverse()
  const concertIndex = concertList.findIndex((concert) => concert.id === concertId)

  const prevConcertId = concertList[concertIndex - 1]?.id || null
  const prevClass = clsx(styles.prev, styles[concertType])
  const prevLink = prevConcertId ? (
    <Link to={'/archive/overview/' + prevConcertId} className={prevClass}>
      次<NextIcon />
    </Link>
  ) : (
    <span className={prevClass}>
      次<NextIcon />
    </span>
  )

  const nextConcertId = concertList[concertIndex + 1]?.id || null
  const nextClass = clsx(styles.next, styles[concertType])
  const nextLink = nextConcertId ? (
    <Link to={'/archive/overview/' + nextConcertId} className={nextClass}>
      <PrevIcon />前
    </Link>
  ) : (
    <span className={nextClass}>
      <PrevIcon />前
    </span>
  )
  return (
    <div className={clsx(styles.title, styles[pc])}>
      {nextLink}
      <h2>{concertItem?.title}</h2>
      {prevLink}
    </div>
  )
}
