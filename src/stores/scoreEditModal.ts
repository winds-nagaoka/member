import create from 'zustand'
import type { ScoreItem } from '../types'

// モーダルの開閉時間
const MODAL_DURATION = 200

type EditMode = 'new' | 'editStatus' | 'editDetail'

type ScoreEditModalStore = {
  isOpen: boolean
  onOpen: (scoreItem: ScoreItem, editMode: EditMode) => void
  onClose: () => void
  scoreItem: ScoreItem | null
  editMode: EditMode | null
}

export const useScoreEditModalStore = create<ScoreEditModalStore>((set) => ({
  isOpen: false,
  onOpen: (scoreItem, editMode) => set((state) => ({ ...state, isOpen: true, scoreItem, editMode })),
  onClose: () => {
    set((state) => ({ ...state, isOpen: false }))
    setTimeout(() => set((state) => ({ ...state, scoreItem: null })), MODAL_DURATION)
  },
  scoreItem: null,
  editMode: null,
}))
