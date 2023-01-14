import { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Audio, Video } from '../features/media'
import { FullScreenLoading } from '../components/ContentsBox'
import { ArchiveRoutes } from '../features/archive'
import { Home } from '../features/home'
import { PracticeRoutes } from '../features/practice'
import { PhotoModal } from '../features/archive/components/PhotoModal'
import { ScoreRoutes } from '../features/score'
import { ScoreModal } from '../features/score/components/ScoreModal'
import { ScoreEditModal } from '../features/score/components/ScoreEditModal'

const App = () => {
  return (
    <Suspense fallback={<FullScreenLoading />}>
      <Outlet />
      <Audio />
      <Video />
      <PhotoModal />
      <ScoreModal />
      <ScoreEditModal />
    </Suspense>
  )
}

export const privateRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/practice/*', element: <PracticeRoutes /> },
      { path: '/archive/*', element: <ArchiveRoutes /> },
      { path: '/score/*', element: <ScoreRoutes /> },
      { path: '/', element: <Home /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
]
