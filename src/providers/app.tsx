import { ReactNode, Suspense } from 'react'
import { QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../library/auth'
import { queryClient } from '../library/queryClient'

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </Suspense>
  )
}
