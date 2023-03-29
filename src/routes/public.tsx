import { Navigate, Outlet } from 'react-router-dom'
import { Login, Register, MailValidation } from '../features/public'

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
      { path: 'valid/:key', element: <MailValidation /> },
      { path: '*', element: <Navigate to="/login" /> },
    ],
  },
]
