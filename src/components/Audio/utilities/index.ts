import type { AudioSource, ReferenceListApi } from '../api/getReferenceList'
import type { AudioListApi } from '../api/getAudioList'
import type { ConcertListApi } from '../../../features/archive/api/getConcertList'
import type { SourceListApi } from '../../../features/practice/api/getSourceList'
import type { PlayType } from '../../../stores/audio'

export const getConcertDetail = (
  playType: PlayType,
  concertData: ConcertListApi,
  sourceData: SourceListApi,
  playId: string
) => {
  if (playType === 'archive') {
    return concertData.list.find((item) => item.id === playId)?.detail || null
  }
  if (playType === 'source') {
    return sourceData.list.find((item) => item.id === playId)?.detail || null
  }
  return null
}

export const getAudioSource = (
  playType: PlayType,
  audioData: AudioListApi,
  referenceData: ReferenceListApi,
  playId: string
) => {
  if (playType === 'archive') {
    return audioData.list.find((item) => item.id === playId) || null
  }
  if (playType === 'source') {
    return referenceData.list.find((item) => item.id === playId) || null
  }
  return null
}

export const composeSrc = (
  playType: PlayType,
  playTrack: number | null,
  audioSource: AudioSource,
  audioData: AudioListApi,
  referenceData: ReferenceListApi
) => {
  if (playTrack !== null && playType === 'archive') {
    return audioData.url + audioSource.baseSrc + audioSource.list[playTrack].path
  }
  if (playTrack !== null && playType === 'source') {
    return referenceData.url + audioSource.baseSrc + audioSource.list[playTrack].path
  }
}
