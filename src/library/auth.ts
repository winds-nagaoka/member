import { initReactQueryAuth } from 'react-query-auth'
import { VERSION } from '../config'
import type { Session } from '../types'
import { getUser, login, register, logout } from './authRequests'

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
  return localStorage.getItem('clientid')
}

const loadUser = async () => {
  const token = getToken()
  if (!token) {
    return null
  }
  const session: Session = {
    userid: '',
    clientid: '',
    clientToken: token,
    useragent: '',
    version: VERSION,
  }
  return getUser(session)
}

const loginFn = async (inputs: { userId: string; password: string }) => {
  await login(inputs)
}

const registerFn = async (inputs: { userId: string; password: string }) => {
  await register(inputs)
}

const logoutFn = async () => {
  await logout()
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
}

export const { AuthProvider, useAuth } = initReactQueryAuth(authConfig)
