import { useRoutes } from 'react-router-dom'

import { PublicRouter } from '../features/public'

export const AppRoutes = () => {
  const element = useRoutes([{ path: '/', element: <PublicRouter /> }])

  return <>{element}</>
}
