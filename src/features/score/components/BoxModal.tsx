import clsx from 'clsx'
import { useState } from 'react'
import { useMediaStore } from '../../../stores/media'
import { useScoreBoxModalStore } from '../../../stores/scoreBoxModal'
import { BoxItem } from '../../../types'
import { useStyle } from '../../../utilities/useStyle'
import { useUpdateScoreBox } from '../api/updateScoreBox'
import styles from './BoxModal.module.scss'

export const ScoreBoxModal = () => {
  const pc = useStyle()
  const { isOpen, onClose, boxItem } = useScoreBoxModalStore()

  return (
    <div className={clsx(styles['score-box-modal'], styles[pc])}>
      <div className={clsx(styles['score-box-info'], { [styles.open]: isOpen }, styles[pc])}>
        {boxItem && <BoxItemDetail boxItem={boxItem} onClose={onClose} />}
      </div>
      <div className={clsx(styles['score-box-modal-background'], { [styles.open]: isOpen })} onClick={onClose}></div>
    </div>
  )
}

const BoxItemDetail = ({ boxItem, onClose }: { boxItem: BoxItem; onClose: () => void }) => {
  const { displayPlayer } = useMediaStore()
  const [inputBoxLocate, setInputBoxLocate] = useState(boxItem.locate || '')
  const updateScoreBoxMutation = useUpdateScoreBox()

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
              <label>ラベル</label>
              <div className={styles['score-box-label']}>
                <span>{boxItem.label}</span>
              </div>
            </div>
            <div>
              <label>保管場所</label>
              <div className={clsx(styles.locate, { [styles.disabled]: !boxItem.locate })}>
                {boxItem.locate || '未設定'}
              </div>
            </div>
          </div>
          <div className={styles['input-box-locate']}>
            <label>新しい保管場所</label>
            <input
              type="text"
              className={styles.input}
              value={inputBoxLocate}
              onChange={(e) => setInputBoxLocate(e.target.value)}
            />
          </div>
          <div className={styles.links}>
            <div onClick={() => updateScoreBoxMutation.mutate({ id: boxItem._id, locate: inputBoxLocate })}>
              {updateScoreBoxMutation.isLoading ? '読み込み中' : '保管場所を変更'}
            </div>
          </div>
        </div>
        {displayPlayer && <div className={styles.gap}></div>}
      </div>
    </>
  )
}
