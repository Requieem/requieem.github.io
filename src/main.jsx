import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './input.css'
import App from './App.jsx'
import TextHeader     from "./Components/TextHeader.jsx";
import TextBlock      from "./Components/TextBlock.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TextBlock title={"Header Title"}  align={"left"} text={"\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\""}/>
  </StrictMode>,
)
