import { Navigate, Outlet } from 'react-router-dom'
import { Login } from '../features/public'
import { Register } from '../features/public'

const App = () => {
  return <Outlet />
}

export const publicRoutes = [
  {
    path: '/*',
    element: <App />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'reg', element: <Register /> },
      { path: '*', element: <Navigate to="/login" /> },
    ],
  },
]
