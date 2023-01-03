import create from 'zustand'

type PlayType = 'archive' | 'source' | 'practice'

type AudioStore = {
  playType: PlayType | null
  displayPlayer: boolean
  displayPlaylist: boolean
  id: string | null
  track: number | null
  toggleDisplayPlayer: (displayPlayer: boolean) => void
  toggleDisplayPlaylist: (displayPlaylist: boolean) => void
  setTrack: (id: string, track: number, playType: PlayType) => void
}

export const useAudioStore = create<AudioStore>((set) => ({
  playType: null,
  displayPlayer: false,
  displayPlaylist: false,
  id: null,
  track: null,
  toggleDisplayPlayer: (displayPlayer) => set((state) => ({ ...state, displayPlayer })),
  toggleDisplayPlaylist: (displayPlaylist) => set((state) => ({ ...state, displayPlaylist })),
  setTrack: (id, track, playType) => {
    set((state) => ({ ...state, displayPlayer: true, id, track, playType }))
  },
}))
