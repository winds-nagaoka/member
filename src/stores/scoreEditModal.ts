import create from 'zustand'
import type { EditMode } from '../types'

// モーダルの開閉時間
const MODAL_DURATION = 200

type ScoreEditModalStore = {
  isOpen: boolean
  onOpen: (editMode: EditMode, scoreId: string | null) => void
  onClose: () => void
  editMode: EditMode | null
  scoreId: string | null
}

export const useScoreEditModalStore = create<ScoreEditModalStore>((set) => ({
  isOpen: false,
  onOpen: (editMode, scoreId) => set((state) => ({ ...state, isOpen: true, editMode, scoreId })),
  onClose: () => {
    set((state) => ({ ...state, isOpen: false }))
    setTimeout(() => set((state) => ({ ...state, scoreItem: null })), MODAL_DURATION)
  },
  editMode: null,
  scoreId: null,
}))
