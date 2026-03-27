import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext' // Provides authentication context
import App from './App'
import './index.css' // Global CSS

// Create root for React 18+ and render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* BrowserRouter enables React Router */}
    <BrowserRouter>
      {/* AuthProvider makes auth state available throughout the app */}
      <AuthProvider>
        {/* Main App component containing all routes */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)