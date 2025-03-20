import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './input.css'
import Sidebar        from './Components/Sidebar.jsx'
import ImagePage      from './Components/ImagePage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="flex w-screen h-screen flex-col overflow-y-scroll overflow-x-hidden">
      <Sidebar/>
      <ImagePage img={'/cave_mesh.png'} title={'Res Cavernas'}
                 tags={['Procedural Generation', 'LLMs', 'Turn-Based', '3D']}/>
      <ImagePage img={'/cave_mesh.png'} title={'Res Cavernas'}
                 tags={['Procedural Generation', 'LLMs', 'Turn-Based', '3D']}/>
      <ImagePage img={'/cave_mesh.png'} title={'Res Cavernas'}
                 tags={['Procedural Generation', 'LLMs', 'Turn-Based', '3D']}/>
      <ImagePage img={'/cave_mesh.png'} title={'Res Cavernas'}
                 tags={['Procedural Generation', 'LLMs', 'Turn-Based', '3D']}/>
    </div>
  </StrictMode>,
)
