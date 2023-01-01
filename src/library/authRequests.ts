import { AUTH_API_URL } from '../config'
import type { LoginRequest, RegisterRequest, Session } from '../types'

const handleApiResponse = async (response: Response) => {
  const data = await response.json()
  if (response.ok) {
    return data
  } else {
    return Promise.reject(data)
  }
}

const fetchApi = async (path: string, body: unknown = {}) => {
  return await fetch(path, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  }).then(handleApiResponse)
}

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
