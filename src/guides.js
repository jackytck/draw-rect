import React from 'react'
import PropTypes from 'prop-types'
import GuideHorizontalStreak from './guide-horizontal-streak'
import GuideVerticalStreak from './guide-vertical-streak'

const Guides = ({ scene }) => {
  const { width, height, guides } = scene

  let renderedGuides = guides.entrySeq().map(([guideID, guide]) => {
    switch (guide.type) {
      case 'horizontal-streak':
        return (<GuideHorizontalStreak key={guideID} width={width} height={height} guide={guide} />)

      case 'vertical-streak':
        return (<GuideVerticalStreak key={guideID} width={width} height={height} guide={guide} />)

      default:
        return console.warn(`guide ${guide.type} not allowed`)
    }
  }).toList()

  return (
    <g>
      <rect x='0' y='0' width={width} height={height} fill='#fff' />
      {renderedGuides}
    </g>
  )
}

Guides.propTypes = {
  scene: PropTypes.object.isRequired
}

export default Guides
