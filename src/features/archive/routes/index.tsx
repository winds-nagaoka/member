import { Routes, Route } from 'react-router-dom'
import { Archive } from './Archive'
import { Overview } from './Overview'
import { Photo } from './Photo'
import { Video } from './Video'

export const ArchiveRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Archive />} />
      <Route path="overview/:concertId" element={<Overview />} />
      <Route path="photo/:concertId" element={<Photo />} />
      <Route path="video/:concertId/:track" element={<Video />} />
    </Routes>
  )
}
