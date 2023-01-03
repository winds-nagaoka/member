import create from 'zustand'

type AudioStore = {
  displayPlayer: boolean
  displayPlaylist: boolean
  toggleDisplayPlayer: (displayPlayer: boolean) => void
  toggleDisplayPlaylist: (displayPlaylist: boolean) => void
}

export const useAudioStore = create<AudioStore>((set) => ({
  displayPlayer: false,
  displayPlaylist: false,
  toggleDisplayPlayer: (displayPlayer) => set((state) => ({ ...state, displayPlayer })),
  toggleDisplayPlaylist: (displayPlaylist) => set((state) => ({ ...state, displayPlaylist })),
}))
