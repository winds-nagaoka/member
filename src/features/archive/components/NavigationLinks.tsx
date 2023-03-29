import { useParams } from 'react-router-dom'
import { usePhoto } from '../api/getPhoto'
import { useVideo } from '../api/getVideo'
import { ContentsLinks } from '../../../components/Navigations'
import { ContentsBox } from '../../../components/ContentsBox'

export const NavigationLinks = () => {
  const { concertId } = useParams<{ concertId: string }>()
  const photoQuery = usePhoto(concertId || '')
  const videoQuery = useVideo(concertId || '')

  const hasNoPhotos = photoQuery.data?.list.length === 0
  const hasNoVideos = videoQuery.data?.list.length === 0

  const photoIsDisabled = photoQuery.isLoading || !photoQuery.data || hasNoPhotos
  const videoIsDisabled = videoQuery.isLoading || !videoQuery.data || hasNoVideos

  return (
    <ContentsBox>
      <ContentsLinks
        list={[
          { path: `/archive/photo/${concertId}`, label: '写真', isDisabled: photoIsDisabled },
          { path: `/archive/video/${concertId}`, label: '映像', isDisabled: videoIsDisabled },
        ]}
      />
    </ContentsBox>
  )
}
