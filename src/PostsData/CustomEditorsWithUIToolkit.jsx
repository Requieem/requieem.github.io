import PostModel                      from '@/Models/PostModel.js'
import ProjectSetupPost               from '@/PostsData/ProjectSetupPost.jsx'
import { FaUnity }                    from 'react-icons/fa6'
import DesigningForIterationPost      from '@/PostsData/DesigningForIterationPost.jsx'
import CustomEditorsWithUIToolkitPost from '@/PostsData/CustomEditorsWithUIToolkitPost.jsx'

const designingForIteration = new PostModel(
  'Custom Editors with UI Toolkit',
  '2025-03-20',
  'menu-main.png',
  <CustomEditorsWithUIToolkitPost/>,
  <FaUnity/>,
)

export default designingForIteration