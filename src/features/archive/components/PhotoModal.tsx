import clsx from 'clsx'
import { usePhotoModalStore } from '../../../stores/photoModal'
import { useStyle } from '../../../utilities/useStyle'
import styles from './PhotoModal.module.scss'

export const PhotoModal = () => {
  const pc = useStyle()
  const { isOpen, onClose, photoIndex } = usePhotoModalStore()

  return (
    <div className={styles['photo-slide-modal']}>
      <div className={clsx(styles['photo-slide-modal-contents'], { [styles.open]: isOpen }, styles[pc])}>
        <div className={styles['photo-slide-modal-close']} onClick={onClose}>
          &times;
        </div>
        {/* {showPhotoSlide} */}
      </div>
      <div className={clsx(styles['photo-slide-modal-background'], { [styles.open]: isOpen })} onClick={onClose}></div>
    </div>
  )
}
