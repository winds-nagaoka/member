import { useRef } from 'react'
import clsx from 'clsx'
import { ReactComponent as PlayIcon } from '../../assets/play.svg'
import { ReactComponent as PauseIcon } from '../../assets/pause.svg'
import { ReactComponent as StopIcon } from '../../assets/stop.svg'
import { useMediaStore } from '../../stores/media'
import { useStyle } from '../../utilities/useStyle'
import styles from './Video.module.scss'
import { formatPlayTime } from '../../utilities/format'

export const Video = () => {
  const pc = useStyle()
  const videoProgress = useRef<HTMLDivElement>(null)
  const videoLoadProgress = useRef<HTMLDivElement>(null)
  const {
    videoRef,
    displayVideoPlayer,
    videoPlaying,
    videoPlayType,
    videoCurrentTime,
    videoDuration,
    videoLoadingPercent,
    setVideoPlaying,
  } = useMediaStore()

  const playType = videoPlayType || ''
  const videoPlayPercent =
    videoDuration && videoCurrentTime ? Math.round((videoCurrentTime / videoDuration) * 1000) / 10 : null
  const videoLoadPercent = videoLoadingPercent
  const playProgress = videoPlayPercent
    ? { backgroundSize: videoPlayPercent + '% 100%' }
    : { backgroundSize: '0% 100%' }
  const loadProgress = videoLoadPercent
    ? { backgroundSize: videoLoadPercent + '% 100%' }
    : { backgroundSize: '0% 100%' }

  const onPlay = () => {
    videoRef?.current?.play()
    setVideoPlaying(true)
  }

  const onPause = () => {
    videoRef?.current?.pause()
    setVideoPlaying(false)
  }

  const seekProgress = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (videoRef?.current && displayVideoPlayer && videoProgress.current && videoDuration) {
      const total = Math.round(videoDuration)
      if (!isNaN(total)) {
        const currentTime = Math.round(total * (e.pageX / videoProgress.current.clientWidth))
        videoRef.current.currentTime = currentTime
      }
    }
  }

  return (
    <div className={clsx(styles['video-controller'], styles[pc])}>
      <div className={clsx(styles.player, { [styles.open]: displayVideoPlayer })}>
        <button
          className={clsx(styles.control, styles.play, { [styles.playing]: videoPlaying }, styles[playType])}
          onClick={() => (videoPlaying ? onPause() : onPlay())}
        >
          {videoPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button
          className={clsx(styles.control, styles.stop, { [styles.playing]: videoPlaying }, styles[playType])}
          onClick={() => onPause()}
        >
          <StopIcon />
        </button>
        <div
          className={clsx(styles['video-progress'], { [styles.playing]: videoPlaying }, styles[playType])}
          style={playProgress}
          ref={videoProgress}
          onClick={seekProgress}
        >
          <PlayTime currentTime={videoCurrentTime} duration={videoDuration} />
        </div>
        <div
          className={clsx(styles['video-load-progress'], { [styles.playing]: videoPlaying }, styles[playType])}
          style={loadProgress}
          ref={videoLoadProgress}
        ></div>
      </div>
    </div>
  )
}

const PlayTime = ({ currentTime, duration }: { currentTime: number | null; duration: number | null }) => {
  return (
    <div className={styles.time}>
      <span>{currentTime ? formatPlayTime(currentTime) : '00:00'}</span>
      <span>{duration ? formatPlayTime(duration) : '00:00'}</span>
    </div>
  )
}
