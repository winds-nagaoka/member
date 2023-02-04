import { useQuery } from 'react-query'
import { API_PATH } from '../../../config'
import { fetchApiNoHeaders } from '../../../library/fetch'

type DateString = string // yyyy-MM-dd
type FormattedDateString = string // yyyy/MM/dd
type TimeString = string // HH:mm
type NumberString = string

type NoticeListApi = {
  timestamp: {
    date: DateString
    time: TimeString
    year: NumberString
    month: NumberString
    day: NumberString
    hour: NumberString
    minute: NumberString
  }
  contents: {
    number: NumberString
    title: string
    text: string
    time: {
      date: FormattedDateString
      time: TimeString
    }[]
    attachment: {
      title: string
      filename: string
      size: NumberString
    }[]
    display: boolean
  }[]
}

const getNoticeList = async (): Promise<NoticeListApi> => {
  return await fetchApiNoHeaders(`${API_PATH}/manager/`, {})
}

export const useNoticeList = () => {
  return useQuery({
    queryKey: ['noticeList'],
    queryFn: async () => await getNoticeList(),
  })
}
