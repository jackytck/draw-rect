import React from 'react'
import PropTypes from 'prop-types'

const round = (t, step) => Math.round(t / step) * step

const Rect = ({ p, q, stroke, fill, strokeWidth, snap }) => {
  if (!p || !q) {
    return null
  }
  let px = p.get('x')
  let py = p.get('y')
  let qx = q.get('x')
  let qy = q.get('y')
  if (!px || !py || !qx || !qy) {
    return null
  }

  if (snap) {
    px = round(px, 20)
    py = round(py, 20)
    qx = round(qx, 20)
    qy = round(qy, 20)
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
  strokeWidth: PropTypes.number,
  snap: PropTypes.bool
}

export default Rect
