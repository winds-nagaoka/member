import { Route, Routes } from 'react-router-dom'
import { About } from './About'
import { Admin } from './Admin'
import { Home } from './Home'
import { License } from './License'
import { Mail } from './Mail'
import { MailValidation } from './MailValidation'
import { Name } from './Name'
import { Password } from './Password'
import { Remove } from './Remove'
import { ScoreSettingRoutes } from './score'
import { Session } from './Session'
import { Terms } from './Terms'

export const SettingRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="name" element={<Name />} />
      <Route path="email" element={<Mail />} />
      <Route path="valid/:key" element={<MailValidation />} />
      <Route path="password" element={<Password />} />
      <Route path="session" element={<Session />} />
      <Route path="admin" element={<Admin />} />
      <Route path="delete" element={<Remove />} />
      <Route path="score/*" element={<ScoreSettingRoutes />} />
      <Route path="terms" element={<Terms />} />
      <Route path="about" element={<About />} />
      <Route path="license" element={<License />} />
    </Routes>
  )
}
