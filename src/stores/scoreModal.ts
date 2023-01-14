import create from 'zustand'
import type { ScoreItem } from '../types'

type ScoreModalStore = {
  isOpen: boolean
  onOpen: (scoreItem: ScoreItem) => void
  onClose: () => void
  scoreItem: ScoreItem | null
}

export const useScoreModalStore = create<ScoreModalStore>((set) => ({
  isOpen: false,
  onOpen: (scoreItem) => set((state) => ({ ...state, isOpen: true, scoreItem })),
  onClose: () => set((state) => ({ ...state, isOpen: false, scoreItem: null })),
  scoreItem: null,
}))
