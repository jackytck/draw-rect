import {
  Map,
  fromJS
} from 'immutable'
import {
  TOOL_NONE,
  TOOL_PAN,
  TOOL_ZOOM_IN,
  TOOL_ZOOM_OUT,
  zoomOnViewerCenter,
  fitToViewer,
  pan,
  fitSelection
} from 'react-svg-pan-zoom'

const initialState = new Map({
  viewerValue: null,
  viewerTool: TOOL_NONE,
  drawing: false,
  mouseDown: null,
  mousePos: null,
  mouseUp: null
})

const root = (state, action) => {
  state = state || initialState

  let viewerValue = state.get('viewerValue') ? state.get('viewerValue').toJS() : null

  switch (action.type) {
    case 'SELECT_TOOL':
      return state.set('viewerTool', action.tool)

    case 'SELECT_TOOL_NONE':
      return state.set('viewerTool', TOOL_NONE)

    case 'SELECT_TOOL_PAN':
      return state.set('viewerTool', TOOL_PAN)

    case 'SELECT_TOOL_ZOOM_IN':
      return state.set('viewerTool', TOOL_ZOOM_IN)

    case 'SELECT_TOOL_ZOOM_OUT':
      return state.set('viewerTool', TOOL_ZOOM_OUT)

    case 'ZOOM_ON_VIEWER_CENTER':
      return state.set('viewerValue', fromJS(zoomOnViewerCenter(viewerValue, action.scaleFactor)))

    case 'FIT_TO_VIEWER':
      return state.set('viewerValue', fromJS(fitToViewer(viewerValue)))

    case 'PAN':
      return state.set('viewerValue', fromJS(pan(viewerValue, action.deltaX, action.deltaY)))

    case 'FIT_SELECTION':
      return state.set('viewerValue', fromJS(fitSelection(viewerValue, action.selectionSVGPointX, action.selectionSVGPointY, action.selectionWidth, action.selectionHeight)))

    case 'SET_VALUE':
      return state.set('viewerValue', fromJS(action.value))

    case 'MOUSE_DOWN':
      return state.set('drawing', true).set('mouseDown', fromJS(action.value))

    case 'MOUSE_MOVE':
      return state.set('mousePos', fromJS(action.value))

    case 'MOUSE_UP':
      return state.set('drawing', false).set('mouseUp', fromJS(action.value))

    default:
      return state
  }
}

export default root
