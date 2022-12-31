import { AUTH_API_URL } from '../config'
import type { Session } from '../types'

const handleApiResponse = async (response: Response) => {
  const data = await response.json()
  if (response.ok) {
    return data
  } else {
    return Promise.reject(data)
  }
}

export const getUser = async (session: Session) => {
  return await fetch(`${AUTH_API_URL}/auth`, {
    method: 'POST',
    body: JSON.stringify(session),
  }).then(handleApiResponse)
}

export const login = async (inputs: { userId: string; password: string }) => {
  return await fetch(`${AUTH_API_URL}/login`, {
    method: 'POST',
    body: JSON.stringify(inputs),
  }).then(handleApiResponse)
}

export const register = async (inputs: { userId: string; password: string }) => {
  return await fetch(`${AUTH_API_URL}/adduser`, {
    method: 'POST',
    body: JSON.stringify(inputs),
  }).then(handleApiResponse)
}

export const logout = async () => {
  return await fetch(`${AUTH_API_URL}/logout`, {
    method: 'POST',
  }).then(handleApiResponse)
}
