import React     from 'react'
import PropTypes from 'prop-types'

function ContentTile (props) {
  return (
    <div onClick={props.onClick}
         className={'group w-full lg:max-w-1/3 h-fit overflow-clip p-0.5 hover:scale-95 transition duration-200 ease-out not-hover:drop-shadow-2xl grid grid-cols-1 grid-rows-1'}>
      <div
        className={'pointer-events-none col-start-1 col-end-2 row-start-1 row-end-2 border-2 border-oxford-blue grid grid-rows-5 grid-cols-4 aspect-2/1 rounded-lg overflow-clip justify-stretch items-center'}>
        <img className={'w-full h-full row-span-full col-span-full object-cover'} src={props.src}
             alt={props.alt}/>
        <div
          className={'group-hover:opacity-0 transition-all duration-200 ease-in-out h-full w-full col-span-full row-span-full flex flex-col overflow-clip justify-center items-center'}>
          <div
            className={'row-start-2 row-end-3 col-start-1 col-end-5 bg-gradient-to-tl  from-oxford-blue to-yinmn-blue flex items-center justify-center rounded-md p-1 pr-5 pl-5 w-fit justify-self-center mb-0.5'}>
            <h3 className={'text-center text-text-light font-semibold'}>{props.title}</h3>
          </div>
          <div
            className={'row-start-4 row-end-4 col-start-1 col-end-5 bg-gradient-to-tl  from-oxford-blue to-yinmn-blue flex items-center justify-center rounded-md p-1 pr-5 pl-5 w-fit justify-self-center mt-0.5'}>
            <h3 className={'text-center text-text-light'}>{props.subtitle}</h3>
          </div>
        </div>
        <div
          className={'z-0 h-full w-full col-span-full row-span-full flex flex-col overflow-clip justify-center items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out bg-text-dark/55 backdrop-blur-md'}>
          <div
            className={'flex-1 flex justify-end rounded-md p-1 pr-5 pl-5 w-fit items-end'}>
            <h3 className={'text-center text-text-light font-semibold'}>{props.title}</h3>
          </div>
          <div
            className={'flex-1 flex justify-center rounded-md p-1 pr-5 pl-5 w-fit items-start'}>
            <h3 className={'text-center text-text-light italic font-light'}>Read More</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

ContentTile.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  alt: PropTypes.string,
  src: PropTypes.string,
  onClick: PropTypes.func,
}

export default ContentTile