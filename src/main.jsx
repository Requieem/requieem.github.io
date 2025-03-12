import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './input.css'
import Sidebar        from './Components/Sidebar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Sidebar/>
  </StrictMode>,
)
