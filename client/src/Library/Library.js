export const appName = 'member'
export const version = '0.5.3'
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

export function getSurveyPath () {
  return mode === 'prod' ? 'https://survey.winds-n.com' : 'http://192.168.1.22:3002'
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

export function browser (userAgent) {
  const agent = userAgent.toLowerCase()
  if(agent.indexOf('iphone') > -1) {
    return 'iPhone'
  } else if (agent.indexOf('ipad') > -1) {
    return 'iPad'
  } else if ((agent.indexOf('android') > -1) && (agent.indexOf('mobile') > -1)) {
    return 'Android'
  } else if ((agent.indexOf('android') > -1) && (agent.indexOf('mobile') == -1)) {
    return 'Android'// Tablet
  } else if (agent.indexOf("msie") > -1){
    return 'Internet Explorer'
  } else if (agent.indexOf("trident/7") > -1){
    return 'Internet Explorer 11'
  } else if (agent.indexOf("edge") > -1){
    return 'Edge'
  } else if (agent.indexOf("chrome") > -1){
    return 'Chrome'
  } else if (agent.indexOf("safari") > -1){
    return 'Safari'
  } else if (agent.indexOf("opera") > -1){
    return 'Opera'
  } else if (agent.indexOf("firefox") > -1){
    return 'Firefox'
  }
  return 'Unknown'
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