import create from 'zustand'

export type Notification = {
  timeId: number
  message: string
  state: 'show' | 'hide' | 'close'
}

type NotificationStore = {
  notifications: Notification[]
  addNotification: (message: string) => void
  dismissNotification: (timeId: number) => void
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (message) => {
    const timeId = new Date().getTime()
    set((state) => ({
      notifications: [{ timeId, message, state: 'show' }, ...state.notifications],
    }))
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.map((notification) => {
          return notification.timeId === timeId ? { ...notification, state: 'hide' } : notification
        }),
      }))
    }, 5000 - 500)
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((notification) => notification.timeId !== timeId),
      }))
    }, 5000)
  },
  dismissNotification: (timeId) => {
    set((state) => ({
      notifications: state.notifications.filter((notification) => notification.timeId !== timeId),
    }))
  },
}))
