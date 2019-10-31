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
      const label = array[i].match(/www\.youtube\.com/) ? 'YouTube' : array[i]
      const link = <a href={array[i]} target='_blank'>{label}</a>
      newArray[i] = link
    } else {
      newArray[i] = array[i]
    }
  }
  const list = newArray.map((each, i) => <div key={i}>{each}</div>)
  return (
    <div>
      {list}
    </div>
  )
}

export function admin (user) {
  return user.scoreAdmin ? true : false
}