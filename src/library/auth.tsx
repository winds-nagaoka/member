import { initReactQueryAuth } from 'react-query-auth'
import type { User } from '../types'
import { getUser, login, register, logout } from './authRequests'
import { authStorage } from '../utilities/storage'
import { useNotificationStore } from '../stores/notification'
import { getLoginRequestBody, getRegisterRequestBody, getSession } from '../utilities/session'
import { FullScreenLoading } from '../components/ContentsBox'
import { useTutorialStore } from '../stores/tutorial'

export const USER_QUERY_KEY = 'user'

type UserResponse = { status: boolean; token: string; user: User }
const handleUserResponse = (response: UserResponse) => {
  authStorage.setToken(response.token)
  authStorage.setUserId(response.user.userid)
  return response.user
}

const loadUser = async (): Promise<User | null> => {
  const session = getSession()
  if (!session) {
    return null
  }
  const response = await getUser(session)
  return handleUserResponse(response)
}

type LoginInputs = { userId: string; password: string }
const loginFn = async (inputs: LoginInputs): Promise<User | null> => {
  const requestBody = getLoginRequestBody(inputs)
  const response = await login(requestBody)
  if (response.status) {
    useNotificationStore.getState().addNotification('ログインしました')
    return handleUserResponse(response)
  } else {
    useNotificationStore.getState().addNotification('ログインできませんでした')
    return null
  }
}

type RegisterInputs = { passKey: string; userId: string; password: string }
const registerFn = async (inputs: RegisterInputs): Promise<User | null> => {
  const requestBody = getRegisterRequestBody(inputs)
  const response = await register(requestBody)
  if (response.status) {
    useNotificationStore.getState().addNotification('登録しました')
    useTutorialStore.getState().onOpen()
    return handleUserResponse(response)
  } else {
    useNotificationStore.getState().addNotification('登録できませんでした')
    return null
  }
}

const logoutFn = async (): Promise<null> => {
  const session = getSession()
  if (session) {
    await logout(session)
  }
  authStorage.clearAllContents()
  useNotificationStore.getState().addNotification('ログアウトしました')
  return null
}

const authConfig = {
  key: USER_QUERY_KEY,
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent: () => <FullScreenLoading />,
}

export const { AuthProvider, useAuth } = initReactQueryAuth<User | null, Error, LoginInputs, RegisterInputs>(authConfig)
