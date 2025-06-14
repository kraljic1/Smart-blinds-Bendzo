import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import './styles/ModernComponentsStyles.css'

import disableReactDevLogs from './utils/disableReactDevLogs' // Import our log disabler

// Disable React DevTools logs
disableReactDevLogs();

ReactDOM.createRoot(document.getElementById('root')!).render(
 <React.StrictMode>
 <BrowserRouter
 future={{
 v7_startTransition: true,
 v7_relativeSplatPath: true,
 }}
 >
 <App />
 </BrowserRouter>
 </React.StrictMode>,
)
// Force rebuild Wed Jun 4 00:28:09 CEST 2025
