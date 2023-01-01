import create from 'zustand'

const NOTIFICATION_DURATION = 3000
// 以下はsrc/components/Notifications/Notification.module.scss と合わせる
const HIDE_ANIMATION_DURATION = 500

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
    }, NOTIFICATION_DURATION - HIDE_ANIMATION_DURATION)
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((notification) => notification.timeId !== timeId),
      }))
    }, NOTIFICATION_DURATION)
  },
  dismissNotification: (timeId) => {
    set((state) => ({
      notifications: state.notifications.filter((notification) => notification.timeId !== timeId),
    }))
  },
}))
