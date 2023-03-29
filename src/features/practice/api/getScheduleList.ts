import { useQuery } from 'react-query'
import { getApi } from '../../../library/fetch'

export type ScheduleListApi = {
  timestamp: {
    date: string
    time: string
    year: string
    month: string
    day: string
    hour: string
    minute: string
  }
  today: boolean
  next: {
    date: string
    weekjp: string
    weeken: string
    place: string
    time: {
      start: string
      end: string
    }
    studio: string
    memo: string | false
  }
  list: {
    date: string
    weekjp: string
    weeken: string
    place: string
    time: {
      start: string
      end: string
    }
    studio: string
    memo: false
  }[]
  schedule: {
    [key in string]: {
      date: string
      weekjp: string
      weeken: string
      place: string
      time: {
        start: string
        end: string
      }
      studio: string
      memo: false
    }[]
  }
}

const getScheduleList = async (): Promise<ScheduleListApi> => {
  return await getApi('https://api.winds-n.com/schedule/')
}

export const useScheduleList = () => {
  return useQuery({
    queryKey: 'scheduleList',
    queryFn: () => getScheduleList(),
  })
}
