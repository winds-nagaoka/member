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

export const fetchApiNoHeaders = async (path: string, body: unknown = {}) => {
  return await fetch(path, {
    method: 'POST',
    body: JSON.stringify(body),
  }).then(handleApiResponse)
}

export const fetchApiWithFormData = async <FormBody extends object>(path: string, body: FormBody) => {
  const formData = new FormData()
  ;(Object.keys(body) as (keyof FormBody)[]).forEach((key) => {
    const value = body[key] as string
    if (typeof key === 'string') {
      formData.append(key, value)
    }
  })
  return await fetch(path, {
    method: 'POST',
    body: formData,
  }).then(handleApiResponse)
}

export const getApi = async (path: string) => {
  return await fetch(path, { method: 'GET' }).then(handleApiResponse)
}

export const getTextApi = async (path: string) => {
  return await fetch(path, { method: 'GET' }).then((response) => response.text())
}
