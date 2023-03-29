import { ReactNode, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { AuthProvider } from '../library/auth'
import { queryClient } from '../library/queryClient'
import { Button } from '../components/Form'
import { Notifications } from '../components/Notifications'
import { FullScreenLoading } from '../components/ContentsBox'

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
    <Suspense fallback={<FullScreenLoading />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Notifications />
            <BrowserRouter>{children}</BrowserRouter>
          </AuthProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  )
}
