import { useScheduleList } from '../api/getScheduleList'

export const ScheduleList = () => {
  const scheduleListQuery = useScheduleList()
  if (scheduleListQuery.isLoading) {
    return <>読み込み中</>
  }
  if (!scheduleListQuery.data) {
    return null
  }
  return <>ScheduleList</>
}
