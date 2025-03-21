import React from 'react'

function SquareContainer (props) {
  return (
    <div
      className={'hover:scale-95 transition-all duration-150 group aspect-square w-30 h-30 bg-gradient-to-b from-yinmn-blue to-oxford-blue m-1 rounded-2xl flex flex-col justify-center items-center overflow-hidden'}>
      <div className={'min-h-full min-w-full flex flex-col justify-stretch items-stretch p-5 relative'}>
        <img src={props.src} alt={props.alt}
             className={'max-h-full max-w-full object-contain aspect-square'}/>
        <div
          className={'scale-0 group-hover:scale-100 transition-all duration-350 w-full h-full flex flex-col justify-center items-center absolute top-0 left-0 rounded-2xl border-2 border-oxford-blue'}>
          <div
            className={'w-full h-full flex flex-col justify-center items-center absolute top-0 left-0 backdrop-blur-xs group-hover:backdrop-blur-xs bg-oxford-blue/50 text-text-light text-xl font-bold rounded-2xl'}>
            <p className={'group-hover:scale-135 transition-all duration-600 ease-in-out'}>{props.hint}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SquareContainer