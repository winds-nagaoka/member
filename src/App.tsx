import { AppProvider } from './providers/app'
import { AppRoutes } from './routes'
import './App.scss'

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}

export default App
