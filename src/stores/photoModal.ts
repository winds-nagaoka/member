import create from 'zustand'

type PhotoModalStore = {
  isOpen: boolean
  onOpen: (concertId: string, photoIndex: number) => void
  onClose: () => void
  concertId: string | null
  photoIndex: number | null
}

export const usePhotoModalStore = create<PhotoModalStore>((set) => ({
  isOpen: false,
  onOpen: (concertId, photoIndex) => set((state) => ({ ...state, isOpen: true, concertId, photoIndex })),
  onClose: () => set((state) => ({ ...state, isOpen: false, concertId: null, photoIndex: null })),
  concertId: null,
  photoIndex: null,
}))
