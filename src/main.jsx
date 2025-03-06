import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './input.css'
import App from './App.jsx'
import TextHeader     from "./Components/TextHeader.jsx";
import TextBlock      from "./Components/TextBlock.jsx";
import ActionButton   from "./Components/ActionButton.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <div className={"flex flex-row w-full min-h-12.5 h-max-15"}>
          <ActionButton text={"Click Me!"} onClick={() => console.log("Button"
                                                                   + " Clicked!")} primary={true}/>
          <ActionButton text={"Click Me!"} onClick={() => console.log("Button"
                                                                   + " Clicked!")} primary={false}/>
          <ActionButton text={"Click Me!"} onClick={() => console.log("Button"
                                                                   + " Clicked!")} primary={false}/>
          <ActionButton text={"Click Me!"} onClick={() => console.log("Button"
                                                                      + " Clicked!")} primary={false}/>
      </div>
  </StrictMode>,
)
