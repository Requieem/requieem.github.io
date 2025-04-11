import React       from 'react'
import ContentTile from './ContentTile.jsx'
import PropTypes   from 'prop-types'

function ContentGrid (props) {
  return (
    <div className={'flex sm:flex-wrap flex-col sm:flex-row justify-start items-start'}>
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

ContentGrid.defaultProps = {
  content: [],
}

ContentGrid.propTypes = {
  content: PropTypes.arrayOf(ContentTile.propTypes),
}

export default ContentGrid