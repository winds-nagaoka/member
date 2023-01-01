import { initReactQueryAuth } from 'react-query-auth'
import { VERSION } from '../config'
import type { LoginRequest, Session, User } from '../types'
import { getUser, login, register, logout } from './authRequests'
import { authStorage } from '../utilities/storage'
import { getUserAgent } from '../utilities/userAgent'
import { useNotificationStore } from '../stores/notification'

const loadUser = async (): Promise<User | null> => {
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
const loginFn = async (inputs: LoginInputs): Promise<User | null> => {
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
    useNotificationStore.getState().addNotification('ログインしました')
    return response.user
  } else {
    useNotificationStore.getState().addNotification('ログインできませんでした')
    return null
  }
}

type RegisterInputs = { passKey: string; userId: string; password: string }
const registerFn = async (inputs: RegisterInputs): Promise<User | null> => {
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
    useNotificationStore.getState().addNotification('登録しました')
    return response.user
  } else {
    useNotificationStore.getState().addNotification('登録できませんでした')
    return null
  }
}

const logoutFn = async (): Promise<null> => {
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
  useNotificationStore.getState().addNotification('ログアウトしました')
  return null
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent: () => <>読み込み中</>,
}

export const { AuthProvider, useAuth } = initReactQueryAuth<User | null, Error, LoginInputs, RegisterInputs>(authConfig)
