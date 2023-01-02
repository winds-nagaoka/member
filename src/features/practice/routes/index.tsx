import { Route, Routes } from 'react-router-dom'
import { History } from './History'
import { Schedule } from './Schedule'
import { Source } from './Source'

export const PracticeRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Schedule />} />
      <Route path="source" element={<Source />} />
      <Route path="history" element={<History />} />
    </Routes>
  )
}
