import { authStorage } from './storage'
import { getUserAgent } from './userAgent'
import { VERSION } from '../config'
import type { Session } from '../types'

export const getSession = (): Session | null => {
  const userId = authStorage.getUserId()
  const token = authStorage.getToken()
  if (!userId || !token) {
    return null
  }
  return {
    userid: userId,
    clientid: authStorage.getClientId(),
    clientToken: token,
    useragent: getUserAgent(),
    version: VERSION,
  }
}
