import React from 'react'
import PropTypes from 'prop-types'

const Rect = ({ p, q, stroke, fill, strokeWidth }) => {
  if (!p || !q) {
    return null
  }
  const px = p.get('x')
  const py = p.get('y')
  const qx = q.get('x')
  const qy = q.get('y')
  if (!px || !py || !qx || !qy) {
    return null
  }
  const x = Math.min(px, qx)
  const y = Math.min(py, qy)
  const width = Math.abs(px - qx)
  const height = Math.abs(py - qy)
  return (
    <rect x={x} y={y} width={width} height={height} stroke={stroke} fill={fill} strokeWidth={strokeWidth} />
  )
}

Rect.propTypes = {
  p: PropTypes.object,
  q: PropTypes.object,
  stroke: PropTypes.string,
  fill: PropTypes.string,
  strokeWidth: PropTypes.number
}

export default Rect
