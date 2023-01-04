import { Routes, Route } from 'react-router-dom'
import { Archive } from './Archive'
import { Overview } from './Overview'
import { Photo } from './Photo'
import { Video } from './Video'

export const ArchiveRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Archive />} />
      <Route path="overview/:id" element={<Overview />} />
      <Route path="photo/:id" element={<Photo />} />
      <Route path="video/:id" element={<Video />} />
    </Routes>
  )
}
