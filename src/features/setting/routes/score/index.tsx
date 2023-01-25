import { Route, Routes } from 'react-router-dom'
import { Admin } from './Admin'
import { Mail } from './Mail'

export const ScoreSettingRoutes = () => {
  return (
    <Routes>
      <Route path="mail" element={<Mail />} />
      <Route path="admin" element={<Admin />} />
    </Routes>
  )
}
