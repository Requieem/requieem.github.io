import { StrictMode }              from 'react'
import { createRoot }              from 'react-dom/client'
import './input.css'
import SidebarItem                 from './Components/SidebarItem.jsx'
import { FaCog, FaHeart, FaLinux } from 'react-icons/fa'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className={'flex flex-col w-full items-stretch justify-stretch'
                    + ' min-h-12.5'
                    + ' h-max-15'} style={{
      background: 'var(--color-gradient-dark)',
    }}>
      <SidebarItem text={'Click Me'} icon={<FaLinux className={'fill-text-light'}/>}
                   selected={true}/>
      <SidebarItem text={'Click Me'} icon={<FaCog className={'fill-text-light'}/>}/>
      <SidebarItem text={'Click Me'} icon={<FaHeart className={'fill-text-light'}/>}/>
    </div>
  </StrictMode>,
)
