import { MouseEvent, RefObject, useRef, useState } from 'react'
import clsx from 'clsx'
import { useStyle } from '../../utilities/useStyle'
import { ReactComponent as PlayIcon } from '../../assets/play.svg'
import { ReactComponent as PauseIcon } from '../../assets/pause.svg'
import { ReactComponent as StopIcon } from '../../assets/stop.svg'
import { ReactComponent as OpenIcon } from '../../assets/up.svg'
import { ReactComponent as CloseIcon } from '../../assets/down.svg'
import { ReactComponent as PlayCircleIcon } from '../../assets/play-circle.svg'
import { ReactComponent as MusicalNoteIcon } from '../../assets/musical-note.svg'
import { useAudioStore } from '../../stores/audio'
import { AudioSource, useReferenceList } from './api/getReferenceList'
import { ConcertDetail, useSourceList } from '../../features/practice/api/getSourceList'
import styles from './Audio.module.scss'

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

const useAudioApiQuery = () => {
  const referenceListQuery = useReferenceList()
  const sourceListQuery = useSourceList()

  return {
    referenceListQuery,
    sourceListQuery,
    isLoading: referenceListQuery.isLoading || sourceListQuery.isLoading,
    isDataBlank: !referenceListQuery.data || !sourceListQuery.data,
  }
}

export const Audio = () => {
  const pc = useStyle()
  const { playType, displayPlayer, displayPlaylist, toggleDisplayPlaylist } = useAudioStore()
  const audioRef = useRef<HTMLAudioElement>(null)
  const audioProgress = useRef<HTMLDivElement>(null)
  const audioLoadProgress = useRef<HTMLDivElement>(null)
  const { state, playPercent, audioFunctions } = useAudio(audioRef)
  const apiQueries = useAudioApiQuery()

  if (apiQueries.isLoading) {
    return null
  }
  if (apiQueries.isDataBlank) {
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
      <Playlist
        playing={state.playing}
        displayPlaylist={displayPlaylist}
        apiQueries={apiQueries}
        toggleDisplayPlaylist={toggleDisplayPlaylist}
      />
      <div
        className={clsx(styles['music-list-background'], displayPlaylistClass)}
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

const Playlist = ({
  playing,
  displayPlaylist,
  apiQueries,
  toggleDisplayPlaylist,
}: {
  playing: boolean
  displayPlaylist: boolean
  apiQueries: ReturnType<typeof useAudioApiQuery>
  toggleDisplayPlaylist: (displayPlaylist: boolean) => void
}) => {
  const pc = useStyle()
  const { playType, playId } = useAudioStore()
  const { referenceListQuery, sourceListQuery } = apiQueries
  if (!referenceListQuery.data || !sourceListQuery.data) {
    return null
  }
  const { data: referenceData } = referenceListQuery
  const concertDetail = sourceListQuery.data.list.find((item) => item.id === playId)?.detail
  const audioSource = referenceData?.list.find((item) => item.id === playId)
  if (!concertDetail || !audioSource) {
    return null
  }

  const playStatusClass = { [styles.playing]: playing }
  const playTypeClass = styles[playType || '']
  return (
    <div className={clsx(styles['music-list'], { [styles.open]: displayPlaylist }, styles[pc])}>
      <div
        className={clsx(styles.header, playTypeClass, playStatusClass, styles[pc])}
        onClick={() => toggleDisplayPlaylist(false)}
      >
        <PlaylistTitle concertDetail={concertDetail} audioSource={audioSource} />
      </div>
      <div className={clsx(styles.label, styles.close, playTypeClass)} onClick={() => toggleDisplayPlaylist(false)}>
        <CloseIcon />
      </div>
      <div className={styles.contents}>
        <div className={styles['contents-inner']}>
          <div className={clsx(styles.album, styles.source)}>
            <TrackList concertDetail={concertDetail} audioSource={audioSource} />
          </div>
          <div className={styles.gap}></div>
        </div>
      </div>
    </div>
  )
}

const PlaylistTitle = ({ concertDetail, audioSource }: { concertDetail: ConcertDetail; audioSource: AudioSource }) => {
  const { playTrack, playType } = useAudioStore()
  if (playTrack === null) {
    return null
  }
  const trackItem = audioSource.list[playTrack]
  const track = concertDetail.data[trackItem.data]

  return (
    <div>
      <span className={styles[playType || '']}>{playTrack !== null && '参考音源 - ' + concertDetail.title}</span>
      <span>
        <>
          <MusicalNoteIcon />
          {track.title}
          {trackItem.addtitle && ` ${trackItem.addtitle}`}
        </>
      </span>
    </div>
  )
}

const TrackList = ({ concertDetail, audioSource }: { concertDetail: ConcertDetail; audioSource: AudioSource }) => {
  const { playType, playTrack, setTrack } = useAudioStore()

  const playlist = composePlaylist(concertDetail, audioSource)

  return (
    <>
      {concertDetail.contents.map((part) => {
        return (
          <div key={part.label}>
            <label>{part.label}</label>
            {part.music.map((musicKey) => {
              const trackData = playlist.filter((playItem) => playItem.data === musicKey)
              return trackData.map((track) => {
                const playing = playTrack === track.trackNumber
                const { title, composer, arranger } = track.music
                return (
                  <div
                    key={`track-${track.trackNumber}`}
                    className={clsx(styles.track, { [styles.playing]: playing }, styles[playType || ''])}
                    onClick={() => setTrack(track.trackNumber)}
                  >
                    <div className={styles.icon}>
                      <PlayCircleIcon />
                    </div>
                    <div className={styles.info}>
                      <span className={styles.title}>
                        {title}
                        {track.addtitle && ` ${track.addtitle}`}
                      </span>
                      <Composer composer={composer || null} arranger={arranger || null} />
                    </div>
                  </div>
                )
              })
            })}
          </div>
        )
      })}
    </>
  )
}

const composePlaylist = (concertDetail: ConcertDetail, audioSource: AudioSource) => {
  return audioSource.list.map((audioItem, index) => {
    const music = concertDetail.data[audioItem.data]
    const part = concertDetail.contents.find((part) => part.music.includes(audioItem.data)) || null
    return { trackNumber: index, ...audioItem, music, part }
  })
}

const Composer = ({ composer, arranger }: { composer: string | null; arranger: string | null }) => {
  return composer ? (
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
  ) : null
}
