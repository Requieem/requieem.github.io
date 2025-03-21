import React, { useState } from 'react'
import SidebarItem         from './SidebarItem.jsx'
import { FaBars }          from 'react-icons/fa6'

function VerticalSidebar (props) {
  let [open, setOpen] = useState(false)

  return (
    <div
      className={'sm:hidden transition-all duration-250 ease-in-out relative w-full flex flex-col-reverse items-center justify-end pointer-events-auto'}
      style={{
        top: open ? '0' : '-90cqh',
        height: '100cqh',
      }}>
      <button onClick={() => setOpen(!open)}
              className={'w-10 flex items-end justify-center pb-2.5 rounded-md absolute mr-50'} style={{
        background: 'var(--color-gradient-dark)',
        height: '10cqh',
        bottom: '5.5cqh',
      }}>
        <FaBars className={'fill-text-light'}/>
      </button>
      <div className={'flex flex-col pb-5 w-75 items-start justify-start'
                      + ' min-h-12.5 relative -top-5'
                      + 'rounded-3xl'} style={{
        background: 'var(--color-gradient-dark)',
        height: '90cqh',
        borderRadius: '0 0 2.5cqh 2.5cqh',
      }}>
        {props.items.map((entry, index) => {
          return (
            <div key={`vertical_${entry.title}`} className={'w-full'}>
              <h3 className={'pl-3 pt-2 text-text-light font-bold pb-2'}>{entry.title}</h3>
              {entry.items.map((item, index) => {
                return (
                  <SidebarItem key={`${entry.title + '_' + index + '_vertical'}`} icon={item.icon} text={item.text}
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

export default VerticalSidebar