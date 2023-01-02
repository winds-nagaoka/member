import { ContentsBox } from './ContentsBox'
import styles from './Loading.module.scss'

export const Loading = () => (
  <div className={styles.loading}>
    <div className={styles.loading1}></div>
    <div className={styles.loading2}></div>
    <div className={styles.loading3}></div>
  </div>
)

export const FullScreenLoading = () => {
  return (
    <div className={styles['full-loading']}>
      <Loading />
    </div>
  )
}

export const ContentsLoading = () => (
  <ContentsBox>
    <Loading />
  </ContentsBox>
)
