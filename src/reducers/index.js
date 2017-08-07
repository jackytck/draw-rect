import {
  Map,
  List,
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
  objects: new List(),
  drawing: false,
  mouseDown: null,
  mousePos: null,
  mouseUp: null
})

function extractElementData (node) {
  while (!node.attributes.getNamedItem('data-element-root') && node.tagName !== 'svg') {
    node = node.parentNode
  }
  if (node.tagName === 'svg') return null

  return {
    id: node.attributes.getNamedItem('data-id').value,
    type: node.attributes.getNamedItem('data-type').value,
    selected: node.attributes.getNamedItem('data-selected').value === 'true'
  }
}

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
      const node = action.value.originalEvent.target
      const data = extractElementData(node)
      if (data) {
        const id = +data.id
        const objList = state.get('objects')
        let rect = objList.get(id)
        rect.selected = !rect.selected
        objList.set(id, rect)
        return state.set('objects', objList)
      }
      return state.set('drawing', true).set('mouseDown', fromJS(action.value.point)).set('mousePos', null)

    case 'MOUSE_MOVE':
      return state.set('mousePos', fromJS(action.value.point))

    case 'MOUSE_UP':
      const drawing = state.get('drawing')
      if (!drawing) {
        return state
      }
      const p = state.get('mouseDown')
      const q = state.get('mousePos')
      // @todo: if area is small, skip adding
      const nextObjs = state.get('objects').push({
        p,
        q,
        selected: false
      })
      return state.set('drawing', false).set('mousePos', fromJS(action.value.point)).set('objects', nextObjs)

    default:
      return state
  }
}

export default root
