type AllNumbers = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0

type OnesPlace = AllNumbers
type TensPlace = 0 | 1 | 2 | 3

type Date = string // yyyy年M月dd日(weekday)
type Time = string // hh:mm

export type ConcertTime = {
  timestamp: number
  date: Date
  time?: Time
  label?: '開演'
}

export type ConcertPlace =
  | '長岡市立劇場'
  | '長岡リリックホール'
  | 'コンサートホール'
  | 'シアター'
  | '千秋が原ふるさとの森'
  | '野外音楽堂'
  | 'ポケットステージ'
  | '第一スタジオ'
  | 'リリックホール前'
  | 'アオーレ長岡'

export type Conductor = { name: string }

export type Guest = { name: string; instrument: string; url?: string; blog?: string; belong?: string }

export type ConcertContent = {
  label:
    | 'ロビコン'
    | 'プレコン'
    | '第1部'
    | '第2部'
    | '第3部'
    | 'アンコール'
    | 'JCKサクソフォンアンサンブル'
    | 'クラリネットアンサンブル'
    | 'プレコン'
    | 'プログラム'
  music: number[]
}

export type ConcertMusic = {
  audio?: number
  video?: number
  title: string
  composer?: string
  arranger?: string
  movement?: string[]
  add?: string[]
}

export type MainConcert = {
  id: `main0${TensPlace}${OnesPlace}`
  type: 'main'
  title: `第${TensPlace | ''}${OnesPlace}回定期演奏会`
  time: ConcertTime
  place?: ConcertPlace[]
  conductor: Conductor[]
  guest?: Guest[]
  poster?: `https://winds-n.com/image/poster/main/${string}.jpg`
  guide?: `https://winds-n.com/${string}concert`
  contents: ConcertContent[]
  data: ConcertMusic[]
}

export type MiniConcert = {
  id: `mini${string}`
  type: 'mini'
  title: `${'春のミニコンサート' | '野外コンサート'}${string}`
  time: ConcertTime
  place?: ConcertPlace[]
  conductor?: Conductor[]
  poster?: `https://winds-n.com/image/poster/mini/${string}`
  guide?: `https://winds-n.com/${string}`
  contents: ConcertContent[]
  data: ConcertMusic[]
}

export type OtherConcert = {
  id: string
  type: 'other'
  title: string
  time: ConcertTime
  place: ConcertPlace[]
  conductor?: Conductor[]
  poster?: `https://winds-n.com/image/poster/other/${string}`
  guide?: `https://winds-n.com/${string}`
  contents: ConcertContent[]
  data: ConcertMusic[]
}

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

export type ConcertDetail = MainConcert | MiniConcert | OtherConcert | SourceConcert
