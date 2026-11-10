// ============================================================================
// MAIN ENTRY POINT - React Application Bootstrap
// ============================================================================

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Temporarily disable StrictMode to prevent Keycloak double initialization
// TODO: Add proper guards in Keycloak provider before re-enabling StrictMode
ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)
