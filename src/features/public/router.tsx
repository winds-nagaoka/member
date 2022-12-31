import { Route, Routes } from 'react-router-dom'

export const PublicRouter = () => {
  return (
    <Routes>
      <Route path="login" element={<>Login</>} />
    </Routes>
  )
}
