import clsx from 'clsx'
import { useScoreBoxModalStore } from '../../../stores/scoreBoxModal'
import { useStyle } from '../../../utilities/useStyle'
import styles from './BoxModal.module.scss'

export const ScoreBoxModal = () => {
  const pc = useStyle()
  const { isOpen, onClose, boxItem } = useScoreBoxModalStore()

  return (
    <div className={clsx(styles['score-box-modal'], styles[pc])}>
      <div className={clsx(styles['score-box-info'], { [styles.open]: isOpen }, styles[pc])}>
        {boxItem && <>contents</>}
      </div>
      <div className={clsx(styles['score-box-modal-background'], { [styles.open]: isOpen })} onClick={onClose}></div>
    </div>
  )
}
