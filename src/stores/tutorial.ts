import create from 'zustand'

type TutorialStore = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useTutorialStore = create<TutorialStore>((set) => ({
  isOpen: false,
  onOpen: () => set((state) => ({ ...state, isOpen: true })),
  onClose: () => set((state) => ({ ...state, isOpen: false })),
}))
