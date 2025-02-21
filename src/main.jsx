import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './contextApi/contextProvider.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContextProvider>
      <StrictMode>
        <App />
      </StrictMode>,
    </AuthContextProvider>
  </BrowserRouter>
)
