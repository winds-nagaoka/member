type ConcertVideo = { available: boolean; data: number; path: string; addtitle?: string }

export type Video = {
  status: boolean
  video: boolean
  list: ConcertVideo[]
  baseSrc?: string
  poster?: string
  url?: string
}
