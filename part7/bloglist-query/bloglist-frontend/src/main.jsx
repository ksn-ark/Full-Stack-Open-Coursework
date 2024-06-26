import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { NotificationContextProvider } from './contexts/NotificationContext'
import { LoginContextProvider } from './contexts/LoginContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <LoginContextProvider>
        <App />
      </LoginContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
)
