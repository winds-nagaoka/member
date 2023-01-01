import { initReactQueryAuth } from 'react-query-auth'
import { VERSION } from '../config'
import type { LoginRequest, Session, User } from '../types'
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

type LoginInputs = { userId: string; password: string }
const loginFn = async (inputs: LoginInputs) => {
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

type RegisterInputs = { passKey: string; userId: string; password: string }
const registerFn = async (inputs: RegisterInputs) => {
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
  authStorage.clearAllContents()
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent: () => <>読み込み中</>,
}

export const { AuthProvider, useAuth } = initReactQueryAuth<User | null, Error, LoginInputs, RegisterInputs>(authConfig)
