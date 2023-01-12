import { RefObject } from 'react'
import create from 'zustand'

export type PlayType = 'archive' | 'source' | 'practice'

type MediaStore = {
  // audio
  displayPlayer: boolean
  displayPlaylist: boolean
  playing: boolean
  playTrack: number | null
  playId: string | null
  playType: PlayType | null
  toggleDisplayPlayer: (displayPlayer: boolean) => void
  toggleDisplayPlaylist: (displayPlaylist: boolean) => void
  setTrack: (playTrack: number, playId?: string, playType?: PlayType) => void
  setPlaying: (playing: boolean) => void
  resetTrack: () => void
  // video
  videoRef: RefObject<HTMLVideoElement> | null
  displayVideoPlayer: boolean
  videoPlaying: boolean
  videoPlayType: 'main' | 'mini' | 'other' | 'source' | null
  videoPlayId: string | null
  videoPlayTrack: number | null
  videoCurrentTime: number | null
  videoDuration: number | null
  videoLoadingPercent: number | null
  setVideoRef: (videoRef: RefObject<HTMLVideoElement> | null) => void
  toggleDisplayVideoPlayer: (displayVideoPlayer: boolean) => void
  setVideoTrack: (
    videoPlayTrack: number,
    videoPlayId?: string,
    videoPlayType?: 'main' | 'mini' | 'other' | 'source'
  ) => void
  setVideoPlaying: (videoPlaying: boolean) => void
  updateVideoPlaying: (videoCurrentTime: number | null, videoDuration: number | null) => void
  setVideoLoadingPercent: (videoLoadingPercent: number | null) => void
}

export const useMediaStore = create<MediaStore>((set) => ({
  displayPlayer: false,
  displayPlaylist: false,
  playing: false,
  playTrack: null,
  playId: null,
  playType: null,
  toggleDisplayPlayer: (displayPlayer) => set((state) => ({ ...state, displayPlayer })),
  toggleDisplayPlaylist: (displayPlaylist) => set((state) => ({ ...state, displayPlaylist })),
  setTrack: (playTrack, playId, playType) => {
    set((state) => ({
      ...state,
      displayPlayer: true,
      playing: true,
      playTrack,
      playId: playId !== undefined ? playId : state.playId,
      playType: playType !== undefined ? playType : state.playType,
    }))
  },
  setPlaying: (playing) => set((state) => ({ ...state, playing })),
  resetTrack: () => set((state) => ({ ...state, playTrack: null })),
  videoRef: null,
  displayVideoPlayer: false,
  videoPlaying: false,
  videoPlayType: null,
  videoPlayId: null,
  videoPlayTrack: null,
  videoCurrentTime: null,
  videoDuration: null,
  videoLoadingPercent: null,
  setVideoRef: (videoRef) => set((state) => ({ ...state, videoRef })),
  toggleDisplayVideoPlayer: (displayVideoPlayer) => set((state) => ({ ...state, displayVideoPlayer })),
  setVideoTrack: (videoPlayTrack, videoPlayId, videoPlayType) => {
    set((state) => ({ ...state, displayVideoPlayer: true, videoPlayTrack, videoPlayId, videoPlayType }))
  },
  setVideoPlaying: (videoPlaying) => set((state) => ({ ...state, videoPlaying })),
  updateVideoPlaying: (videoCurrentTime, videoDuration) =>
    set((state) => ({ ...state, videoCurrentTime, videoDuration })),
  setVideoLoadingPercent: (videoLoadingPercent) => set((state) => ({ ...state, videoLoadingPercent })),
}))
