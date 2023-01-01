import { initReactQueryAuth } from 'react-query-auth'
import { VERSION } from '../config'
import type { LoginRequest, Session } from '../types'
import { getUser, login, register, logout } from './authRequests'
import { authStorage } from '../utilities/storage'
import { getUserAgent } from '../utilities/userAgent'

const loadUser = async () => {
  const userId = authStorage.getUserId()
  const token = authStorage.getToken()
  if (!userId || !token) {
    return null
  }
  const session: Session = {
    userid: userId,
    clientid: authStorage.getClientId(),
    clientToken: token,
    useragent: getUserAgent(),
    version: VERSION,
  }
  return getUser(session)
}

const loginFn = async (inputs: { userId: string; password: string }) => {
  const requestBody: LoginRequest = {
    userid: inputs.userId,
    passwd: inputs.password,
    clientid: authStorage.getClientId(),
    useragent: getUserAgent(),
    version: VERSION,
  }
  const response = await login(requestBody)
  if (response.status) {
    authStorage.setToken(response.token)
    authStorage.setUserId(response.user.userid)
    return response.user
  }
}

const registerFn = async (inputs: { passKey: string; userId: string; password: string }) => {
  const requestBody = {
    userid: inputs.userId,
    passwd: inputs.password,
    key: inputs.passKey,
    clientid: authStorage.getClientId(),
    useragent: getUserAgent(),
    version: VERSION,
  }
  const response = await register(requestBody)
  if (response.status) {
    authStorage.setToken(response.token)
    authStorage.setUserId(response.user.userid)
    return response.user
  }
}

const logoutFn = async () => {
  const userId = authStorage.getUserId()
  const token = authStorage.getToken()
  if (!userId || !token) {
    return null
  }
  const session: Session = {
    userid: userId,
    clientid: authStorage.getClientId(),
    clientToken: token,
    useragent: getUserAgent(),
    version: VERSION,
  }
  await logout(session)
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
}

export const { AuthProvider, useAuth } = initReactQueryAuth(authConfig)
