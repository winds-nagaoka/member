import { ReactNode, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <BrowserRouter>{children}</BrowserRouter>
    </Suspense>
  )
}
