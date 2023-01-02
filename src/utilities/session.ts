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

type LoginInputs = { userId: string; password: string }
export const getLoginRequestBody = (inputs: LoginInputs) => ({
  userid: inputs.userId,
  passwd: inputs.password,
  clientid: authStorage.getClientId(),
  useragent: getUserAgent(),
  version: VERSION,
})

type RegisterInputs = { passKey: string; userId: string; password: string }
export const getRegisterRequestBody = (inputs: RegisterInputs) => ({
  userid: inputs.userId,
  passwd: inputs.password,
  key: inputs.passKey,
  clientid: authStorage.getClientId(),
  useragent: getUserAgent(),
  version: VERSION,
})
