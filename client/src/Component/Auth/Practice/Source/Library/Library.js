import React from 'react'
import { __esModule } from 'react-router-dom'

function getSourceList (id, sourceList) {
  const source = getSource(id, sourceList)
  return source.detail.data
}

// function getAudioComposerText (id, num) {
//   if (concertStore.list) {
//     var list = getSourceList(id)[num]
//     return list.composer ? list.composer : ''
//   }
// }

// function getAudioArrangerText (id, num) {
//   if (concertStore.list) {
//     var list = getSourceList(id)[num]
//     return list.arranger ? list.arranger : ''
//   }
// }

export function getSource (id, sourceList) {
  return sourceList.filter((e) => {return e.id === id})[0]
}

// 参考音源のタイトルを取得する
export function getSourceTitle (id, sourceList) {
  return (getSource(id, sourceList)).detail.title
}

export function getSourceType (id, sourceList) {
  return (getSource(id, sourceList)).type
}

export function labeling (label, contents) {
  return (<div><span>{label}</span><span>{contents}</span></div>)
}

// Audio.jsより
export function getMediaData (id, number, concertList) {
  return (getSourceList(id, concertList)[number])
}

export function getAlbum (id, playlist) {
  let album
  for (var i=0;i<playlist.length;i++) {
    if (playlist[i].id === id) album = playlist[i]
  }
  return JSON.parse(JSON.stringify(album))
}

export function getAudioTitle (id, number, concertList) {
  return (getSourceList(id, concertList)[number]).title
}

export function getAudioComposer (id, number, concertList) {
  var list = getSourceList(id, concertList)[number]
  const composer = 'composer' in list ? 'arranger' in list ? <span className='composer'>{list.composer}{list.composer.match(/民謡/) ? '' : '作曲'}<span>/</span>{list.arranger}編曲</span> : <span className='composer'>{list.composer}</span> : 'arranger' in list ? <span className='composer'>{list.arranger}編曲</span> : ''
  return composer
  // 'composer' in data[ml] ? 'arranger' in data[ml] ? <span className='composer'>{data[ml].composer}{data[ml].composer.match(/民謡/) ? '' : '作曲'}/{data[ml].arranger}編曲</span> : <span className='composer'>{data[ml].composer}</span> : ''
}

// module.exports = {
//   getVersion, getUserdata,
//   unixTimeFull, getYear, unixDate, unixTime, makeLine, playTime,
//   getMediaData,
//   getAudioTitle, getConcertTitle, getConcertType, getConcertMusicLabel,
//   getAudioComposer, getAudioComposerText, getAudioArrangerText,
//   getConcert, listReverse, labeling, escapeReg,
//   // for ConcertNavigation
//   getNextConcert, getPrevConcert
// }