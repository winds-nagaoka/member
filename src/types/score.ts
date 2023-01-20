export type ScoreItem = {
  number: string
  titleJa: string
  titleEn: string
  composer: string[]
  arranger: string[]
  publisher: string
  genre: string
  scoreType: '0' | '1' | '2'
  copyMemo: string
  scoreStatus: '0' | '1' | '2' | '-1'
  scoreLack: '0' | '1' | '2'
  lackList: string[]
  lendLocate: string
  scoreBased: '0' | '1' | '2'
  label: string
  boxLabel: string
  status: string
  createdAt: string
  updatedAt: string
  _id?: string
}

export type BoxItem = {
  status: boolean
  number: number
  label: string
  locate: string | false
  time: number
  _id: string
}

export type EditMode = 'new' | 'editStatus' | 'editDetail'
