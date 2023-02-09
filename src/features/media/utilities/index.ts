import type { AudioSource, ReferenceListApi } from '../api/getReferenceList'
import type { AudioListApi } from '../api/getAudioList'
import type { ConcertListApi } from '../../archive/api/getConcertList'
import type { SourceListApi } from '../../practice/api/getSourceList'
import type { PlayType } from '../../../stores/media'
import type { ConcertDetail } from '../../../types'
import { HistoryListApi } from '../../practice/api/getHistoryList'
import { AudioRecord, RecordListApi } from '../api/getRecordList'

export const getConcertDetail = (
  playType: PlayType | null,
  concertData: ConcertListApi,
  sourceData: SourceListApi,
  historyData: HistoryListApi,
  playId: string | null
) => {
  if (playType === 'archive') {
    return concertData.list.find((item) => item.id === playId)?.detail || null
  }
  if (playType === 'source') {
    return sourceData.list.find((item) => item.id === playId)?.detail || null
  }
  if (playType === 'practice') {
    return historyData.list.find((item) => item.id === playId)?.detail || null
  }
  return null
}

export const getAudioSource = (
  playType: PlayType | null,
  audioData: AudioListApi,
  referenceData: ReferenceListApi,
  recordData: RecordListApi,
  playId: string | null
) => {
  if (playType === 'archive') {
    return audioData.list.find((item) => item.id === playId) || null
  }
  if (playType === 'source') {
    return referenceData.list.find((item) => item.id === playId) || null
  }
  if (playType === 'practice') {
    return recordData.list.find((item) => item.id === playId) || null
  }
  return null
}

export const composeSrc = (
  playType: PlayType | null,
  playTrack: number | null,
  audioSource: AudioSource | AudioRecord | null,
  audioData: AudioListApi,
  referenceData: ReferenceListApi,
  recordData: RecordListApi
) => {
  if (playTrack !== null && playType === 'archive' && audioSource && 'baseSrc' in audioSource) {
    return audioData.url + audioSource.baseSrc + audioSource.list[playTrack].path
  }
  if (playTrack !== null && playType === 'source' && audioSource && 'baseSrc' in audioSource) {
    return referenceData.url + audioSource.baseSrc + audioSource.list[playTrack].path
  }
  if (playTrack !== null && playType === 'practice' && audioSource && !('baseSrc' in audioSource)) {
    return recordData.url + audioSource.detail.directory + audioSource.detail.file[playTrack].path
  }
}

export const composePlaylist = (concertDetail: ConcertDetail, audioSource: AudioSource) => {
  return audioSource.list.map((audioItem, index) => {
    const music = concertDetail.data[audioItem.data]
    const part = concertDetail.contents.find((part) => part.music.includes(audioItem.data)) || null
    return { trackNumber: index, ...audioItem, music, part }
  })
}
