import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './input.css'
import App from './App.jsx'
import TextHeader     from "./Components/TextHeader.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TextHeader title={"Header Title"}  align={"left"}/>
  </StrictMode>,
)
