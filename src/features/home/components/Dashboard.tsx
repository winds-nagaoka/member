import clsx from 'clsx'
import { ContentsBox, ContentsLoading, Text, TitleFrame } from '../../../components/ContentsBox'
import { ContentsLinks } from '../../../components/Navigations'
import { ScheduleListApi, useScheduleList } from '../api/api'
import styles from './Dashboard.module.scss'

export const Dashboard = () => {
  return (
    <div className={styles.home}>
      <Schedule />
    </div>
  )
}

const Schedule = () => {
  const scheduleListQuery = useScheduleList()

  if (scheduleListQuery.isLoading) {
    return <ContentsLoading />
  }

  if (!scheduleListQuery.data) {
    return null
  }

  return (
    <ContentsBox>
      <div className={styles['home-schedule']}>
        <TitleFrame title="次回の練習日">
          <Text>
            <ScheduleNext schedule={scheduleListQuery.data} />
          </Text>
        </TitleFrame>
        <ContentsLinks list={[{ path: '/practice', label: '練習について' }]} />
      </div>
    </ContentsBox>
  )
}

const ScheduleNext = ({ schedule }: { schedule: ScheduleListApi }) => {
  const today = schedule.today ? <span className={styles.today}>本日</span> : ''
  const next = schedule.next
  const date = next.date.split('-')
  const month = date[1].match(/0[0-9]/) ? date[1].replace(/^0/g, '') : date[1]
  const day = date[2].match(/0[0-9]/) ? date[2].replace(/^0/g, '') : date[2]
  const memo = next.memo ? <span className={styles.memo}>{next.memo}</span> : ''
  const studio = next.studio.match(/第[1-9]スタジオ/) ? (
    <span>
      第<span>{next.studio.replace('第', '').replace('スタジオ', '')}</span>スタジオ
    </span>
  ) : (
    <span>{next.studio}</span>
  )
  return (
    <div className={styles.next}>
      <div className={styles['next-labels']}>
        {today}
        {memo}
      </div>
      <div className={styles['next-day']}>
        <span className={styles.month}>
          {month}
          <span>月</span>
        </span>
        <span className={styles.day}>
          {day}
          <span>日</span>
        </span>
        <span className={clsx(styles.date, styles[next.weeken])}>{next.weekjp}</span>
      </div>
      <div className={styles['next-time']}>
        <span className={styles.time}>{next.time.start}</span>
        <span className={styles.while}>～</span>
        <span className={styles.time}>{next.time.end}</span>
      </div>
      <div className={styles['next-place']}>
        <span className={styles.place}>{next.place}</span>
        <span className={styles.studio}>{studio}</span>
      </div>
    </div>
  )
}
