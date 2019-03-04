export function makeLine (array) {
  var s = ''
  for (var i = 0; i<array.length; i++) {
    s += array[i] + ', '
  }
  s = s.slice(0, -2)
  // if (s === '') {
  //   s = 'No Data'
  // }
  return s
}