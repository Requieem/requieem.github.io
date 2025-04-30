import './input.css'
import CursorFollow                    from './Components/CursorFollow.jsx'
import { useEffect, useRef, useState } from 'react'
import Sidebar                         from './Components/Sidebar.jsx'
import { FaArrowUp, FaBlog }           from 'react-icons/fa6'
import ContactButtons                  from './Components/ContactButtons.jsx'
import { AnimatePresence, motion }     from 'framer-motion'
import { Blog }                        from '@/Blog.jsx'
import { Portfolio }                   from '@/Portfolio.jsx'

function App () {
  let containerRef = useRef(null)
  let [content, setContent] = useState('portfolio')

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash === 'blog' || hash === 'portfolio') {
      setContent(hash)
    }
  }, [])

  return (
    <>
      {/*Container Div*/}
      <CursorFollow/>
      <div ref={containerRef}
           className="flex w-screen h-screen flex-col items-stretch overflow-y-scroll overflow-x-hidden">
        <Sidebar portfolioCallback={() => setContent('portfolio')} blogCallback={() => setContent('blog')}/>
        <button onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
                className={'hover:scale-125 transition-all duration-200 ease-in-out z-100 border-2 border-platinum ring-2 ring-oxford-blue fixed bottom-5 right-10 shadow-black shadow-2xl rounded-full bg-gradient-to-tl from-oxford-blue to-yinmn-blue p-2.5 text-text-light'}>
          <FaArrowUp/></button>
        <button onClick={() => content === 'portfolio' ? setContent('blog') : setContent('portfolio')}
                className={'hover:scale-125 transition-all duration-200 ease-in-out z-100 border-2 border-platinum ring-2 ring-oxford-blue fixed bottom-5 right-22.5 shadow-black shadow-2xl rounded-full bg-gradient-to-tl from-oxford-blue to-yinmn-blue p-2.5 text-text-light'}>
          <FaBlog/></button>
        <h1 className={'text-center w-full text-4xl mt-10'}>Technical Portfolio</h1>
        <h2 className={'text-center w-full text-2xl mb-0'}>Marco Farace</h2>
        <div className={'text-center w-full text-sm font-semibold mt-0 flex-row flex justify-between items-end p-5'}>
          <h3>Game Programmer</h3>
          <h3>Mobile Developer</h3>
        </div>
        <div className={'shadow-md rounded-2xl bg-gradient-to-tl from-oxford-blue to-yinmn-blue min-h-1 mx-5'}></div>
        <div className={'flex flex-col lg:flex-row items-center lg:items-start'}>
          <div className={'lg:self-start flex flex-col items-center justify-center'}>
            <div
              className={'m-5 bg-white/35 backdrop-blur-2xl shadow-inner shadow-black rounded-lg self-center aspect-square max-h-90 flex justify-center items-center relative image-stack'}>
              <img
                alt={'A picture of Marco Farace'}
                src={'DSC09388.jpg'}
                className={'max-w-100 max-h-90 object-cover rounded-lg aspect-square border-3 dark:border-amber-300 border-oxford-blue scale-90 hover:scale-105 shadow-black/50 shadow-md hover:shadow-2xl transition-all ease-in-out duration-200 about-image brightness-200'}
                style={{ objectPosition: '50% 30%' }}
              />
            </div>
            <div className={'px-5 w-full h-full'}>
              <ContactButtons/>
            </div>
          </div>
          <div
            className={'flex flex-col lg:flex-row xl:flex-col justify-center items-start text-justify mx-5 my-5 mb-0 lg:ml-0 p-5 2xl:px-25 bg-white/35 rounded-md self-stretch'}>
            <div className={'mb-2.5 lg:mb-0 lg:mr-2.5 flex-col'}>
              <h4 className={'mb-2.5 font-bold text-left'}>I am a systems-driven game programmer with a passion for
                gameplay
                innovation and
                technical excellence.</h4>
              <span>I hold a BSc in Informatics and an MSc in Game Development (Programming). My focus is on building modular, scalable, and performance-oriented systems that empower creative game design. My interests include procedural content generation, AI behaviors, and gameplay systems. I actively explore the intersection of technical architecture and player experience, taking pride in creating systems that are both elegant to develop and enjoyable to play with—ranging from grid-based automation to generative content pipelines powered by large language models.</span>
            </div>
            <div className={'mt-2.5 lg:mt-0 lg:ml-2.5 xl:ml-0 xl:mt-5 flex-col'}>
              <h4 className={'mb-2.5 font-bold text-left'}>My work combines rigorous programming with cross-domain
                fluency.</h4>
              <span>I am highly proficient in Unity and C#, and I also have experience with Unreal, C++, Python, SwiftUI, Firebase, and Flutter. As a freelance full-stack developer, I've helped my clients ship both mobile apps and games, as well as collaborated with teams of various sizes and with various strengths and weaknesses.

Whether it involves compute-driven cave generation, AI pathfinding, or network-aware toolsets, I approach every system with structure, clarity, and a commitment to maintainability. I thrive in collaborative environments and always aim to contribute solutions that elevate both the project and the team. This portfolio showcases the dynamic, expressive, and technically challenging systems that I enjoy building.</span>
            </div>
          </div>
        </div>
        <div className="relative w-full">
          <AnimatePresence mode="wait">
            {content === 'portfolio' && (
              <motion.div
                key="portfolio"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
              >
                <Portfolio/>
              </motion.div>
            )}
            {content === 'blog' && (
              <motion.div
                key="blog"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              >
                <Blog/>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/*<Footer/>*/}
    </>
  )
}

export default App
