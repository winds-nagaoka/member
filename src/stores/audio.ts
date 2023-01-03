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
  setTrack: (id: string, track: number, playType: PlayType) => void
}

export const useAudioStore = create<AudioStore>((set) => ({
  displayPlayer: false,
  displayPlaylist: false,
  playType: null,
  playId: null,
  playTrack: null,
  toggleDisplayPlayer: (displayPlayer) => set((state) => ({ ...state, displayPlayer })),
  toggleDisplayPlaylist: (displayPlaylist) => set((state) => ({ ...state, displayPlaylist })),
  setTrack: (playId, playTrack, playType) => {
    set((state) => ({ ...state, displayPlayer: true, playId, playTrack, playType }))
  },
}))
