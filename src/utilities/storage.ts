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

export const authStorage = {
  setToken,
  getToken,
  getClientId,
  setUserId,
  getUserId,
}
