import { useRef } from 'react'
import clsx from 'clsx'
import { ReactComponent as PlayIcon } from '../../assets/play.svg'
import { ReactComponent as PauseIcon } from '../../assets/pause.svg'
import { useMediaStore } from '../../stores/media'
import { useStyle } from '../../utilities/useStyle'
import styles from './Video.module.scss'
import { formatPlayTime } from '../../utilities/format'

export const Video = () => {
  const pc = useStyle()
  const videoProgress = useRef<HTMLDivElement>(null)
  const {
    displayVideoPlayer,
    videoPlaying,
    videoPlayType,
    videoCurrentTime,
    videoDuration,
    videoLoadingPercent,
    setPlaying,
    setRequestVideoCurrentTime,
  } = useMediaStore()
  if (!videoPlayType) {
    return null
  }
  const videoPlayPercent =
    videoDuration && videoCurrentTime ? Math.round((videoCurrentTime / videoDuration) * 1000) / 10 : null
  const videoLoadPercent = videoLoadingPercent
  const playProgress = videoPlayPercent
    ? { backgroundSize: videoPlayPercent + '% 100%' }
    : { backgroundSize: '0% 100%' }
  const loadProgress = videoLoadPercent
    ? { backgroundSize: videoLoadPercent + '% 100%' }
    : { backgroundSize: '0% 100%' }

  const seekProgress = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (displayVideoPlayer && videoProgress.current && videoDuration) {
      const total = Math.round(videoDuration)
      if (!isNaN(total)) {
        const currentTime = Math.round(total * (e.pageX / videoProgress.current.clientWidth))
        setRequestVideoCurrentTime(currentTime)
      }
    }
  }

  return (
    <div className={clsx(styles['video-controller'], styles[pc])}>
      <div className={clsx(styles.player, { [styles.open]: displayVideoPlayer })}>
        <button
          className={clsx(styles.control, styles.play, styles[videoPlayType])}
          onClick={() => (videoPlaying ? setPlaying(false) : setPlaying(true))}
        >
          {videoPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button
          className={clsx(styles.control, styles.stop, { [styles.playing]: videoPlaying }, styles[videoPlayType])}
          onClick={() => setPlaying(false)}
        >
          <i className="fas fa-stop"></i>
        </button>
        <div
          className={clsx(styles['video-progress'], { [styles.playing]: videoPlaying }, styles[videoPlayType])}
          style={playProgress}
          onClick={seekProgress}
        >
          <PlayTime currentTime={videoCurrentTime} duration={videoDuration} />
        </div>
        <div
          className={clsx(styles['video-load-progress'], { [styles.playing]: videoPlaying }, styles[videoPlayType])}
          style={loadProgress}
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
