import { ReactNode, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { AuthProvider } from '../library/auth'
import { queryClient } from '../library/queryClient'
import { Button } from '../components/Form'

const ErrorFallback = () => {
  return (
    <>
      <h2>エラー</h2>
      <Button onClick={() => window.location.assign(window.location.origin)}>再読み込み</Button>
    </>
  )
}

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <BrowserRouter>{children}</BrowserRouter>
          </AuthProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  )
}
