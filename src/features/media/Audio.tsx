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
import { useMediaStore } from '../../stores/media'
import { AudioSource, useReferenceList } from './api/getReferenceList'
import { useSourceList } from '../practice/api/getSourceList'
import type { ConcertDetail } from '../../types'
import type { PlayType } from '../../stores/media'
import styles from './Audio.module.scss'
import { formatPlayTime } from '../../utilities/format'
import { useAudioList } from './api/getAudioList'
import { useConcertList } from '../archive/api/getConcertList'
import { getConcertDetail, getAudioSource, composeSrc } from './utilities'
import { composePlaylist } from './utilities'
import { useEffect } from 'react'
import { AudioRecord, useRecordList } from './api/getRecordList'
import { HistoryDetail, useHistoryList } from '../practice/api/getHistoryList'

type AudioState = {
  loading: boolean
  loadingPercent: number | null
  currentTime: number | null
  duration: number | null
}

const initialState = {
  loading: false,
  loadingPercent: null,
  currentTime: null,
  duration: null,
}

const useAudio = (audioRef: RefObject<HTMLAudioElement>) => {
  const [state, setState] = useState<AudioState>(initialState)
  const { audioRef: storedAudioRef, setAudioRef, playing, setPlaying, resetTrack } = useMediaStore()

  useEffect(() => {
    if (audioRef && !storedAudioRef) {
      setAudioRef(audioRef)
    }
  }, [audioRef, storedAudioRef, setAudioRef])

  useEffect(() => {
    return () => setAudioRef(null)
  }, [setAudioRef])

  const onPlay = () => {
    audioRef.current?.play()
    setPlaying(true)
  }

  const onPause = () => {
    audioRef.current?.pause()
    setPlaying(false)
  }

  const onStop = () => {
    onPause()
    setState(initialState)
    resetTrack()
  }

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
    if (playing) {
      audioRef.current?.play()
    }
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
    onPlay,
    onPause,
    onStop,

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
  const audioListQuery = useAudioList()
  const concertListQuery = useConcertList()
  const recordListQuery = useRecordList()
  const historyListQuery = useHistoryList()

  return {
    referenceListQuery,
    sourceListQuery,
    audioListQuery,
    concertListQuery,
    recordListQuery,
    historyListQuery,
    isLoading:
      referenceListQuery.isLoading ||
      sourceListQuery.isLoading ||
      audioListQuery.isLoading ||
      concertListQuery.isLoading ||
      recordListQuery.isLoading ||
      historyListQuery.isLoading,
    isDataBlank:
      !referenceListQuery.data ||
      !sourceListQuery.data ||
      !audioListQuery.data ||
      !concertListQuery.data ||
      !recordListQuery.data ||
      !historyListQuery.data,
  }
}

export const Audio = () => {
  const pc = useStyle()
  const { playing, playType, playId, playTrack, displayPlayer, displayPlaylist, toggleDisplayPlaylist } =
    useMediaStore()
  const audioRef = useRef<HTMLAudioElement>(null)
  const audioProgress = useRef<HTMLDivElement>(null)
  const audioLoadProgress = useRef<HTMLDivElement>(null)
  const { state, playPercent, onPlay, onPause, onStop, audioFunctions } = useAudio(audioRef)
  const apiQueries = useAudioApiQuery()

  if (apiQueries.isLoading) {
    return null
  }

  const { referenceListQuery, sourceListQuery, audioListQuery, concertListQuery, recordListQuery, historyListQuery } =
    apiQueries
  const { data: referenceData } = referenceListQuery
  const { data: sourceData } = sourceListQuery
  const { data: audioData } = audioListQuery
  const { data: concertData } = concertListQuery
  const { data: recordData } = recordListQuery
  const { data: historyData } = historyListQuery
  if (!referenceData || !sourceData || !audioData || !concertData || !recordData || !historyData) {
    return null
  }

  const concertDetail = getConcertDetail(playType, concertData, sourceData, historyData, playId)
  const audioSource = getAudioSource(playType, audioData, referenceData, recordData, playId)

  const src = composeSrc(playType, playTrack, audioSource, audioData, referenceData, recordData)

  const playerClass = { [styles.open]: displayPlayer }
  const displayPlaylistClass = { [styles['list-open']]: displayPlaylist }
  const playStatusClass = { [styles.playing]: playing }
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
          onClick={playing ? onPause : onPlay}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </div>
        <div
          className={clsx(styles.control, styles.stop, playStatusClass, playTypeClass, displayPlaylistClass)}
          onClick={onStop}
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
          <Title playType={playType} playTrack={playTrack} concertDetail={concertDetail} audioSource={audioSource} />
        </div>
        <div className={clsx(styles.label, displayPlaylistClass, playTypeClass)}>
          <OpenIcon />
        </div>
      </div>
      <audio ref={audioRef} src={src} {...audioFunctions} controls={false}></audio>
      <Playlist
        playType={playType}
        playTrack={playTrack}
        playing={playing}
        displayPlaylist={displayPlaylist}
        concertDetail={concertDetail}
        audioSource={audioSource}
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
      <span>{currentTime ? formatPlayTime(currentTime) : '00:00'}</span>
      <span>{duration ? formatPlayTime(duration) : '00:00'}</span>
    </div>
  )
}

