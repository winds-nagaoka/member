import { ReactNode, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../library/auth'

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <AuthProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </AuthProvider>
    </Suspense>
  )
}
