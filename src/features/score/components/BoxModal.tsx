import clsx from 'clsx'
import { useMediaStore } from '../../../stores/media'
import { useScoreBoxModalStore } from '../../../stores/scoreBoxModal'
import { useStyle } from '../../../utilities/useStyle'
import styles from './BoxModal.module.scss'

export const ScoreBoxModal = () => {
  const pc = useStyle()
  const { isOpen, onClose, boxItem } = useScoreBoxModalStore()
  const { displayPlayer } = useMediaStore()

  return (
    <div className={clsx(styles['score-box-modal'], styles[pc])}>
      <div className={clsx(styles['score-box-info'], { [styles.open]: isOpen }, styles[pc])}>
        {boxItem && (
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
                    // value={this.props.inputBoxLocate}
                    // onChange={(e) => this.props.changeInputBoxLocate(e.target.value)}
                  />
                </div>
                <div className={styles.links}>
                  <div
                    onClick={() => {
                      // this.props.updateBoxLocate()
                    }}
                  >
                    保管場所を変更
                    {/* {this.props.loadingUpdateBoxLocate ? '読み込み中' : '保管場所を変更'} */}
                  </div>
                </div>
              </div>
              {displayPlayer && <div className={styles.gap}></div>}
            </div>
          </>
        )}
      </div>
      <div className={clsx(styles['score-box-modal-background'], { [styles.open]: isOpen })} onClick={onClose}></div>
    </div>
  )
}
