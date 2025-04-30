import PostModel                 from '@/Models/PostModel.js'
import ProjectSetupPost          from '@/PostsData/ProjectSetupPost.jsx'
import { FaUnity }               from 'react-icons/fa6'
import DesigningForIterationPost from '@/PostsData/DesigningForIterationPost.jsx'

const designingForIteration = new PostModel(
  'Designing for Iteration',
  '2025-03-06',
  'menu-main.png',
  <DesigningForIterationPost/>,
  <FaUnity/>,
)

export default designingForIteration