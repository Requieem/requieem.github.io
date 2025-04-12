import './input.css'
import CursorFollow     from './Components/CursorFollow.jsx'
import { useRef }       from 'react'
import { projectsData } from './ProjectsData/projectsData.js'
import Sidebar          from './Components/Sidebar.jsx'
import { FaArrowUp }    from 'react-icons/fa6'
import ContentGrid      from './Components/ContentGrid.jsx'
import ImagePage        from './Components/ImagePage.jsx'
import PostTabs         from './Components/PostTabs.jsx'

function App () {
  let containerRef = useRef(null)

  return (
    <>
      {/*Container Div*/}
      <CursorFollow/>
      <div ref={containerRef}
           className="flex w-screen h-screen flex-col items-stretch overflow-y-scroll overflow-x-hidden">
        <Sidebar/>
        <button onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
                className={'hover:scale-125 transition-all duration-200 ease-in-out z-100 border-2 border-platinum ring-2 ring-oxford-blue fixed bottom-5 right-10 shadow-black shadow-2xl rounded-full bg-gradient-to-tl from-oxford-blue to-yinmn-blue p-2.5 text-text-light'}>
          <FaArrowUp/></button>
        <h1 className={'text-center w-full text-4xl mt-10'}>Technical Portfolio</h1>
        <h2 className={'text-center w-full text-2xl mb-0'}>Marco Farace</h2>
        <div
          className={'m-5 bg-white/35 backdrop-blur-2xl shadow-inner shadow-black rounded-lg self-center aspect-square max-h-90 flex justify-center items-center relative image-stack'}>
          <img
            alt={'A picture of Marco Farace'}
            src={'DSC09388.jpg'}
            className={'max-w-100 max-h-90 object-cover rounded-lg aspect-square border-3 dark:border-amber-300 border-oxford-blue scale-90 hover:scale-105 shadow-black/50 shadow-md hover:shadow-2xl transition-all ease-in-out duration-200 about-image brightness-200'}
            style={{ objectPosition: '50% 30%' }}
          />
        </div>
        <div className={'text-center w-full text-sm font-semibold mt-0 flex-row flex justify-between items-end p-5'}>
          <h3>Game Programmer</h3>
          <h3>Mobile Developer</h3>
        </div>
        <div className={'shadow-md rounded-2xl bg-gradient-to-tl from-oxford-blue to-yinmn-blue min-h-1 mx-5'}></div>
        <div className={'text-center w-full text-md mt-0 flex-row flex justify-between items-end p-5'}>
          <h3>Featured Projects</h3>
        </div>
        <div className={'px-5'}>
          <ContentGrid content={[
            {
              src: 'ResCavernas/gpt_actor.png',
              title: 'Res Cavernas',
              alt: 'A picture of the Game Res Cavernas',
              subtitle: 'PCG _ GPT _ AI',
            },
            {
              src: 'StormFounders/title_screen.png',
              title: 'Storm Founders',
              alt: 'A picture of the Game Res StormFounders',
              subtitle: 'AI _ Builder _ Jam',
              onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
            },
            {
              src: 'StormFounders/title_screen.png',
              title: 'Blight & Bloom',
              alt: 'A picture of the Game Res StormFounders',
              subtitle: 'UE5 _ Adventure _ AI',
            },
            {
              src: 'StormFounders/title_screen.png',
              title: 'Binary Shift',
              alt: 'A picture of the Game Res StormFounders',
              subtitle: 'Jam _ Combat _ Animation',
            },
            {
              src: 'StormFounders/title_screen.png',
              title: 'HyperTris',
              alt: 'A picture of the Game HyperTris',
              subtitle: 'Flutter _ Mobile _ Game',
            },
            {
              src: 'StormFounders/title_screen.png',
              title: 'Tibi',
              alt: 'A picture of the Game Res StormFounders',
              subtitle: 'Flutter _ Mobile _ Health',
            },
          ]}></ContentGrid>
        </div>
        <div
          className={'flex flex-col sm:flex-row justify-center items-center text-justify m-5 p-5 bg-white/35 rounded-md'}>
          <div className={'mr-2.5 flex-col'}>
            <h4 className={'mb-2.5'}>Title</h4>
            <span>In Res Cavernas, players travel through infinite procedurally generated caves to defeat hordes of enemies and gather treasures. To do this, they are equipped with spells generated based on their requests through a unique GPT generation pipeline. The project aims to showcase an efficient and streamlined approach to these two major themes, namely Procedural Generation and LLM applications in game development. The project also aims to provide a fluid narrative development, as the social interactions and faction reputations in the game are all GPT-Driven. The game challenges the player with exploring and cleansing the caves through a strategical exploration system that relies on a grid-based, you-move-they-move approach. As players move through the generated chambers they will also face hordes of enemies equipped with A* based path-finding and various abilities. Finally, a hub provides a haven where players can talk with relevant NPCs, generate new spells and stash their treasures.</span>
          </div>
          <div className={'ml-2.5 flex-col'}>
            <h4 className={'mb-2.5'}>Title</h4>
            <span>In Res Cavernas, players travel through infinite procedurally generated caves to defeat hordes of enemies and gather treasures. To do this, they are equipped with spells generated based on their requests through a unique GPT generation pipeline. The project aims to showcase an efficient and streamlined approach to these two major themes, namely Procedural Generation and LLM applications in game development. The project also aims to provide a fluid narrative development, as the social interactions and faction reputations in the game are all GPT-Driven. The game challenges the player with exploring and cleansing the caves through a strategical exploration system that relies on a grid-based, you-move-they-move approach. As players move through the generated chambers they will also face hordes of enemies equipped with A* based path-finding and various abilities. Finally, a hub provides a haven where players can talk with relevant NPCs, generate new spells and stash their treasures.</span>
          </div>
        </div>
        <div className={'h-screen'}>
          <ImagePage title={'Res Cavernas'} img={'ResCavernas/title_page.png'} tags={['PCG', 'GPT', 'AI']}/>
        </div>
        <div
          className={'flex flex-col justify-center items-center text-justify m-5 p-5 bg-white/35 rounded-md'}>
          <div className={'mb-2.5 flex-col'}>
            <h4 className={'mb-2.5 font-semibold'}>{projectsData[0].title}</h4>
            <span>{projectsData[0].description}</span>
          </div>
          <PostTabs model={projectsData[0]}/>
        </div>
        <div className={'h-screen'}>
          <ImagePage id={projectsData[1].title} title={'Storm Founders'} img={'StormFounders/title_screen.png'}
                     tags={['PCG', 'GPT', 'AI']}/>
        </div>
        <div
          className={'flex flex-col justify-center items-center text-justify m-5 p-5 bg-white/35 rounded-md'}>
          <div className={'mb-2.5 flex-col'}>
            <h4 className={'mb-2.5 font-semibold'}>{projectsData[1].title}</h4>
            <span>{projectsData[1].description}</span>
          </div>
          <PostTabs model={projectsData[1]}/>
        </div>
      </div>
      {/*<Footer/>*/}
    </>
  )
}

export default App
