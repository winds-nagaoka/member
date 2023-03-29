export const getUserAgent = () => {
  return navigator.userAgent
}

export const getBrowserName = (userAgent: string) => {
  const agent = userAgent.toLowerCase()
  if (agent.indexOf('iphone') > -1) {
    return 'iPhone'
  } else if (agent.indexOf('ipad') > -1) {
    return 'iPad'
  } else if (agent.indexOf('android') > -1 && agent.indexOf('mobile') > -1) {
    return 'Android'
  } else if (agent.indexOf('android') > -1 && agent.indexOf('mobile') === -1) {
    return 'Android' // Tablet
  } else if (agent.indexOf('msie') > -1) {
    return 'Internet Explorer'
  } else if (agent.indexOf('trident/7') > -1) {
    return 'Internet Explorer 11'
  } else if (agent.indexOf('edge') > -1) {
    return 'Edge'
  } else if (agent.indexOf('chrome') > -1) {
    return 'Chrome'
  } else if (agent.indexOf('safari') > -1) {
    return 'Safari'
  } else if (agent.indexOf('opera') > -1) {
    return 'Opera'
  } else if (agent.indexOf('firefox') > -1) {
    return 'Firefox'
  }
  return 'Unknown'
}

export const getUserAgentType = () => {
  const ua = ['iPod', 'iPad', 'iPhone', 'Android']
  let result: string | null = null
  for (let i = 0; i < ua.length; i++) {
    if (getUserAgent().indexOf(ua[i]) > 0) {
      result = ua[i]
    }
  }
  return result ? result : 'other'
}

export const getIsStandAlone = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches ? true : false
}
