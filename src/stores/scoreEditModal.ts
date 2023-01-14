import create from 'zustand'
import type { ScoreItem } from '../types'

// モーダルの開閉時間
const MODAL_DURATION = 200

type ScoreEditModalStore = {
  isOpen: boolean
  onOpen: (scoreItem: ScoreItem) => void
  onClose: () => void
  scoreItem: ScoreItem | null
}

export const useScoreEditModalStore = create<ScoreEditModalStore>((set) => ({
  isOpen: false,
  onOpen: (scoreItem) => set((state) => ({ ...state, isOpen: true, scoreItem })),
  onClose: () => {
    set((state) => ({ ...state, isOpen: false }))
    setTimeout(() => set((state) => ({ ...state, scoreItem: null })), MODAL_DURATION)
  },
  scoreItem: null,
}))
