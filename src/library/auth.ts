import { initReactQueryAuth } from 'react-query-auth'
import { VERSION } from '../config'
import type { LoginRequest, Session } from '../types'
import { getUser, login, register, logout } from './authRequests'
import { v1 as uuidv1 } from 'uuid'

const setToken = (token: string) => {
  localStorage.setItem('token', token)
}

const getToken = () => {
  return localStorage.getItem('token')
}

const setClientId = (clientId: string) => {
  localStorage.setItem('clientid', clientId)
}

const getClientId = () => {
  const clientId = localStorage.getItem('clientid')
  if (clientId) {
    return clientId
  }
  const newClientId = uuidv1().split('-').join('')
  setClientId(newClientId)
  return newClientId
}

const setUserId = (userId: string) => {
  localStorage.setItem('userid', userId)
}

const getUserId = () => {
  return localStorage.getItem('userid')
}

const getUserAgent = () => {
  return navigator.userAgent
}

const loadUser = async () => {
  const userId = getUserId()
  const token = getToken()
  if (!userId || !token) {
    return null
  }
  const session: Session = {
    userid: userId,
    clientid: getClientId(),
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
    clientid: getClientId(),
    useragent: getUserAgent(),
    version: VERSION,
  }
  const response = await login(requestBody)
  if (response.status) {
    setToken(response.token)
    setUserId(response.user.userid)
    return response.user
  }
}

const registerFn = async (inputs: { passKey: string; userId: string; password: string }) => {
  const requestBody = {
    userid: inputs.userId,
    passwd: inputs.password,
    key: inputs.passKey,
    clientid: getClientId(),
    useragent: getUserAgent(),
    version: VERSION,
  }
  const response = await register(requestBody)
  if (response.status) {
    setToken(response.token)
    setUserId(response.user.userid)
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
