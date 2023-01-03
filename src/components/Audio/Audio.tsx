import { MouseEvent, RefObject, useRef, useState } from 'react'
import clsx from 'clsx'
import { useStyle } from '../../utilities/useStyle'
import { ReactComponent as PlayIcon } from '../../assets/play.svg'
import { ReactComponent as PauseIcon } from '../../assets/pause.svg'
import { ReactComponent as StopIcon } from '../../assets/stop.svg'
import { ReactComponent as OpenIcon } from '../../assets/up.svg'
import styles from './Audio.module.scss'
import { useAudioStore } from '../../stores/audio'
import { useReferenceList } from './api/getReferenceList'

type AudioState = {
  src: string | null
  track: number | null
  playing: boolean
  loading: boolean
  loadingPercent: number | null
  currentTime: number | null
  duration: number | null
}

const initialState = {
  src: null,
  track: null,
  playing: false,
  loading: false,
  loadingPercent: null,
  currentTime: null,
  duration: null,
}

const useAudio = (audioRef: RefObject<HTMLAudioElement>) => {
  const [state, setState] = useState<AudioState>(initialState)

  const playUpdate = (currentTime: number | null, duration: number | null) => {
    setState((state) => ({ ...state, currentTime, duration }))
  }

  const onLoadStart = () => {
    if (audioRef.current?.src) {
      setState((state) => ({ ...state, loading: true }))
    }
  }

  const onLoadedMetadata = () => {
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      playUpdate(state.currentTime, audioRef.current.duration)
    } else {
      playUpdate(state.currentTime, null)
    }
  }

  const onLoadedData = () => {
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      playUpdate(state.currentTime, audioRef.current.duration)
    } else {
      playUpdate(state.currentTime, null)
    }
  }

  const onDurationChange = () => {
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      playUpdate(state.currentTime, audioRef.current.duration)
    } else {
      playUpdate(state.currentTime, null)
    }
  }

  const onProgress = () => {
    if (audioRef.current && audioRef.current.buffered.length > 0) {
      const { buffered } = audioRef.current
      setState((state) => ({
        ...state,
        loadingPercent:
          audioRef.current && Math.round((buffered.end(buffered.length - 1) / audioRef.current.duration) * 1000) / 10,
      }))
    } else {
      setState((state) => ({ ...state, loadingPercent: null }))
    }
  }

  const onCanPlayThrough = () => {
    setState((state) => ({ ...state, loading: false }))
  }

  const onError = () => {
    setState((state) => ({ ...state, loading: true }))
  }

  const onTimeUpdate = () => {
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      playUpdate(audioRef.current.currentTime, audioRef.current.duration)
    } else {
      playUpdate(null, null)
    }
  }

  const onEnded = () => {
    // playNext()
  }

  return {
    state,
    playPercent:
      state.duration && state.currentTime ? Math.round((state.currentTime / state.duration) * 1000) / 10 : null,

    audioFunctions: {
      onLoadStart,
      onLoadedMetadata,
      onLoadedData,
      onDurationChange,
      onProgress,
      onCanPlayThrough,
      onError,
      onTimeUpdate,
      onEnded,
    },
  }
}

export const Audio = () => {
  const pc = useStyle()
  const { playType, displayPlayer, displayPlaylist, toggleDisplayPlaylist } = useAudioStore()
  const audioRef = useRef<HTMLAudioElement>(null)
  const audioProgress = useRef<HTMLDivElement>(null)
  const audioLoadProgress = useRef<HTMLDivElement>(null)
  const { state, playPercent, audioFunctions } = useAudio(audioRef)

  const referenceListQuery = useReferenceList()
  if (referenceListQuery.isLoading) {
    return null
  }
  if (!referenceListQuery.data) {
    return null
  }

  const play = () => {
    audioRef.current?.play()
  }

  const stop = () => {
    audioRef.current?.pause()
  }

  const playerClass = { [styles.open]: displayPlayer }
  const displayPlaylistClass = { [styles['list-open']]: displayPlaylist }
  const playStatusClass = { [styles.playing]: state.playing }
  const playTypeClass = styles[playType || '']
  const playProgress = playPercent ? { backgroundSize: playPercent + '% 100%' } : { backgroundSize: '0% 100%' }
  const loadProgress = state.loadingPercent
    ? { backgroundSize: state.loadingPercent + '% 100%' }
    : { backgroundSize: '0% 100%' }

  const seekProgress = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    if (displayPlaylist && audioRef.current && audioProgress.current) {
      const total = Math.round(audioRef.current?.duration)
      if (!isNaN(total)) {
        audioRef.current.currentTime = Math.round(total * (e.pageX / audioProgress.current.clientWidth))
        // this.props.countPlay(Math.round(total * (e.pageX / audioProgress.current.clientWidth)))
      }
    } else {
      toggleDisplayPlaylist(true)
    }
  }

  return (
    <div className={clsx(styles.audio, styles[pc])}>
      <div className={clsx(styles.player, playerClass)}>
        {/* {prevButton} */}
        <div
          className={clsx(styles.control, styles.play, playStatusClass, playTypeClass, displayPlaylistClass)}
          onClick={play}
        >
          {state.playing ? <PauseIcon /> : <PlayIcon />}
        </div>
        <div
          className={clsx(styles.control, styles.stop, playStatusClass, playTypeClass, displayPlaylistClass)}
          onClick={stop}
        >
          <StopIcon />
        </div>
        {/* {nextButton} */}
        <div
          className={clsx(styles['audio-progress'], playStatusClass, playTypeClass, displayPlaylistClass)}
          style={playProgress}
          ref={audioProgress}
          onClick={seekProgress}
        >
          <PlayTime currentTime={state.currentTime} duration={state.duration} />
        </div>
        <div
          className={clsx(styles['audio-load-progress'], playStatusClass, playTypeClass, displayPlaylistClass)}
          style={loadProgress}
          ref={audioLoadProgress}
        ></div>
        <div
          className={clsx(styles['music-info'], playStatusClass, playTypeClass, displayPlaylistClass)}
          onClick={() => toggleDisplayPlaylist(true)}
        >
          <Title />
        </div>
        <div className={clsx(styles.label, displayPlaylistClass, playTypeClass)}>
          <OpenIcon />
        </div>
      </div>
      <audio ref={audioRef} {...audioFunctions} controls={false}></audio>
      {/* {showPlaylist} */}
      <div
        className={'music-list-background' + displayPlaylistClass}
        onClick={() => toggleDisplayPlaylist(false)}
      ></div>
    </div>
  )
}

const PlayTime = ({ currentTime, duration }: { currentTime: number | null; duration: number | null }) => {
  return (
    <div className={styles.time}>
      <span>{currentTime ? currentTime : '00:00'}</span>
      <span>{duration ? duration : '00:00'}</span>
    </div>
  )
}

const Title = () => {
  return <>ここにタイトル</>
}
