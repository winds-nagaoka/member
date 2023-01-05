import { useParams } from 'react-router-dom'
import { ContentsBox, ContentsLoading } from '../../../components/ContentsBox'
import { usePhoto } from '../api/getPhoto'
import styles from './PhotoList.module.scss'

export const PhotoList = () => {
  const { concertId } = useParams()
  const photoQuery = usePhoto(concertId || '')

  if (photoQuery.isLoading) {
    return <ContentsLoading />
  }

  if (!photoQuery.data) {
    return null
  }

  const { data } = photoQuery

  const openPhoto = (photoIndex: number) => {}

  return (
    <ContentsBox>
      <div className={styles['archive-photo']}>
        <div className={styles['thumbnail-list']}>
          {photoQuery.data.list.map((photoPath, index) => {
            return (
              <div key={photoPath} className={styles['each-thumbnail']} onClick={() => openPhoto(index)}>
                <img
                  src={(data.url || '') + (data.baseSrcThumbnail + '') + photoPath}
                  className={styles['thumbnail-photo']}
                  alt="演奏会の写真"
                />
              </div>
            )
          })}
        </div>
      </div>
    </ContentsBox>
  )
}
