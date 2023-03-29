import { useRoutes } from 'react-router-dom'
import { useAuth } from '../library/auth'

import { privateRoutes } from './private'
import { publicRoutes } from './public'

export const AppRoutes = () => {
  const auth = useAuth()
  const routes = auth.user ? privateRoutes : publicRoutes
  const element = useRoutes(routes)
  return <>{element}</>
}
