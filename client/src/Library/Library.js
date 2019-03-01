export const appName = 'member'
export const version = '0.0.1'

export function playTime (t) {
  var hms = ''
  var h = t / 3600 | 0
  var m = t % 3600 / 60 | 0
  var s = t % 60
  const z2 = (v) => {
    const s = '00' + v
    return s.substr(s.length - 2, 2)
  }
  if(h != 0){
    hms = h + ':' + z2(m) + ':' + z2(s)
  }else if(m != 0){
    hms = z2(m) + ':' + z2(s)
  }else{
    hms = '00:' + z2(s)
  }
  return hms
}

export function pcClass (status) {
  return status ? ' pc' : ' mobile'
}