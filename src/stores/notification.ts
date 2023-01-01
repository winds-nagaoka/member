import create from 'zustand'

type Notification = {
  timeId: number
  message: string
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
      notifications: [{ timeId, message }, ...state.notifications],
    }))
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
