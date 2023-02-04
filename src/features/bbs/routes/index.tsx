import { Route, Routes } from 'react-router-dom'
import { Home } from './Home'
import { Post } from './Post'

export const BBSRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="post" element={<Post />} />
    </Routes>
  )
}
