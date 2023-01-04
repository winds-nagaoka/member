type AllNumbers = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0

type OnesPlace = AllNumbers
type TensPlace = 0 | 1 | 2 | 3

type Date = string // yyyy年M月dd日(weekday)
type Time = string // hh:mm

export type MainConcert = {
  id: `main0${TensPlace}${OnesPlace}`
  type: 'main'
  title: `第${TensPlace | ''}${OnesPlace}回定期演奏会`
  time: {
    timestamp: number
    date: Date
    time?: Time
    label?: '開演'
  }
  place?: ('長岡市立劇場' | '長岡リリックホール' | 'コンサートホール' | 'シアター')[]
  conductor: { name: string }[]
  guest?: (
    | { name: string; instrument: string }
    | { name: string; instrument: string; url: string; blog: string; belong: string }
  )[]
  poster?: `https://winds-n.com/image/poster/main/${string}.jpg`
  guide?: `https://winds-n.com/${string}concert`
  contents: { label: 'ロビコン' | 'プレコン' | '第1部' | '第2部' | '第3部' | 'アンコール'; music: number[] }[]
  data: {
    audio?: number
    video?: number
    title: string
    composer?: string
    arranger?: string
    movement?: string[]
    add?: string[]
  }[]
}

export type MiniConcert = {
  id: `mini${string}`
  type: 'mini'
  title: `${'春のミニコンサート' | '野外コンサート'}${string}`
  time: {
    date: Date
    timestamp: number
    time?: Time
    label?: '開演'
  }
  place?: ('千秋が原ふるさとの森' | '野外音楽堂' | '長岡リリックホール' | 'ポケットステージ' | '第一スタジオ')[]
  conductor?: { name: string }[]
  poster?: `https://winds-n.com/image/poster/mini/${string}`
  guide?: `https://winds-n.com/${string}`
  contents: {
    label: 'JCKサクソフォンアンサンブル' | 'クラリネットアンサンブル' | 'プレコン' | 'プログラム' | 'アンコール'
    music: number[]
  }[]
  data: { audio?: number; video?: number; title: string; composer?: string; arranger?: string; add?: string[] }[]
}

export type OtherConcert = {
  id: string
  type: 'other'
  title: string
  time: {
    timestamp: number
    date: Date
    time?: Time
    label?: '開演'
  }
  place: ('リリックホール前' | 'アオーレ長岡' | '長岡リリックホール' | 'コンサートホール')[]
  conductor?: { name: string }[]
  poster?: `https://winds-n.com/image/poster/other/${string}`
  guide?: `https://winds-n.com/${string}`
  contents: { label: 'プログラム' | '第1部' | '第2部' | 'アンコール'; music: number[] }[]
  data: { audio?: number; video?: number; title: string; composer?: string; arranger?: string; movement?: string[] }[]
}
