import { Route, Routes } from 'react-router-dom'
import { Detail } from './Detail'
import { Score } from './Score'

export const ScoreRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Score />} />
      <Route path="detail/:scoreId" element={<Detail />} />
    </Routes>
  )
}
