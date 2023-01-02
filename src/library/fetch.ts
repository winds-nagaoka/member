import { useNotificationStore } from '../stores/notification'

const handleApiResponse = async (response: Response) => {
  const data = await response.json()
  if (response.ok) {
    return data
  } else {
    useNotificationStore.getState().addNotification('通信エラー')
    return Promise.reject(data)
  }
}

export const fetchApi = async (path: string, body: unknown = {}) => {
  return await fetch(path, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  }).then(handleApiResponse)
}

export const getApi = async (path: string) => {
  return await fetch(path, { method: 'GET' }).then(handleApiResponse)
}
