import React, { useState }         from 'react'
import HorizontalSidebar           from './HorizontalSidebar.jsx'
import VerticalSidebar             from './VerticalSidebar.jsx'
import { FaCog, FaHeart, FaLinux } from 'react-icons/fa'
import { projectsData }            from '@/ProjectsData/projectsData.js'
import { postsData }               from '@/PostsData/postsData.js'
import PropTypes                   from 'prop-types'

function Sidebar (props) {
  let items = [
    {
      title: 'Projects',
      items: projectsData.map((project) => (
        {
          icon: project.icon,
          text: project.title,
          action: () => {
            props.portfolioCallback()
            // Wait for the portfolio to load
            setTimeout(() => {
              // Scroll to the project
              document.getElementById(project.title).scrollIntoView({ behavior: 'smooth' })
            }, 500)
          },
        }
      )),
    }, {
      title: 'Posts', items:
        postsData.map((post) => (
          {
            icon: post.icon,
            text: post.title,
            action: () => {
              props.blogCallback()
            },
          }
        )),
    },
  ]

  let [selected, setSelected] = useState('Settings')

  return (
    <div className={'flex flex-row w-full h-full z-10 absolute pointer-events-none'}>
      <HorizontalSidebar items={items} selected={selected}/>
      <VerticalSidebar items={items} selected={selected}/>
    </div>
  )
}

Sidebar.propTypes = {
  projectCallback: PropTypes.func,
  blogCallback: PropTypes.func,
}

export default Sidebar