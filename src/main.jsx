/**
 * Entry point — mounts the React app into the #root DOM element.
 * Wraps in StrictMode for development warnings (double-invokes effects in dev).
 * Wraps App in BrowserRouter so useNavigate/useParams work everywhere.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)