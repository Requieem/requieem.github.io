import { StrictMode }   from 'react'
import { createRoot }   from 'react-dom/client'
import './input.css'
import Sidebar          from './Components/Sidebar.jsx'
import PostTabs         from './Components/PostTabs.jsx'
import { projectsData } from './ProjectsData/projectsData.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="flex w-screen flex-row overflow-y-scroll overflow-x-hidden">
      <Sidebar/>
      <PostTabs model={projectsData[0]}/>
    </div>
  </StrictMode>,
)
