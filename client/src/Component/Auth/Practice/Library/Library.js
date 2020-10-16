// export function escapeReg (string) {
//   const reRegExp = /[\\^$.*+?()[\]{}|]/g
//   const reHasRegExp = new RegExp(reRegExp.source)
//   return (string && reHasRegExp.test(string)) ? string.replace(reRegExp, '\\$&') : string
// }

// function getConcertList (id, concertList) {
//   const concert = getConcert(id, concertList)
//   return concert.detail.data
// }

// // 演奏会のタイトルを取得する
export function getPracticeTitle(id, practiceList) {
  return getPractice(id, practiceList).detail.time.date
}

// export function getConcertType (id, concertList) {
//   return (getConcert(id, concertList)).type
// }

export function getPractice(id, practiceList) {
  return practiceList.filter((e) => {
    return e.id === id
  })[0]
}

// export function labeling (label, contents) {
//   return (<div><span>{label}</span><span>{contents}</span></div>)
// }

// export function getNextConcert (id, concertList) {
//   const type = getConcert(id, concertList).type
//   const list = concertList.filter((e) => {return e.type === type})
//   // console.log(list)
//   var next = undefined
//   list.forEach((e, i) => {
//     if (e.id === id) next = i + 1
//     return
//   })
//   if (next > (list.length - 1)) {
//     return false
//   } else {
//     // console.log('next', list[next].id)
//     return list[next].id
//   }
// }

// export function getPrevConcert (id, concertList) {
//   const type = getConcert(id, concertList).type
//   const list = concertList.filter((e) => {return e.type === type})
//   var prev = undefined
//   list.forEach((e, i) => {
//     if (e.id === id) prev = i - 1
//     return
//   })
//   if (prev < 0) {
//     return false
//   } else {
//     // console.log('prev', list[prev].id)
//     return list[prev].id
//   }
// }

// Audio.jsより
// export function getMediaData (id, number, concertList) {
//   return (getConcertList(id, concertList)[number])
// }

// Stringをsecにする
export function timeSecond(string) {
  if (!isNaN(string)) return string
  const time = string.split(':').reverse()
  const sec = time[0] ? Number(time[0]) : 0
  const min = time[1] ? Number(time[1]) * 60 : 0
  const hour = time[2] ? Number(time[2]) * 3600 : 0
  return hour + min + sec
}

export function getPracticeAlbum(id, playlist) {
  let album
  for (var i = 0; i < playlist.length; i++) {
    if (playlist[i].id === id) album = playlist[i]
  }
  return JSON.parse(JSON.stringify(album.detail))
}

// export function getAudioTitle (id, number, concertList) {
//   return (getConcertList(id, concertList)[number]).title
// }

// export function getAudioComposer (id, number, concertList) {
//   var list = getConcertList(id, concertList)[number]
//   const composer = 'composer' in list ? 'arranger' in list ? <span className='composer'>{list.composer}{list.composer.match(/民謡/) ? '' : '作曲'}<span>/</span>{list.arranger}編曲</span> : <span className='composer'>{list.composer}</span> : 'arranger' in list ? <span className='composer'>{list.arranger}編曲</span> : ''
//   return composer
//   // 'composer' in data[ml] ? 'arranger' in data[ml] ? <span className='composer'>{data[ml].composer}{data[ml].composer.match(/民謡/) ? '' : '作曲'}/{data[ml].arranger}編曲</span> : <span className='composer'>{data[ml].composer}</span> : ''
// }
