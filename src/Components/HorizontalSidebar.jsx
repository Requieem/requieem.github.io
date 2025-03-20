import React, { useState } from 'react'
import SidebarItem         from './SidebarItem.jsx'
import { FaBars }          from 'react-icons/fa6'

function HorizontalSidebar (props) {
  let [open, setOpen] = useState(false)

  return (
    <div className={'hidden sm:block h-full transition-all duration-250 ease-in-out relative pointer-events-auto'}
         style={{
           left: open ? '0' : 'calc(var(--spacing) * -75)',
         }}>
      <button onClick={() => setOpen(!open)}
              className={'w-15 h-10 flex items-center justify-end pr-3 rounded-md absolute top-5 left-69'} style={{
        background: 'var(--color-gradient-dark)',
      }}>
        <FaBars className={'fill-text-light'}/>
      </button>
      <div className={'flex flex-col w-75 items-start justify-start'
                      + ' min-h-12.5 absolute'
                      + ' h-full rounded-br-2xl rounded-tr-2xl z-10 bg-oxford-blue'} style={{
        background: 'var(--color-gradient-dark)',
      }}>
        {props.items.map((entry, index) => {
          return (
            <div key={`horizontal_${entry.title}`} className={'w-full'}>
              <h3 className={'pl-3 pt-2 text-text-light font-bold pb-2'}>{entry.title}</h3>
              {entry.items.map((item, index) => {
                return (
                  <SidebarItem key={`${entry.title + '_' + index + '_horizontal'}`} icon={item.icon} text={item.text}
                               selected={props.selected == item.text}
                               onClick={item.action}/>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HorizontalSidebar