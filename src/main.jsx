import { StrictMode }  from 'react'
import { createRoot }  from 'react-dom/client'
import './input.css'
import Sidebar         from './Components/Sidebar.jsx'
import SquareContainer from './Components/SquareContainer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="flex w-screen h-screen flex-row overflow-y-scroll overflow-x-hidden">
      <Sidebar/>
      <div className={'h-fit flex flex-wrap justify-center items-center'}>
        <SquareContainer src={'/Unity6.png'} alt={'Unity Logo'} hint={'Unity'}/>
        <SquareContainer src={'/vite.svg'} alt={'Vite Logo'} hint={'Vite'}/>
        <SquareContainer src={'/react.svg'} alt={'React Logo'} hint={'React'}/>
        <SquareContainer src={'/Unity6.png'} alt={'Unity Logo'} hint={'Unity'}/>
        <SquareContainer src={'/Unity6.png'} alt={'Unity Logo'} hint={'Unity'}/>
        <SquareContainer src={'/Unity6.png'} alt={'Unity Logo'} hint={'Unity'}/>
        <SquareContainer src={'/Unity6.png'} alt={'Unity Logo'} hint={'Unity'}/>
        <SquareContainer src={'/Unity6.png'} alt={'Unity Logo'} hint={'Unity'}/>
        <SquareContainer src={'/Unity6.png'} alt={'Unity Logo'} hint={'Unity'}/>
        <SquareContainer src={'/Unity6.png'} alt={'Unity Logo'} hint={'Unity'}/>
        <SquareContainer src={'/Unity6.png'} alt={'Unity Logo'} hint={'Unity'}/>
        <SquareContainer src={'/Unity6.png'} alt={'Unity Logo'} hint={'Unity'}/>
        <SquareContainer src={'/Unity6.png'} alt={'Unity Logo'} hint={'Unity'}/>
      </div>
    </div>
  </StrictMode>,
)
