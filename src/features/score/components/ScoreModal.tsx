import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useMediaStore } from '../../../stores/media'
import { useScoreModalStore } from '../../../stores/scoreModal'
import { ScoreItem } from '../../../types'
import { useStyle } from '../../../utilities/useStyle'
import { ReactComponent as InfoIcon } from '../../../assets/information.svg'

import styles from './ScoreModal.module.scss'

export const ScoreModal = () => {
  const pc = useStyle()
  const { isOpen, onClose, scoreItem } = useScoreModalStore()
  return (
    <div className={clsx(styles['score-modal'], styles[pc])}>
      <div className={clsx(styles['score-info'], { [styles.open]: isOpen }, styles[pc])}>
        <Content scoreItem={scoreItem} onClose={onClose} />
      </div>
      <div className={clsx(styles['score-modal-background'], { [styles.open]: isOpen })} onClick={onClose}></div>
    </div>
  )
}

const Content = ({ scoreItem, onClose }: { scoreItem: ScoreItem | null; onClose: () => void }) => {
  const { displayPlayer } = useMediaStore()
  if (!scoreItem) {
    return null
  }
  const titleJa = scoreItem.titleJa ? (
    <span className={styles['title-ja']}>{scoreItem.titleJa}</span>
  ) : (
    <span className={styles['no-data']}>No Data</span>
  )
  const titleEn = scoreItem.titleEn ? (
    <span className={styles['title-en']}>{scoreItem.titleEn}</span>
  ) : (
    <span className={styles['no-data']}>No Data</span>
  )
  const composer =
    scoreItem.composer[0] !== '' ? (
      <span className={styles.composer}>{scoreItem.composer.join(', ')}</span>
    ) : (
      <span className={clsx(styles.composer, styles['no-data'])}>No Data</span>
    )
  const arranger =
    scoreItem.arranger[0] !== '' ? (
      <span className={styles.arranger}>{scoreItem.arranger.join(', ')}</span>
    ) : (
      <span className={clsx(styles.arranger, styles[' no-data'])}>No Data</span>
    )
  const storageStatus = () => {
    if (scoreItem.scoreStatus === '2') {
      return <span className={clsx(styles.status, styles.lend)}>貸出中</span>
    } else if (scoreItem.scoreStatus === '1') {
      return <span className={clsx(styles.status, styles.use)}>使用中</span>
    } else if (scoreItem.scoreStatus === '0') {
      return <span className={clsx(styles.status, styles.storage)}>保管</span>
    } else {
      return <span className={clsx(styles.status, styles.remove)}>削除</span>
    }
  }

  return (
    <>
      <div className={styles['modal-header']}>
        <div>詳細</div>
        <div onClick={onClose} className={styles.close}>
          &times;
        </div>
      </div>
      <div className={styles['modal-content']}>
        <div className={styles['modal-frame']}>
          <div className={styles['modal-frame-flex']}>
            <div>
              <label>保管状況</label>
              <div className={styles['score-status']}>{storageStatus()}</div>
            </div>
            <div>
              {/* <label>楽譜管理番号</label> */}
              <label>保管場所</label>
              <div className={styles.locate}>
                <span className={styles['box-label']}>{scoreItem.boxLabel}</span>
                <span className={styles['score-number']}>{scoreItem.label}</span>
              </div>
            </div>
          </div>
          <div className={styles['modal-text']}>
            <label>タイトル(日本語)</label>
            {titleJa}
          </div>
          <div className={styles['modal-text']}>
            <label>タイトル(原語)</label>
            {titleEn}
          </div>
          <div className={styles['modal-frame-flex']}>
            <div>
              <label>作曲者</label>
              {composer}
            </div>
            <div>
              <label>編曲者</label>
              {arranger}
            </div>
          </div>
          <div className={styles.links}>
            <Link to={'/score/detail/' + scoreItem._id} onClick={onClose}>
              <InfoIcon />
              詳細を表示
            </Link>
          </div>
        </div>
        {displayPlayer && <div className={styles.gap}></div>}
      </div>
    </>
  )
}
