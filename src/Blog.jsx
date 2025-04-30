import { useState }  from 'react'
import ContentGrid   from '@/Components/ContentGrid.jsx'
import { postsData } from '@/PostsData/postsData.js'
import BlogPost      from '@/Components/BlogPost.jsx'

export function Blog () {
  let [openPost, setOpenPost] = useState(null)

  return <>
    <div className={'bg-white/35 rounded-md m-5 pb-5'}>
      <div className={'px-7.5 pt-5 text-justify'}>
        <div className={'mb-2.5 lg:mb-0 lg:mr-2.5 flex-col'}>
          <h4 className={'mb-2.5 font-bold text-left'}>My Role in <em>Profit Pits</em></h4>
          <span>I served as the <strong>generalist programmer and systems architect</strong> for <em>Profit Pits</em>, a multiplayer mining game developed by a small team as part of our postgraduate collaboration. My primary responsibility was the design and implementation of the game's core systems — from interactable logic and task activities to custom editor tooling and backend integration. I built a data-driven architecture using Unity 6 and Photon Fusion 2, leveraging ScriptableObjects and identifiers to enable modular gameplay interactions such as mining, equipping tools, and collaborating on shared objectives. These systems were structured to allow designers and developers to iterate quickly, while ensuring synchronization and stability across clients.</span>
        </div>
        <div className={'mt-2.5 lg:mt-0 lg:ml-2.5 xl:ml-0 xl:mt-5 flex-col'}>
          <h4 className={'mb-2.5 font-bold text-left'}>Engineering the Experience</h4>
          <span>Beyond gameplay code, I engineered much of the infrastructure powering the game’s user experience: Firebase authentication, Hathora-powered lobby orchestration, dynamic form rendering, and a modular main menu system. I integrated and expanded the Hathora Fusion sample menus into a polished and extensible UI flow, supporting party code input, lobby browsing, and player customization. My contributions emphasized clarity, extensibility, and team collaboration — with tooling and runtime systems designed to empower other developers and support expressive, technically challenging gameplay scenarios.</span>
        </div>
      </div>
      <div className={'text-center w-full text-md mt-0 flex-row flex justify-between items-end p-5'}>
        <h3 className={'pl-2.5 font-bold'}>Blog Posts</h3>
      </div>
      <div className={'px-5'}>
        <ContentGrid content={postsData.map((post) => (
          {
            src: post.src,
            title: post.title,
            alt: 'A picture of ' + post.title,
            subtitle: post.date,
            onClick: () => setOpenPost(post.title),
          }
        ))}></ContentGrid>
        {postsData.map((post, i) => (
          <BlogPost markdown={post.content} onClose={() => setOpenPost(null)} key={i}
                    isOpen={openPost === post.title}/>
        ))}
      </div>
    </div>
  </>
}