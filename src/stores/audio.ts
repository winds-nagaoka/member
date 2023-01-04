import create from 'zustand'

export type PlayType = 'archive' | 'source' | 'practice'

type AudioStore = {
  displayPlayer: boolean
  displayPlaylist: boolean
  playType: PlayType | null
  playId: string | null
  playTrack: number | null
  toggleDisplayPlayer: (displayPlayer: boolean) => void
  toggleDisplayPlaylist: (displayPlaylist: boolean) => void
  setTrack: (playTrack: number, playId?: string, playType?: PlayType) => void
  resetTrack: () => void
}

export const useAudioStore = create<AudioStore>((set) => ({
  displayPlayer: false,
  displayPlaylist: false,
  playType: null,
  playId: null,
  playTrack: null,
  toggleDisplayPlayer: (displayPlayer) => set((state) => ({ ...state, displayPlayer })),
  toggleDisplayPlaylist: (displayPlaylist) => set((state) => ({ ...state, displayPlaylist })),
  setTrack: (playTrack, playId, playType) => {
    set((state) => ({
      ...state,
      displayPlayer: true,
      playTrack,
      playId: playId !== undefined ? playId : state.playId,
      playType: playType !== undefined ? playType : state.playType,
    }))
  },
  resetTrack: () => set((state) => ({ ...state, playTrack: null })),
}))
