import create from 'zustand'

type PhotoModalStore = {
  isOpen: boolean
  onOpen: (photoIndex: number) => void
  onClose: () => void
  photoIndex: number | null
}

export const usePhotoModalStore = create<PhotoModalStore>((set) => ({
  isOpen: false,
  onOpen: (photoIndex) => set((state) => ({ ...state, isOpen: true, photoIndex })),
  onClose: () => set((state) => ({ ...state, isOpen: false, photoIndex: null })),
  photoIndex: null,
}))
