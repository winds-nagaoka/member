export const appName = 'member'
export const version = '0.1.7'
// mode を prod 以外にするとローカルのAPIを使う
const mode = 'prod' // dev or prod
import uuidv1 from 'uuid/v1'

export function getClientid () {
  if (window.localStorage.clientid) return window.localStorage.clientid
  const clientid = uuidv1().split('-').join('')
  window.localStorage.setItem('clientid', clientid)
  return clientid
}

export function removeLocalStorage () {
  const clientid = getClientid()
  window.localStorage.clear()
  window.localStorage.setItem('clientid', clientid)
}

export function getAppPath () {
  return mode === 'prod' ? 'https://app.winds-n.com' : 'http://192.168.1.22:3007'
}

export function getAuthPath () {
  return mode === 'prod' ? 'https://auth.winds-n.com' : 'http://192.168.1.22:3003'
}

export function getScorePath () {
  // return mode === 'prod' ? 'https://score.winds-n.com' : 'http://192.168.1.22:3011'
  return 'https://score.winds-n.com'
}

export function getApiPath () {
  return 'https://api.winds-n.com'
}

export function getSession () {
  return {
    userid: window.localStorage.windsid,
    clientid: getClientid(),
    clientToken: window.localStorage.token,
    useragent: window.navigator.userAgent,
    version
  }
}

export function getToken (user) {
  if (!'clientList' in user) return false
  const client = user.clientList.filter((e) => {return e.id === getClientid()})
  if (client.length === 0) return false
  return client[0].token
}

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