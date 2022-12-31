import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Home } from '../features/home'

const App = () => {
  return (
    <Suspense fallback={<div>loading</div>}>
      <Outlet />
    </Suspense>
  )
}

export const privateRoutes = [
  {
    path: '/*',
    element: <App />,
    children: [{ path: '/*', element: <Home /> }],
  },
]
