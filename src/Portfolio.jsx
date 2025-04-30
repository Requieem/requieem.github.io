import ContentGrid      from '@/Components/ContentGrid.jsx'
import { projectsData } from '@/ProjectsData/projectsData.js'
import { ProjectPage }  from '@/ProjectPage.jsx'

export function Portfolio () {
  return <>
    <div className={'bg-white/35 rounded-md m-5 pb-5'}>
      <div className={'text-center w-full text-md mt-0 flex-row flex justify-between items-end p-5'}>
        <h3 className={'pl-2.5 font-bold'}>Featured Projects</h3>
      </div>
      <div className={'px-5'}>
        <ContentGrid content={projectsData.map((project) => (
          {
            src: project.poster,
            title: project.title,
            alt: 'A picture of ' + project.title,
            subtitle: project.tags.join(' _ '),
            onClick: () => {
              document.getElementById(project.title).scrollIntoView({ behavior: 'smooth' })
            },
          }
        ))}></ContentGrid>
      </div>
    </div>
    {/*  Create a project page for each project in projectsData */}
    {projectsData.map((project, i) => (
      <div key={i} className={'flex flex-col justify-center items-center'}>
        <ProjectPage project={project}/>
      </div>
    ))}
  </>
}

