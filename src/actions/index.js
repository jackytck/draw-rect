function selectTool (tool) {
  return {
    type: 'SELECT_TOOL',
    tool
  }
}

function selectToolNone () {
  return {
    type: 'SELECT_TOOL_NONE'
  }
}

function selectToolPan () {
  return {
    type: 'SELECT_TOOL_PAN'
  }
}

function selectToolZoomIn () {
  return {
    type: 'SELECT_TOOL_ZOOM_IN'
  }
}

function selectToolZoomOut () {
  return {
    type: 'SELECT_TOOL_ZOOM_OUT'
  }
}

function zoomOnViewerCenter (scaleFactor) {
  return {
    type: 'ZOOM_ON_VIEWER_CENTER',
    scaleFactor
  }
}

function fitToViewer () {
  return {
    type: 'FIT_TO_VIEWER'
  }
}

function pan (deltaX, deltaY) {
  return {
    type: 'PAN',
    deltaX,
    deltaY
  }
}

function fitSelection (selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight) {
  return {
    type: 'FIT_SELECTION',
    selectionSVGPointX,
    selectionSVGPointY,
    selectionWidth,
    selectionHeight
  }
}

function setValue (value) {
  return {
    type: 'SET_VALUE',
    value
  }
}

function mouseDown (point) {
  console.log('mouse down...', point)
  return {
    type: 'MOUSE_DOWN',
    point
  }
}

function mouseUp (point) {
  console.log('mouse up...', point)
  return {
    type: 'MOUSE_UP',
    point
  }
}

export default {
  selectTool,
  selectToolNone,
  selectToolPan,
  selectToolZoomIn,
  selectToolZoomOut,
  zoomOnViewerCenter,
  fitToViewer,
  pan,
  fitSelection,
  setValue,
  mouseDown,
  mouseUp
}
