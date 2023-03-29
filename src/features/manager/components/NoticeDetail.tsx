import { ContentsBox, ContentsLoading, Text, TitleFrame } from '../../../components/ContentsBox'
import { useNoticeList } from '../api/getNoticeList'
import styles from './NoticeDetail.module.scss'

export const NoticeDetail = () => {
  const noticeListQuery = useNoticeList()

  if (noticeListQuery.isLoading) {
    return <ContentsLoading />
  }

  if (!noticeListQuery.data) {
    return null
  }

  return (
    <>
      {noticeListQuery.data.contents.map((content, index) => {
        const attachment = content.attachment
          ? content.attachment.map((attach, i) => {
              const size = Math.round(Number(attach.size) * 0.01) / 10
              return (
                <div key={`attachment-${i}`} className={styles['notice-attachment']}>
                  <a
                    href={'https://winds-n.com/member/data/' + attach.filename}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.attachment}
                  >
                    <span>{attach.title}</span>
                    <span className={styles.size}>{size}KB</span>
                  </a>
                </div>
              )
            })
          : ''
        const date = content.time[0].date === '1970/01/01' ? false : content.time[0].date
        return (
          <ContentsBox key={`manager-${index}`}>
            <TitleFrame
              title={
                <div className={styles['notice-title']}>
                  <span>{content.title}</span>
                  <span className={styles.date}>{date}</span>
                </div>
              }
            >
              <Text>
                <div className={styles['notice-text']} dangerouslySetInnerHTML={{ __html: content.text }}></div>
              </Text>
            </TitleFrame>
            {attachment}
          </ContentsBox>
        )
      })}
    </>
  )
}