const Playlist = ({
  playType,
  playTrack,
  playing,
  displayPlaylist,
  concertDetail,
  audioSource,
  toggleDisplayPlaylist,
}: {
  playType: PlayType | null
  playTrack: number | null
  playing: boolean
  displayPlaylist: boolean
  concertDetail: ConcertDetail | HistoryDetail | null
  audioSource: AudioSource | AudioRecord | null
  toggleDisplayPlaylist: (displayPlaylist: boolean) => void
}) => {
  const pc = useStyle()

  if (audioSource === null || concertDetail === null) {
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
        <Title playType={playType} playTrack={playTrack} concertDetail={concertDetail} audioSource={audioSource} />
      </div>
      <div className={clsx(styles.label, styles.close, playTypeClass)} onClick={() => toggleDisplayPlaylist(false)}>
        <CloseIcon />
      </div>
      <div className={styles.contents}>
        <div className={styles['contents-inner']}>
          <div className={clsx(styles.album, styles.source)}>
            <TrackList
              playType={playType}
              playTrack={playTrack}
              concertDetail={concertDetail}
              audioSource={audioSource}
            />
          </div>
          <div className={styles.gap}></div>
        </div>
      </div>
    </div>
  )
}

const Title = ({
  playType,
  playTrack,
  concertDetail,
  audioSource,
}: {
  playType: PlayType | null
  playTrack: number | null
  concertDetail: ConcertDetail | HistoryDetail | null
  audioSource: AudioSource | AudioRecord | null
}) => {
  if (playTrack === null || audioSource === null || concertDetail === null) {
    return null
  }

  if (playType !== 'practice' && 'baseSrc' in audioSource && 'contents' in concertDetail) {
    const trackItem = audioSource.list[playTrack]
    const track = concertDetail.data[trackItem.data]

    const playTypeClass = styles[playType || '']

    const sourcePrefix = playType === 'source' ? '参考音源 - ' : ''

    return (
      <div>
        <span className={playTypeClass}>{playTrack !== null && sourcePrefix + concertDetail.title}</span>
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

  return null
}

const TrackList = ({
  playType,
  playTrack,
  concertDetail,
  audioSource,
}: {
  playType: PlayType | null
  playTrack: number | null
  concertDetail: ConcertDetail | HistoryDetail | null
  audioSource: AudioSource | AudioRecord | null
}) => {
  const { setTrack } = useMediaStore()

  if (audioSource === null || concertDetail === null) {
    return null
  }

  if (playType !== 'practice' && 'baseSrc' in audioSource && 'contents' in concertDetail) {
    const playlist = composePlaylist(concertDetail, audioSource)

    const playTypeClass = styles[playType || '']
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
                      className={clsx(styles.track, { [styles.playing]: playing }, playTypeClass)}
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

  return null
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
