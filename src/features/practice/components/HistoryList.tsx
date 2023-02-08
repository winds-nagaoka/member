import clsx from 'clsx'
import { ContentsBox, ContentsLoading, Text, TitleFrame } from '../../../components/ContentsBox'
import { useStyle } from '../../../utilities/useStyle'
import { useHistoryList } from '../api/getHistoryList'
import styles from './HistoryList.module.scss'

export const HistoryList = () => {
  const pc=useStyle()
  const historyListQuery = useHistoryList()

  if (historyListQuery.isLoading) {
    return <ContentsLoading />
  }

  if (!historyListQuery.data) {
    return null
  }

  return (
    <ContentsBox>
      <div className={styles.history}>
        <ul>
          {historyListQuery.data.list.length === 0 && (
            <TitleFrame>
              <Text>みつかりませんでした</Text>
            </TitleFrame>
          )}
          {historyListQuery.data.list.map((historyItem,index) => {
            const practice = historyItem.detail
            const playRequest = practice.recordStatus
              ? () => {} // this.props.practicePlayRequest(practice.id, 0, 0, true)
              : () => {}
            const icon = practice.recordStatus ? (
              <i className="fas fa-play-circle"></i>
            ) : (
              <i className="far fa-times-circle"></i>
            )
            const date = 'date' in practice.time ? <div className={styles.date}>{practice.time.date}</div> : false
            const place = 'place' in practice ? <div className={styles.place}>{practice.place}</div> : false
            const label = 'label' in practice ? <label>{practice.label}</label> : false
            return (
              <li
                key={`history-${index}`}
                className={clsx(styles["each-history"],{[styles["has-audio"]]:practice.recordStatus},{[styles["no-audio"]]:!practice.recordStatus},styles[pc])}
                onClick={playRequest}
              >
                <div className={styles.icon}>{icon}</div>
                <div className={styles.info}>
                  {place}
                  {date}
                </div>
                <div className={styles.label}>{label}</div>
              </li>
            )
          })}
        </ul>
      </div>
    </ContentsBox>
  )
}
