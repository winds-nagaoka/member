import { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Audio } from '../features/audio'
import { FullScreenLoading } from '../components/ContentsBox'
import { ArchiveRoutes } from '../features/archive'
import { Home } from '../features/home'
import { PracticeRoutes } from '../features/practice'
import { PhotoModal } from '../features/archive/components/PhotoModal'

const App = () => {
  return (
    <Suspense fallback={<FullScreenLoading />}>
      <Outlet />
      <Audio />
      <PhotoModal />
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
      { path: '/', element: <Home /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
]
