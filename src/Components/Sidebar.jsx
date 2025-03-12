import React, { useState }         from 'react'
import HorizontalSidebar           from './HorizontalSidebar.jsx'
import VerticalSidebar             from './VerticalSidebar.jsx'
import { FaCog, FaHeart, FaLinux } from 'react-icons/fa'

function Sidebar (props) {
  let items = [
    {
      title: 'Projects', items: [
        {
          icon: <FaCog className={'fill-text-light h-5 w-5'}/>,
          text: 'Settings',
          action: () => console.log('Settings'),
        },
        {
          icon: <FaHeart className={'fill-text-light  h-5 w-5'}/>,
          text: 'Favorites',
          action: () => console.log('Favorites'),
        },
        {
          icon: <FaLinux className={'fill-text-light  h-5 w-5'}/>,
          text: 'Linux',
          action: () => console.log('Linux'),
        },
      ],
    }, {
      title: 'Posts', items: [
        {
          icon: <FaCog className={'fill-text-light  h-5 w-5'}/>,
          text: 'Post 1',
          action: () => console.log('Settings'),
        },
        {
          icon: <FaHeart className={'fill-text-light  h-5 w-5'}/>,
          text: 'Post 2',
          action: () => console.log('Favorites'),
        },
        {
          icon: <FaLinux className={'fill-text-light  h-5 w-5'}/>,
          text: 'Post 3',
          action: () => console.log('Linux'),
        },
      ],
    },
  ]

  let [selected, setSelected] = useState('Settings')

  return (
    <div className={'flex flex-row w-full h-full'}>
      <HorizontalSidebar items={items} selected={selected}/>
      <VerticalSidebar items={items} selected={selected}/>
    </div>
  )
}

export default Sidebar