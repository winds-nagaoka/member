import type { ConcertContent, ConcertMusic } from './concert'

export type SourceConcert = {
  id: string
  type: 'source'
  title: string
  time: { timestamp: number; date: string; time: string }
  sourceStatus: true
  contents: ConcertContent[]
  data: ConcertMusic[]
}

export type Source = {
  id: string
  time: number
  detail: SourceConcert
  _id: string
}
