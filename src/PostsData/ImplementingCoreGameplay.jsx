import PostModel                    from '@/Models/PostModel.js'
import { FaUnity }                  from 'react-icons/fa6'
import ImplementingCoreGameplayPost from '@/PostsData/ImplementingCoreGameplayPost.jsx'

const implementingCoreGameplay = new PostModel(
  'Implementing Core Gameplay',
  '2025-04-05',
  'menu-main.png',
  <ImplementingCoreGameplayPost/>,
  <FaUnity/>,
)

export default implementingCoreGameplay