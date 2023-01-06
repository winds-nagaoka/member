import create from 'zustand'

export type PlayType = 'archive' | 'source' | 'practice'

type MediaStore = {
  displayPlayer: boolean
  displayPlaylist: boolean
  playing: boolean
  playType: PlayType | null
  playId: string | null
  playTrack: number | null
  toggleDisplayPlayer: (displayPlayer: boolean) => void
  toggleDisplayPlaylist: (displayPlaylist: boolean) => void
  setTrack: (playTrack: number, playId?: string, playType?: PlayType) => void
  setPlaying: (playing: boolean) => void
  resetTrack: () => void
}

export const useMediaStore = create<MediaStore>((set) => ({
  displayPlayer: false,
  displayPlaylist: false,
  playing: false,
  playType: null,
  playId: null,
  playTrack: null,
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
}))
