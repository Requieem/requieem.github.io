import PostModel                      from '@/Models/PostModel.js'
import ProjectSetupPost               from '@/PostsData/ProjectSetupPost.jsx'
import { FaUnity }                    from 'react-icons/fa6'
import DesigningForIterationPost      from '@/PostsData/DesigningForIterationPost.jsx'
import UIHudAuthenticationLobbiesPost from '@/PostsData/UIHUDAUTHAndLobbiesPost.jsx'

const uiHudAuthAndLobbies = new PostModel(
  'UI, HUD, Authentication, and Lobbies',
  '2025-05-01',
  'menu-main.png',
  <UIHudAuthenticationLobbiesPost/>,
  <FaUnity/>,
)

export default uiHudAuthAndLobbies