import clsx from 'clsx'
import { ContentsBox, ContentsLoading, Text, TitleFrame } from '../../../components/ContentsBox'
import { ContentsLinks } from '../../../components/Navigations'
import { useStyle } from '../../../utilities/useStyle'
import { ScheduleListApi, useScheduleList } from '../api/getScheduleList'
import styles from './ScheduleList.module.scss'

export const ScheduleList = () => {
  const pc = useStyle()
  const scheduleListQuery = useScheduleList()
  if (scheduleListQuery.isLoading) {
    return <ContentsLoading />
  }
  if (!scheduleListQuery.data) {
    return null
  }
  return (
    <>
      <ContentsBox>
        <div className={clsx(styles['schedule-next'], styles[pc])}>
          <TitleFrame title="次回の練習日">
            <Text>
              <ScheduleNext scheduleList={scheduleListQuery.data} />
            </Text>
          </TitleFrame>
        </div>
      </ContentsBox>

      <ContentsBox>
        <div className={clsx(styles['schedule-next'], styles[pc])}>
          <TitleFrame title="今後の練習日程">
            <Text>
              <ScheduleAfter scheduleList={scheduleListQuery.data} />
            </Text>
          </TitleFrame>
        </div>
      </ContentsBox>

      <ContentsBox>
        <ContentsLinks list={[{ path: '/practice/source', label: '参考音源' }]} />
      </ContentsBox>

      <ContentsBox>
        <ContentsLinks list={[{ path: '/practice/history', label: '練習の記録' }]} />
      </ContentsBox>
    </>
  )
}

const ScheduleNext = ({ scheduleList }: { scheduleList: ScheduleListApi }) => {
  const today = scheduleList.today ? <span className={styles.today}>本日</span> : ''
  const next = scheduleList.next
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

const ScheduleAfter = ({ scheduleList }: { scheduleList: ScheduleListApi }) => {
  return (
    <>
      {Object.keys(scheduleList.schedule).map((scheduleItemKey, i) => {
        const year = scheduleItemKey.split('-')[0]
        const month = scheduleItemKey.split('-')[1].match(/0[0-9]/)
          ? scheduleItemKey.split('-')[1].replace(/^0/g, '')
          : scheduleItemKey.split('-')[1]
        const list = scheduleList.schedule[scheduleItemKey].map((each, j) => {
          const date = each.date.split('-')
          const day = date[2].match(/0[0-9]/) ? date[2].replace(/^0/g, '') : date[2]
          const memo = each.memo ? <span className={styles.memo}>{each.memo}</span> : ''
          const studio = each.studio.match(/第[1-9]スタジオ/) ? (
            <span>
              第<span>{each.studio.replace('第', '').replace('スタジオ', '')}</span>スタジオ
            </span>
          ) : (
            <span>{each.studio}</span>
          )
          return (
            <div key={'list' + j} className={styles.each}>
              <div className={styles.days}>
                <span className={styles.day}>
                  {day}
                  <span>日</span>
                </span>
                <span className={clsx(styles.date, styles[each.weeken])}>{each.weekjp}</span>
              </div>
              <div className={styles.times}>
                <span className={styles.time}>{each.time.start}</span>
                <span className={styles.while}>～</span>
                <span className={styles.time}>{each.time.end}</span>
              </div>
              <div className={styles.places}>
                <span className={styles.place}>{each.place}</span>
                <span className={styles.studio}>{studio}</span>
              </div>
              <div className={styles.labels}>{memo}</div>
            </div>
          )
        })
        return (
          <div key={'month' + i} className={styles['schedule-list']}>
            <div className={styles['month-title']}>
              <span className={styles.year}>
                {year}
                <span>年</span>
              </span>
              <span className={styles.month}>
                {month}
                <span>月</span>
              </span>
            </div>
            <div className={styles.list}>{list}</div>
          </div>
        )
      })}
    </>
  )
}
