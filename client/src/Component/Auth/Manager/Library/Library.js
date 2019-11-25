import React from 'react'

export function makeLine (array) {
  var s = ''
  for (var i = 0; i<array.length; i++) {
    s += array[i] + ', '
  }
  s = s.slice(0, -2)
  return s
}

export function makeLineUrl (array) {
  var s = ''
  let newArray = []
  for (var i = 0; i<array.length; i++) {
    if (array[i].match(/^(https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/g)) {
      const label = array[i].match(/youtu\.?be/) ? <i className='fab fa-youtube'></i> : <i className='fas fa-external-link-square-alt'></i>
      const className = array[i].match(/youtu\.?be/) ? 'youtube' : 'other'
      const link = <a href={array[i]} target='_blank' className={className}>{label}</a>
      newArray[i] = link
    } else {
      newArray[i] = array[i]
    }
  }
  const list = newArray.map((each, i) => <div key={i} className='link-frame'>{each}</div>)
  return (
    <div>
      {list}
    </div>
  )
}

export function countLike (list, id) {
  let like = 0
  list.forEach((item, i) => {
    if (item.like.find(item => item === id)) {
      like++
    }
  })
  return like
}

export function getDetail (id, list) {
  return list.filter((e) => {return e._id === id})[0]
}

export function getNextDetail (id, list) {
  let next = undefined
  list.forEach((e, i) => {
    if (e._id === id) next = i + 1
    return
  })
  if (next > (list.length - 1) || !next) {
    return false
  } else {
    return list[next]._id
  }
}

export function getPrevDetail (id, list) {
  let prev = undefined
  list.forEach((e, i) => {
    if (e._id === id) prev = i - 1
    return
  })
  if (prev < 0 || !prev) {
    return false
  } else {
    return list[prev]._id
  }
}

export function admin (user) {
  return user.admin ? true : false
}