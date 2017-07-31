import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ContainerDimensions from 'react-container-dimensions'
import { ReactSVGPanZoom } from 'react-svg-pan-zoom'
import actions from './actions'
import Scene from './scene'
import Guides from './guides'
import Rect from './rectangle'

const scene = new Scene()

class App extends Component {
  render () {
    const { state, actions } = this.props
    const viewerValue = state.get('viewerValue') ? state.get('viewerValue').toJS() : null
    const viewerTool = state.get('viewerTool')
    const drawing = state.get('drawing')
    let onMouseMove = null
    if (drawing) {
      onMouseMove = event => actions.mouseMove(event.point)
    }
    const mouseDown = state.get('mouseDown')
    const mousePos = state.get('mousePos')

    return (
      <ContainerDimensions>
        {({width, height}) =>
          <ReactSVGPanZoom
            width={width}
            height={height}
            value={viewerValue}
            onChangeValue={value => actions.setValue(value)}
            tool={viewerTool}
            onChangeTool={tool => actions.selectTool(tool)}
            onMouseDown={event => actions.mouseDown(event.point)}
            onMouseMove={onMouseMove}
            onMouseUp={event => actions.mouseUp(event.point)}
            style={{outline: '1px solid black'}}>
            <svg width={scene.width} height={scene.height}>
              <g>
                <Guides scene={scene} />
                <Rect p={mouseDown} q={mousePos} stroke='black' fill='transparent' strokeWidth={5} />
              </g>
            </svg>
          </ReactSVGPanZoom>
        }
      </ContainerDimensions>
    )
  }
}

App.propTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    state
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
