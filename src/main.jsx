/**
 * Entry point — mounts the React app into the #root DOM element.
 * Wraps in StrictMode for development warnings (double-invokes effects in dev).
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
