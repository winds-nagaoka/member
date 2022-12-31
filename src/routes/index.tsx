import { useRoutes } from 'react-router-dom'

import { privateRoutes } from './private'
import { publicRoutes } from './public'

export const AppRoutes = () => {
  const auth = true
  const routes = auth ? privateRoutes : publicRoutes
  const element = useRoutes(routes)

  return <>{element}</>
}
