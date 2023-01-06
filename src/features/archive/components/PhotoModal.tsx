import { Navigation, Keyboard, Lazy } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import clsx from 'clsx'
import { usePhotoModalStore } from '../../../stores/photoModal'
import { usePhoto } from '../api/getPhoto'
import { useStyle } from '../../../utilities/useStyle'
import styles from './PhotoModal.module.scss'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/keyboard'
import 'swiper/css/lazy'

export const PhotoModal = () => {
  const pc = useStyle()
  const { isOpen, onClose, concertId, photoIndex } = usePhotoModalStore()
  const photoQuery = usePhoto(concertId || '')

  if (photoQuery.isLoading) {
    return null
  }

  if (!photoQuery.data || !isOpen || !concertId || photoIndex === null) {
    return null
  }

  const { data } = photoQuery

  return (
    <div className={styles['photo-slide-modal']}>
      <div className={clsx(styles['photo-slide-modal-contents'], { [styles.open]: isOpen }, styles[pc])}>
        <div className={styles['photo-slide-modal-close']} onClick={onClose}>
          &times;
        </div>
        <div className={styles['archive-photo-slide']}>
          <Swiper
            spaceBetween={45}
            slidesPerView={1}
            grabCursor={true}
            navigation={true}
            keyboard={true}
            lazy={true}
            modules={[Navigation, Keyboard, Lazy]}
            initialSlide={photoIndex || 0}
            preloadImages={false}
            className={styles.swiper}
            style={{
              // @ts-ignore
              '--swiper-navigation-color': '#fff',
            }}
          >
            {data.list.map((photoPath, index) => {
              return (
                <SwiperSlide key={index} className={styles['swiper-slide']}>
                  <div className={styles['each-original']} onClick={onClose}>
                    <img
                      src={(data.url || '') + (data.baseSrcOriginal + '') + photoPath}
                      className={styles['original-photo']}
                      alt="演奏会の写真"
                    />
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
      <div className={clsx(styles['photo-slide-modal-background'], { [styles.open]: isOpen })} onClick={onClose}></div>
    </div>
  )
}
