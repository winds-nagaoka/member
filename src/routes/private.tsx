import { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Home } from '../features/home'
import { PracticeRoutes } from '../features/practice'

const App = () => {
  return (
    <Suspense fallback={<div>loading</div>}>
      <Outlet />
    </Suspense>
  )
}

export const privateRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/practice/*', element: <PracticeRoutes /> },
      { path: '/', element: <Home /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
]
