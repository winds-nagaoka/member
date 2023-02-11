import clsx from 'clsx'
import { ContentsBox, ContentsLoading, Text, TitleFrame } from '../../../components/ContentsBox'
import { useStyle } from '../../../utilities/useStyle'
import { useHistoryList } from '../api/getHistoryList'
import { useMediaStore } from '../../../stores/media'
import styles from './HistoryList.module.scss'

export const HistoryList = () => {
  const pc = useStyle()
  const historyListQuery = useHistoryList()
  const { setTrack } = useMediaStore()

  if (historyListQuery.isLoading) {
    return <ContentsLoading />
  }

  if (!historyListQuery.data) {
    return null
  }

  const historyList=[...historyListQuery.data.list].reverse()

  return (
    <ContentsBox>
      <div className={styles.history}>
        <ul>
          {historyList.length === 0 && (
            <TitleFrame>
              <Text>みつかりませんでした</Text>
            </TitleFrame>
          )}
          {historyList.map((historyItem, index) => {
            const practice = historyItem.detail
            const playRequest = practice.recordStatus ? () => setTrack(0, practice.id, 'practice') : () => {}
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
                className={clsx(
                  styles['each-history'],
                  { [styles['has-audio']]: practice.recordStatus },
                  { [styles['no-audio']]: !practice.recordStatus },
                  styles[pc]
                )}
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
