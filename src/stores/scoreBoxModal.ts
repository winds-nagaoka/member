import create from 'zustand'
import { BoxItem } from '../types'

// モーダルの開閉時間
const MODAL_DURATION = 300

type ScoreBoxModalStore = {
  isOpen: boolean
  onOpen: (boxItem: BoxItem) => void
  onClose: () => void
  boxItem: BoxItem | null
}

export const useScoreBoxModalStore = create<ScoreBoxModalStore>((set) => ({
  isOpen: false,
  onOpen: (boxItem) => set((state) => ({ ...state, isOpen: true, boxItem })),
  onClose: () => {
    set((state) => ({ ...state, isOpen: false }))
    setTimeout(() => set((state) => ({ ...state, boxItem: null })), MODAL_DURATION)
  },
  boxItem: null,
}))
