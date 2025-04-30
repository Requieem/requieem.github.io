import PostModel        from '@/Models/PostModel.js'
import ProjectSetupPost from '@/PostsData/ProjectSetupPost.jsx'
import { FaUnity }      from 'react-icons/fa6'

const projectSetup = new PostModel(
  'Project Setup',
  '2025-02-22',
  'menu-main.png',
  <ProjectSetupPost/>,
  <FaUnity/>,
)

export default projectSetup