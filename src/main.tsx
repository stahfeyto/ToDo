import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// Cria a raiz do React e obtém o elemento root do DOM
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Envolve o aplicativo no StrictMode para detectar potenciais problemas */}
    <App />
  </StrictMode>,
)

