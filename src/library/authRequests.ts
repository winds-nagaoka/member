import { AUTH_API_URL } from '../config'
import type { LoginRequest, RegisterRequest, Session } from '../types'
import { fetchApi } from './fetch'

export const getUser = async (session: Session) => {
  return await fetchApi(`${AUTH_API_URL}/auth`, { session })
}

export const login = async (loginRequest: LoginRequest) => {
  return await fetchApi(`${AUTH_API_URL}/login`, loginRequest)
}

export const register = async (registerRequest: RegisterRequest) => {
  return await fetchApi(`${AUTH_API_URL}/adduser`, registerRequest)
}

export const logout = async (session: Session) => {
  return await fetchApi(`${AUTH_API_URL}/logout`, { session })
}
