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
      const label = array[i].match(/youtu\.?be/) ? <i className='fab fa-youtube'></i> : array[i]
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

export function admin (user) {
  return user.admin ? true : false
}