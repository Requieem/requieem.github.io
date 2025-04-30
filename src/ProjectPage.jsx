import ImagePage from '@/Components/ImagePage.jsx'
import PostTabs  from '@/Components/PostTabs.jsx'

export function ProjectPage (props) {
  console.log(props.project.title.replace(' ', '') + '/title_screen.png')
  return <>
    <div className={'h-screen'} id={props.project.title}>
      <ImagePage id={props.project.title + '_poster'} title={props.project.title}
                 img={props.project.title.replace(' ', '') + '/title_screen.png'}
                 tags={props.project.tags}/>
    </div>
    <div
      className={'flex flex-col justify-center items-center text-justify m-5 p-5 bg-white/35 rounded-md'}>
      <div className={'mb-2.5 flex-col'}>
        <h4 className={'mb-2.5 font-semibold'}>{props.project.title}</h4>
        <span>{props.project.description}</span>
      </div>
      <div className={'max-w-full'}>
        <PostTabs model={props.project}/>
      </div>
    </div>
  </>
}