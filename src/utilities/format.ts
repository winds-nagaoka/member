export const formatPlayTime = (t: number) => {
  const h = (t / 3600) | 0
  const m = ((t % 3600) / 60) | 0
  const s = Math.floor(t % 60)
  const addZero = (v: number) => String(v).padStart(2, '0')
  if (h !== 0) {
    return h + ':' + addZero(m) + ':' + addZero(s)
  } else if (m !== 0) {
    return addZero(m) + ':' + addZero(s)
  } else {
    return '00:' + addZero(s)
  }
}
