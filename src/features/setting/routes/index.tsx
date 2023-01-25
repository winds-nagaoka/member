import { Route, Routes } from 'react-router-dom'
import { Admin } from './Admin'
import { Home } from './Home'
import { Mail } from './Mail'
import { Name } from './Name'
import { Password } from './Password'
import { Remove } from './Remove'
import { Session } from './Session'

export const SettingRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="name" element={<Name />} />
      <Route path="email" element={<Mail />} />
      <Route path="password" element={<Password />} />
      <Route path="session" element={<Session />} />
      <Route path="admin" element={<Admin />} />
      <Route path="delete" element={<Remove />} />
    </Routes>
  )
}
