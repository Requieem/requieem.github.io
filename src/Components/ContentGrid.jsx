import React       from 'react'
import ContentTile from './ContentTile.jsx'

function ContentGrid (props) {
  return (
    <div className={'flex lg:flex-wrap flex-col lg:flex-row justify-start items-start'}>
      {props.content.map((item, index) => (
        <ContentTile
          key={`$content-grid-${index}-${item.title}-${item.subtitle}`}
          title={item.title}
          subtitle={item.subtitle}
          alt={item.alt}
          src={item.src}
          onClick={item.onClick}
        />
      ))}
    </div>
  )
}

export default ContentGrid