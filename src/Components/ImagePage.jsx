import React from 'react'

function ImagePage (props) {
  return (
    <div
      className={'h-screen w-screen flex flex-col justify-center items-center bg-oxford-blue'}>
      <div className={'h-full w-full'}>
        <div
          className={'h-full w-full relative flex flex-col justify-center items-center border-t-5 border-b-5 border-oxford-blue drop-shadow-2xl'}>
          <div className={'flex flex-row justify-center items-center bottom-0 right-0 z-2 absolute m-5'}>
            {props.tags.map((tag, i) => (
              <p key={`${props.title}-tags-${i}`}
                 className={'hover:scale-95 hover:backdrop-blur-2xl hover:font-bold transition-all duration-150 backdrop-blur-md border-oxford-blue border-2 drop-shadow-2xl pt-1.5 pb-1.5 pr-5 pl-5 rounded-md text-text-light mr-2'}>{tag}</p>
            ))}
          </div>
          <div className={'flex flex-row justify-center items-center top-0 right-0 z-2 absolute m-10 mt-5'}>
            <div
              className={'bg-gradient-to-br from-yinmn-blue to-oxford-blue w-auto pr-5 pl-5 pt-2 pb-2 rounded-lg z-1'}>
              <h1 className={'text-text-light text-2xl text-center'}>{props.title}</h1>
            </div>
          </div>
          <img src={props.img} className={'w-full h-full object-cover'}/>
        </div>
      </div>
    </div>
  )
}

export default ImagePage