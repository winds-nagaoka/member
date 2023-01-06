import { useParams } from 'react-router-dom'
import clsx from 'clsx'
import { ContentsBox, ContentsLoading } from '../../../components/ContentsBox'
import { useVideo } from '../api/getVideo'
import styles from './VideoList.module.scss'
import { useConcertList } from '../api/getConcertList'
import type { ConcertDetail } from '../../../types'
import type { Video } from '../../../types/video'
import { ReactComponent as VideoIcon } from '../../../assets/video.svg'

export const VideoList = () => {
  const { concertId } = useParams()
  const videoQuery = useVideo(concertId || '')
  const concertListQuery = useConcertList()

  if (videoQuery.isLoading || concertListQuery.isLoading) {
    return <ContentsLoading />
  }
  if (!videoQuery.data || !concertListQuery.data || !concertId) {
    return null
  }

  const concertItem = concertListQuery.data.list.find((item) => item.id === concertId) || null
  if (!concertItem) {
    return null
  }

  const { data: videoData } = videoQuery

  const aspectClass = videoData.poster === 'https://video.winds-n.com/poster_800_586.png' ? 'aspect-4-3' : 'aspect-16-9'

  return (
    <ContentsBox>
      <div className={styles['archive-video-list']}>
        <div className={styles['video-player']}>
          <div className={clsx(styles['video-frame'], styles[aspectClass])}>
            <video
            // ref={(i) => {
            //   !this.props.videoRef ? this.props.setVideoRef(i) : false
            // }}
            // onLoadStart={() => this.onLoadStart()}
            // onLoadedMetadata={(e) => this.onLoadedMetadata(e)}
            // onLoadedData={(e) => this.onLoadedData(e)}
            // onDurationChange={(e) => this.onDurationChange(e)}
            // onProgress={(e) => this.onProgress(e)}
            // onCanPlayThrough={() => this.onCanPlayThrough()}
            // onError={() => this.onError()}
            // onTimeUpdate={(e) => this.onTimeUpdate(e)}
            // onEnded={() => this.onEnded()}
            // onClick={(e) => this.onClick(e)}
            // poster={poster}
            // playsInline
            // // playsInline={!this.state.fullScreen}
            // // これは再生中のときtrueにする
            // controls={true}
            // // controls={this.getFullScreenElment()}
            // controlsList="nodownload"
            ></video>
          </div>
        </div>
        <TrackList concertDetail={concertItem.detail} videoData={videoData} />
      </div>
    </ContentsBox>
  )
}

const TrackList = ({ concertDetail, videoData }: { concertDetail: ConcertDetail; videoData: Video }) => {
  const playlist = composePlaylist(concertDetail, videoData)
  const playingTrack = -1
  return (
    <div className={styles['video-list']}>
      {concertDetail.contents.map((part) => {
        const trackList = part.music.map((musicKey) => {
          const trackData = playlist.filter((playItem) => playItem.data === musicKey)
          return trackData.map((track) => {
            const { title, composer, arranger } = track.music
            return (
              <div
                key={`track-${track.trackNumber}`}
                className={clsx(
                  styles.track,
                  { [styles.playing]: playingTrack === track.trackNumber },
                  styles[concertDetail.type]
                )}
              >
                <div className={styles.icon}>
                  <VideoIcon />
                </div>
                <div className={styles.info}>
                  <span className={styles.title}>
                    {title}
                    {track.addtitle && ` ${track.addtitle}`}
                  </span>
                  {composer ? (
                    arranger ? (
                      <span className={styles.composer}>
                        {composer}
                        {composer.match(/民謡/) ? '' : '作曲'}
                        <span>/</span>
                        {arranger}編曲
                      </span>
                    ) : (
                      <span className={styles.composer}>{composer}</span>
                    )
                  ) : arranger ? (
                    <span className={styles.composer}>{arranger}編曲</span>
                  ) : null}
                </div>
              </div>
            )
          })
        })
        return (
          <div key={part.label}>
            <label>{part.label}</label>
            {trackList}
          </div>
        )
      })}
    </div>
  )
}

const composePlaylist = (concertDetail: ConcertDetail, video: Video) => {
  return video.list.map((videoItem, index) => {
    const music = concertDetail.data[videoItem.data]
    const part = concertDetail.contents.find((part) => part.music.includes(videoItem.data)) || null
    return { trackNumber: index, ...videoItem, music, part }
  })
}
